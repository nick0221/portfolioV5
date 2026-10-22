"use client";

import { useEffect, useRef } from "react";

/**
 * DraftingField — the site's signature background.
 *
 * A fine drafting grid with a flow field of short streamline strokes drawn
 * over it. The field is coupled to the reader's scroll: strokes accelerate
 * and brighten with scroll energy, and the whole field shears with scroll
 * direction, so moving through the page feels like pulling a sheet across a
 * drawing board.
 *
 * Engineering notes:
 * - The grid is rasterised once per resize into an offscreen canvas, then
 *   blitted — never redrawn per frame.
 * - Strokes are batched into three tone buckets, so a full frame costs a
 *   handful of path draws rather than one per stroke.
 * - DPR capped at 2, stroke budget tiers by viewport, rAF pauses when the tab
 *   is hidden, and `prefers-reduced-motion` renders one static frame.
 */

const INK_MINOR = "rgba(18, 21, 15, 0.038)";
const INK_MAJOR = "rgba(18, 21, 15, 0.075)";
const STROKE_TONES = [
  "rgba(232, 85, 43, 0.055)",
  "rgba(232, 85, 43, 0.095)",
  "rgba(232, 85, 43, 0.155)",
] as const;

type Tone = 0 | 1 | 2;

const STROKE_HOT = "rgba(181, 60, 31, 0.30)";

interface Stroke {
  x: number;
  y: number;
  px: number;
  py: number;
  life: number;
  max: number;
  tone: Tone;
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);

/** Cheap coherent noise — three interfering sine waves, no library. */
function angleAt(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.0017 + t * 0.11) * 1.55 +
    Math.cos(y * 0.0014 - t * 0.07) * 1.75 +
    Math.sin((x + y) * 0.0009 + t * 0.045) * 1.15
  );
}

export default function DraftingField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");

    let reduced = motionQuery.matches;
    let coarse = coarseQuery.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let grid: HTMLCanvasElement | null = null;
    let strokes: Stroke[] = [];
    let frameId = 0;
    let running = false;
    let time = 0;
    let energy = 0;
    let direction = 1;
    let lastScrollY = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let pointerActive = false;

    const spawn = (): Stroke => ({
      x: rand(0, width),
      y: rand(0, height),
      px: rand(0, width),
      py: rand(0, height),
      life: 0,
      max: rand(48, 160),
      tone: Math.floor(rand(0, 3)) as Tone,
    });

    const strokeBudget = () => {
      const density = Math.floor((width * height) / 3600);
      const cap = coarse ? 150 : 360;
      return Math.max(70, Math.min(cap, density));
    };

    const buildGrid = () => {
      const minor = 24;
      const major = 96;
      grid = document.createElement("canvas");
      grid.width = Math.floor(width * dpr);
      grid.height = Math.floor(height * dpr);

      const g = grid.getContext("2d");
      if (!g) return;

      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.lineWidth = 1;

      for (let x = 0; x <= width; x += minor) {
        g.strokeStyle = Math.round(x) % major === 0 ? INK_MAJOR : INK_MINOR;
        g.beginPath();
        g.moveTo(Math.round(x) + 0.5, 0);
        g.lineTo(Math.round(x) + 0.5, height);
        g.stroke();
      }

      for (let y = 0; y <= height; y += minor) {
        g.strokeStyle = Math.round(y) % major === 0 ? INK_MAJOR : INK_MINOR;
        g.beginPath();
        g.moveTo(0, Math.round(y) + 0.5);
        g.lineTo(width, Math.round(y) + 0.5);
        g.stroke();
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      buildGrid();

      const target = strokeBudget();
      if (strokes.length > target) {
        strokes.length = target;
      } else {
        while (strokes.length < target) strokes.push(spawn());
      }

      draw(true);
    };

    const step = (animate: boolean) => {
      const speed = animate ? 0.24 + Math.min(energy * 0.055, 2.7) : 0.2;
      const shear = direction * 0.16;

      for (const s of strokes) {
        s.px = s.x;
        s.py = s.y;

        const a = angleAt(s.x, s.y, time) + shear;
        s.x += Math.cos(a) * speed;
        s.y += Math.sin(a) * speed * 0.82;
        s.life += 1;

        const out =
          s.x < -24 || s.x > width + 24 || s.y < -24 || s.y > height + 24;

        if (out || s.life > s.max) {
          const fresh = spawn();
          s.x = fresh.x;
          s.y = fresh.y;
          s.px = fresh.x;
          s.py = fresh.y;
          s.life = 0;
          s.max = fresh.max;
          s.tone = fresh.tone;
        }
      }
    };

    const draw = (still = false) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (grid) ctx.drawImage(grid, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!still) step(true);

      // Hot bucket: strokes near the pointer get a brighter ink.
      const hotPath = new Path2D();

      let hotCount = 0;

      for (const tone of [0, 1, 2] as const) {
        const path = new Path2D();
        for (const s of strokes) {
          if (s.tone !== tone) continue;

          const near =
            pointerActive &&
            Math.abs(s.x - pointerX) < 260 &&
            Math.abs(s.y - pointerY) < 260;
          const dist = near
            ? Math.hypot(s.x - pointerX, s.y - pointerY)
            : Number.POSITIVE_INFINITY;

          if (near && dist < 230) {
            hotPath.moveTo(s.px, s.py);
            hotPath.lineTo(s.x, s.y);
            hotCount += 1;
            continue;
          }

          path.moveTo(s.px, s.py);
          path.lineTo(s.x, s.y);
        }

        ctx.strokeStyle = STROKE_TONES[tone];
        ctx.lineWidth = 1;
        ctx.stroke(path);
      }

      if (hotCount > 0) {
        ctx.strokeStyle = STROKE_HOT;
        ctx.lineWidth = 1.15;
        ctx.stroke(hotPath);
      }
    };


    const loop = () => {
      if (!running) return;
      time += 0.016;
      energy *= 0.92;
      draw();
      frameId = window.requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      if (reduced) {
        draw(true);
        return;
      }
      running = true;
      frameId = window.requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY;
      lastScrollY = y;
      if (delta !== 0) {
        direction = delta > 0 ? 1 : -1;
        energy = Math.min(energy + Math.min(Math.abs(delta), 60), 55);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerActive = true;
    };

    const onPointerLeave = () => {
      pointerActive = false;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const onMotionChange = () => {
      reduced = motionQuery.matches;
      stop();
      start();
    };

    const onResize = () => resize();

    lastScrollY = window.scrollY;
    resize();

    if (reduced) {
      draw(true);
    } else {
      start();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotionChange);
    coarseQuery.addEventListener("change", () => {
      coarse = coarseQuery.matches;
      resize();
    });

    if (!coarse) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      stop();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden"
    >
      <div className="paper-grid absolute inset-0 opacity-80" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-paper/40 via-transparent to-paper/70" />
    </div>
  );
}

import DraftingField from "@/components/background/DraftingField";
import { Footer } from "@/components/chrome/Footer";
import { Nav } from "@/components/chrome/Nav";
import { ScrollRail } from "@/components/chrome/ScrollRail";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <DraftingField />
      <Nav />
      <ScrollRail />
      <main id="main">
        <Hero />
      </main>
      <Footer />
    </>
  );
}

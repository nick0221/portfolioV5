import { profile } from "@/lib/content/profile";

/**
 * Resolved outbound links. Optional fields in the source data get explicit
 * fallbacks here so no anchor can ever render `href={undefined}`.
 */
export const links = {
  email: `mailto:${profile.email}`,
  cv:
    profile.cvUrl ??
    "/cv/Romnick_Sevilla_Fullstack_web_Developer.pdf",
  github: profile.githubUsername
    ? `https://github.com/${profile.githubUsername}`
    : null,
  linkedin: profile.linkedinUsername
    ? `https://www.linkedin.com/in/${profile.linkedinUsername}`
    : null,
} as const;

export type Links = typeof links;

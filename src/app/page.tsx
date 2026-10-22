import DraftingField from "@/components/background/DraftingField";
import { Footer } from "@/components/chrome/Footer";
import { Nav } from "@/components/chrome/Nav";
import { ScrollRail } from "@/components/chrome/ScrollRail";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Profile } from "@/components/sections/Profile";
import { Work } from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <DraftingField />
      <Nav />
      <ScrollRail />
      <main id="main">
        <Hero />
        <Profile />
        <Work />
        <Capabilities />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

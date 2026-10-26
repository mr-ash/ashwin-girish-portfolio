import { About } from "@/components/portfolio/About";
import { BuddyCursor } from "@/components/portfolio/BuddyCursor";
import { Contact } from "@/components/portfolio/Contact";
import { Experience } from "@/components/portfolio/Experience";
import { Footer } from "@/components/portfolio/Footer";
import { Hero } from "@/components/portfolio/Hero";
import { Navigation } from "@/components/portfolio/Navigation";
import {
  QuickConnectProvider,
} from "@/components/portfolio/QuickConnectContext";
import { StylesStrip } from "@/components/portfolio/StylesStrip";
import { ThemeProvider } from "@/components/portfolio/ThemeProvider";
import { Work } from "@/components/portfolio/Work";
import { YouCursor } from "@/components/portfolio/YouCursor";

export default function Home() {
  return (
    <ThemeProvider>
      <QuickConnectProvider>
        <div className="canvas-dots" aria-hidden="true" />
        <YouCursor />
        <BuddyCursor />
        <Navigation />
        <Hero />
        <StylesStrip />
        <Work />
        <Experience />
        <About />
        <Contact />
        <Footer />
      </QuickConnectProvider>
    </ThemeProvider>
  );
}

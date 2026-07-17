import { AboutSection } from "./AboutSection";
import { CapabilitiesSection } from "./CapabilitiesSection";
import { ContactSection } from "./ContactSection";
import { ExperienceSection } from "./ExperienceSection";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { ModeStatus } from "./ModeStatus";
import { MotionController } from "./MotionController";
import { PortfolioModeProvider } from "./PortfolioModeContext";
import { ProjectsSection } from "./ProjectsSection";
import { profile, type Mode } from "@/data/portfolio";

type PortfolioProps = {
  initialMode: Mode;
};

export default function Portfolio({ initialMode }: PortfolioProps) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    email: profile.email,
    jobTitle: "Full-Stack Software Developer & Applied AI Engineer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cottbus",
      addressCountry: "DE",
    },
    sameAs: [profile.github, profile.linkedin],
  };

  return (
    <PortfolioModeProvider initialMode={initialMode}>
      <MotionController />
      <Header />
      <main id="top">
        <Hero />
        <ModeStatus />
        <ProjectsSection />
        <ExperienceSection />
        <CapabilitiesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
    </PortfolioModeProvider>
  );
}

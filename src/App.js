import React from "react";
import "./styles/portfolio.css";
import "./index.css";
import Header from "./components/Header";
import { HeroSection, AboutSection, SkillsSection, ProjectsSection, ExperienceSection, ContactSection, Footer } from "./components/Sections";
import { Toaster } from "./components/ui/toaster";
import MouseShadow from "./components/MouseShadow";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
      <MouseShadow />
      <Toaster />
    </div>
  );
}

export default App;
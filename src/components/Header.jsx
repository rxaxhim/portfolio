import React from "react";
import { nav, profile } from "../mock/mock";
import { Button } from "./ui/button";
import { Github, Linkedin, FileDown, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const Header = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_20px_4px_rgba(45,212,191,0.7)]" />
          <span className="font-medium tracking-wide text-white/90">{profile.name.split(" ")[0]}</span>
        </div>
        <nav className="hidden gap-6 md:flex">
          {nav.map((n) => (
            <button
              key={n.id}
              onClick={() => scrollTo(n.id)}
              className="text-sm text-white/70 hover:text-teal-300 transition-colors"
            >
              {n.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:text-teal-300 hover:border-teal-500/50"
                >
                  <Github size={18} />
                </a>
              </TooltipTrigger>
              <TooltipContent>GitHub</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:text-teal-300 hover:border-teal-500/50"
                >
                  <Linkedin size={18} />
                </a>
              </TooltipTrigger>
              <TooltipContent>LinkedIn</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-white/80 hover:text-teal-300 hover:border-teal-500/50"
                >
                  <Mail size={18} />
                </a>
              </TooltipTrigger>
              <TooltipContent>Email</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button asChild variant="secondary" className="ml-1 bg-teal-500/20 text-teal-300 border border-teal-500/40 hover:bg-teal-500/30">
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">
              <FileDown size={16} /> <span className="hidden sm:inline">Resume</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import React, { useEffect, useMemo, useRef, useState } from "react";
import { profile, skills, projects, experience } from "../mock/mock";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { useToast } from "../hooks/use-toast";
import { ExternalLink, Star, Send, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { emailConfig, hasEmailKeys } from "../config/email";
import ParticleLayer from "./ParticleLayer";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";
import TypewriterName from "./TypewriterName";
import Portrait from "./Portrait";

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`mx-auto max-w-6xl px-4 py-20 ${className}`}>{children}</section>
);

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const containerStagger = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } } };

export const HeroSection = () => {
  const heroRef = useRef(null);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  // Parallax controller for orbs and particles via CSS vars
  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.setProperty('--parx', `${nx * 60}px`);
        el.style.setProperty('--pary', `${ny * 60}px`);
      });
    };
    const onLeave = () => { el.style.setProperty('--parx', `0px`); el.style.setProperty('--pary', `0px`); };
    el.addEventListener('mousemove', onMove); el.addEventListener('mouseleave', onLeave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave); };
  }, []);

  const setBtnSpot = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  };

  return (
    <div ref={heroRef} className="relative min-h-[88vh] bg-grid-dark text-white hero-parallax">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(45,212,191,0.18),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.12),transparent_40%)]" />
      <ParticleLayer />

      <motion.div initial="hidden" animate="show" variants={containerStagger} className="relative z-10 flex min-h-[88vh] items-center justify-center">
        <div className="mx-auto w-full max-w-6xl px-4 text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3 py-1 text-teal-200">
            <Sparkles size={16} /> Available • {profile.availability}
          </motion.div>
          <motion.div variants={fadeUp}>
            <TypewriterName text={profile.name} />
          </motion.div>
          <motion.p variants={fadeUp} className="mt-4 text-lg text-white/70">{profile.tagline}</motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Button onMouseMove={setBtnSpot} className="fx-btn fx-btn--primary btn-pulse gradient-outline">
                <a href="#contact" className="inline-flex items-center gap-2">Contact Me</a>
              </Button>
            </Magnetic>
            <Magnetic strength={10}>
              <Button onMouseMove={setBtnSpot} variant="secondary" asChild className="fx-btn fx-btn--ghost gradient-outline">
                <a href="#projects" className="inline-flex items-center gap-2">See Projects <ExternalLink size={16} /></a>
              </Button>
            </Magnetic>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-orb orb-a" />
        <div className="hero-orb orb-b" />
        <div className="hero-orb orb-c" />
      </div>
      <div className="absolute bottom-6 inset-x-0 text-center text-white/60 text-sm">Scroll</div>
    </div>
  );
};

export const AboutSection = () => (
  <Section id="about">
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={containerStagger} className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <motion.h2 variants={fadeUp} className="section-title">About</motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-white/70">{profile.bio}</motion.p>
        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
          {["TypeScript", "FastAPI", "MongoDB", "React", "Docker"].map((t) => (
            <Badge key={t} className="border border-teal-500/30 bg-white/5 text-teal-200">{t}</Badge>
          ))}
        </motion.div>
      </div>
      <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 md:items-start">
        <Portrait imageUrl={profile.photoUrl} initials="MR" size={112} />
        <Card className="w-full border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white/90">Quick Facts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-white/70">
            <div className="flex items-center justify-between"><span>Location</span><span>{profile.location}</span></div>
            <div className="flex items-center justify-between"><span>Experience</span><span>4+ years</span></div>
            <div className="flex items-center justify-between"><span>Preferred Stack</span><span>TS • React • FastAPI • SQL</span></div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  </Section>
);

export const SkillsSection = () => {
  // Organize skills into logical categories
  const frontendSkills = skills.filter(s => ['React', 'JavaScript', 'HTML', 'CSS', 'TailwindCSS'].includes(s.name));
  const backendSkills = skills.filter(s => ['Node.js', 'Express', 'FastAPI', 'Python', '.NET'].includes(s.name));
  const databaseSkills = skills.filter(s => ['MongoDB', 'PostgreSQL', 'SQL'].includes(s.name));
  const cloudDevOpsSkills = skills.filter(s => ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Terraform', 'CI/CD', 'Git', 'SonarQube', 'BlackDuck'].includes(s.name));
  const otherSkills = skills.filter(s => ['TypeScript', 'Electron'].includes(s.name));

  return (
    <Section id="skills">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="section-title">Skills</motion.h2>
      <Tabs defaultValue="frontend" className="mt-6">
        <TabsList className="bg-white/5 flex flex-wrap gap-2 p-1 w-full">
          <TabsTrigger value="frontend" className="text-xs sm:text-sm flex-1 min-w-0">Frontend</TabsTrigger>
          <TabsTrigger value="backend" className="text-xs sm:text-sm flex-1 min-w-0">Backend</TabsTrigger>
          <TabsTrigger value="database" className="text-xs sm:text-sm flex-1 min-w-0">Database</TabsTrigger>
          <TabsTrigger value="cloud" className="text-xs sm:text-sm flex-1 min-w-0">DevOps</TabsTrigger>
          <TabsTrigger value="other" className="text-xs sm:text-sm flex-1 min-w-0">Other</TabsTrigger>
        </TabsList>
        
                 <TabsContent value="frontend" className="mt-8">
           <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {frontendSkills.map((s) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-white/90 font-medium">{s.name}</span>
                  <span className="text-xs text-teal-300 font-semibold">{s.level}%</span>
                </div>
                <Progress value={s.level} className="h-2 bg-white/10" />
              </motion.div>
            ))}
          </div>
        </TabsContent>

                 <TabsContent value="backend" className="mt-8">
           <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {backendSkills.map((s) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-white/90 font-medium">{s.name}</span>
                  <span className="text-xs text-teal-300 font-semibold">{s.level}%</span>
                </div>
                <Progress value={s.level} className="h-2 bg-white/10" />
              </motion.div>
            ))}
          </div>
        </TabsContent>

                 <TabsContent value="database" className="mt-8">
           <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {databaseSkills.map((s) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-white/90 font-medium">{s.name}</span>
                  <span className="text-xs text-teal-300 font-semibold">{s.level}%</span>
                </div>
                <Progress value={s.level} className="h-2 bg-white/10" />
              </motion.div>
            ))}
          </div>
        </TabsContent>

                 <TabsContent value="cloud" className="mt-8">
           <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {cloudDevOpsSkills.map((s) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-white/90 font-medium">{s.name}</span>
                  <span className="text-xs text-teal-300 font-semibold">{s.level}%</span>
                </div>
                <Progress value={s.level} className="h-2 bg-white/10" />
              </motion.div>
            ))}
          </div>
        </TabsContent>

                 <TabsContent value="other" className="mt-8">
           <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {otherSkills.map((s) => (
              <motion.div key={s.name} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="rounded-lg border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-white/90 font-medium">{s.name}</span>
                  <span className="text-xs text-teal-300 font-semibold">{s.level}%</span>
                </div>
                <Progress value={s.level} className="h-2 bg-white/10" />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Section>
  );
};

export const ProjectsSection = () => {
  const [favorites, setFavorites] = useState(() => { try { return JSON.parse(localStorage.getItem("fav_projects") || "[]"); } catch { return []; } });
  useEffect(() => { localStorage.setItem("fav_projects", JSON.stringify(favorites)); }, [favorites]);
  const toggleFav = (id) => { setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])); };

  return (
    <Section id="projects">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }} 
        className="section-title"
      >
        Projects
      </motion.h2>
      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }} 
        variants={containerStagger} 
        className="mt-6 grid gap-6 sm:grid-cols-2"
      >
        {projects.map((p, index) => (
          <motion.div 
            key={p.id} 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            className="group"
          >
            <TiltCard>
              <motion.div 
                className="gradient-frame rounded-xl p-[1px]"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Card className="group overflow-hidden border-white/10 bg-white/5 rounded-xl glow-shadow">
                  <motion.div 
                    className="relative h-44 overflow-hidden img-sheen"
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.4 }
                    }}
                  >
                    <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <motion.button 
                      onClick={() => toggleFav(p.id)} 
                      className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition-colors ${favorites.includes(p.id) ? "border-teal-500/50 bg-teal-500/20 text-teal-200" : "border-white/10 bg-black/40 text-white/70 hover:text-teal-200 hover:border-teal-500/40"}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Star size={14} className={favorites.includes(p.id) ? "fill-teal-300 text-teal-300" : ""} />
                      {favorites.includes(p.id) ? "Saved" : "Save"}
                    </motion.button>
                  </motion.div>
                  <CardHeader>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <CardTitle className="text-white/90">{p.title}</CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent>
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="text-sm text-white/70"
                    >
                      {p.description}
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="mt-3 flex flex-wrap gap-2"
                    >
                      {p.tech.map((t) => (<Badge key={t} className="border border-teal-500/30 bg-white/5 text-teal-200">{t}</Badge>))}
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="mt-4"
                    >
                      <Magnetic strength={8}>
                        <Button size="sm" asChild className="fx-btn fx-btn--primary gradient-outline">
                          <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2">View project <ExternalLink size={14} /></a>
                        </Button>
                      </Magnetic>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export const ExperienceSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const isValid = useMemo(() => form.name && form.email && form.message.length >= 10, [form]);

  const onSubmit = async (e) => {
    e.preventDefault(); if (!isValid) return;
    try {
      setSending(true);
      if (hasEmailKeys()) {
        await emailjs.send(emailConfig.serviceId, emailConfig.templateId, { from_name: form.name, from_email: form.email, message: form.message }, { publicKey: emailConfig.publicKey });
        toast({ title: "Message sent via EmailJS", description: "Thanks! I'll get back to you soon." });
      } else {
        const saved = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
        saved.push({ ...form, date: new Date().toISOString() });
        localStorage.setItem("contact_submissions", JSON.stringify(saved));
        toast({ title: "EmailJS keys missing", description: "Saved locally. Add keys in src/config/email.js" });
      }
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({ title: "Could not send", description: "Falling back to local save.", variant: "destructive" });
      try { const saved = JSON.parse(localStorage.getItem("contact_submissions") || "[]"); saved.push({ ...form, date: new Date().toISOString() }); localStorage.setItem("contact_submissions", JSON.stringify(saved)); } catch {}
    } finally { setSending(false); }
  };

  return (
    <Section id="experience">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.6 }} 
        className="section-title"
      >
        Experience
      </motion.h2>
      
      {/* Experience summary badge - positioned above timeline */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <div className="bg-gradient-to-r from-teal-400/20 to-cyan-400/20 border border-teal-400/30 rounded-full px-6 py-3 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-300">4+</div>
              <div className="text-sm text-teal-200/80">Years of Experience</div>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full animate-pulse" />
        </div>
      </motion.div>
      
      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true, margin: "-100px" }} 
        variants={containerStagger} 
        className="mt-8 relative"
      >
        {/* Timeline line with gradient - responsive positioning */}
        <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400/50 via-cyan-400/50 to-transparent" />
        
        {/* Floating tech stack badges - visible on all devices */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -left-2 sm:-left-4 top-20 block"
        >
        </motion.div>
        
        {experience.map((e, idx) => (
          <motion.div 
            key={idx} 
            variants={fadeUp} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6, 
              delay: idx * 0.2,
              ease: "easeOut"
            }}
            className="relative mb-12 last:mb-0"
          >
            {/* Timeline dot with glow effect - responsive positioning */}
            <div className="absolute left-2 sm:left-6 top-6 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full shadow-lg shadow-teal-400/25 z-10" />
            <div className="absolute left-2 sm:left-6 top-6 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full animate-ping opacity-20" />
            
            {/* Experience card - responsive margin */}
            <div className="ml-8 sm:ml-16">
              <TiltCard>
                <motion.div 
                  className="gradient-frame rounded-xl p-[1px]"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <Card className="group overflow-hidden border-white/10 bg-white/5 rounded-xl glow-shadow hover:bg-white/10 transition-all duration-300 relative">
                    {/* Subtle background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full blur-3xl" />
                    </div>
                    
                    <CardHeader className="pb-4 relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="space-y-2">
                          <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                            className="flex items-center gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-lg border border-teal-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full opacity-80" />
                            </div>
                            <div>
                              <h3 className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                                {e.role}
                              </h3>
                              <p className="text-teal-400/90 font-medium text-xs sm:text-sm group-hover:text-teal-300 transition-colors">
                                {e.company}
                              </p>
                            </div>
                          </motion.div>
                        </div>
                        
                        <motion.div 
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <Badge className="border border-teal-500/30 bg-teal-500/10 text-teal-200 text-xs px-2 sm:px-3 py-1 group-hover:bg-teal-500/20 transition-colors">
                            {e.period}
                          </Badge>
                        </motion.div>
                      </div>
                      
                      {/* Tech stack badges for each experience */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + idx * 0.1 }}
                        className="mt-3 flex flex-wrap gap-2"
                      >
                        {getTechStackForExperience(e.role).map((tech, i) => (
                          <Badge 
                            key={tech} 
                            className="border border-teal-500/20 bg-teal-500/5 text-teal-300 text-xs px-2 py-1 hover:bg-teal-500/15 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </motion.div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 relative z-10">
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        className="text-sm sm:text-base text-white/80 leading-relaxed group-hover:text-white/90 transition-colors"
                      >
                        {e.summary}
                      </motion.p>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + idx * 0.1 }}
                        className="space-y-3"
                      >
                        <h4 className="text-xs sm:text-sm font-medium text-teal-300/90 uppercase tracking-wide flex items-center gap-2">
                          <div className="w-1 h-1 bg-teal-400 rounded-full" />
                          Key Achievements
                        </h4>
                        <div className="grid gap-2">
                          {e.highlights.map((highlight, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + idx * 0.1 + i * 0.1 }}
                              className="flex items-start gap-3 group/item hover:bg-white/5 p-2 rounded-lg transition-colors duration-200"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200" />
                              <p className="text-xs sm:text-sm text-white/70 group-hover/item:text-white/90 transition-colors leading-relaxed">
                                {highlight}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      
                      {/* Interactive hover effect */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.9 + idx * 0.1 }}
                        className="pt-2"
                      >
                        <div className="h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TiltCard>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

// Helper function to get tech stack for each experience
const getTechStackForExperience = (role) => {
  const techStacks = {
    "Full-Stack Developer": ["React", "Node.js", "Electron", "Azure", "Terraform"],
    "Back-end Developer": ["Node.js", "Express", "Python", "TensorFlow", "Docker", "PostgreSQL"]
  };
  
  // Handle the case where we have multiple Full-Stack Developer roles
  if (role === "Full-Stack Developer") {
    // Return different tech stacks based on company context
    return ["React", "Node.js", "Electron", "Azure", "Terraform"];
  }
  
  return techStacks[role] || ["JavaScript", "React", "Node.js"];
};

export const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const isValid = useMemo(() => form.name && form.email && form.message.length >= 10, [form]);

  const onSubmit = async (e) => {
    e.preventDefault(); if (!isValid) return;
    try {
      setSending(true);
      if (hasEmailKeys()) {
        await emailjs.send(emailConfig.serviceId, emailConfig.templateId, { from_name: form.name, from_email: form.email, message: form.message }, { publicKey: emailConfig.publicKey });
        toast({ title: "Message sent via EmailJS", description: "Thanks! I'll get back to you soon." });
      } else {
        const saved = JSON.parse(localStorage.getItem("contact_submissions") || "[]");
        saved.push({ ...form, date: new Date().toISOString() });
        localStorage.setItem("contact_submissions", JSON.stringify(saved));
        toast({ title: "EmailJS keys missing", description: "Saved locally. Add keys in src/config/email.js" });
      }
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast({ title: "Could not send", description: "Falling back to local save.", variant: "destructive" });
      try { const saved = JSON.parse(localStorage.getItem("contact_submissions") || "[]"); saved.push({ ...form, date: new Date().toISOString() }); localStorage.setItem("contact_submissions", JSON.stringify(saved)); } catch {}
    } finally { setSending(false); }
  };

  return (
    <Section id="contact">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="section-title">Contact</motion.h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4 rounded-xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
        <div className="sm:col-span-1"><label className="mb-2 block text-sm text-white/70">Your name</label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Developer" /></div>
        <div className="sm:col-span-1"><label className="mb-2 block text-sm text-white/70">Email</label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></div>
        <div className="sm:col-span-2"><label className="mb-2 block text-sm text-white/70">Message</label><Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me about your project..." /></div>
        <div className="sm:col-span-2 flex items-center gap-3">
            <Magnetic>
              <Button
                type="submit"
                disabled={!isValid || sending}
                className="fx-btn fx-btn--primary btn-pulse gradient-outline text-white font-semibold px-6 py-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" /> Send message
                  </>
                )}
              </Button>
            </Magnetic>
          <Button asChild variant="secondary" className="fx-btn fx-btn--ghost gradient-outline"><a href={`mailto:${profile.email}`}>Email instead</a></Button>
        </div>
      </form>
    </Section>
  );
};

export const Footer = () => (<footer className="mt-10 border-t border-white/10 py-10 text-center text-xs text-white/50">© {new Date().getFullYear()} {profile.name}. Built with React + Tailwind.</footer>);
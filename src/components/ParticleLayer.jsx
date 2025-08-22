import React, { useEffect, useRef } from "react";

// Lightweight particle field that subtly follows the cursor
// Designed for dark backgrounds and low GPU impact
const ParticleLayer = ({ density = 120, color = "rgba(45,212,191,0.35)" }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.style.transform = 'translate3d(calc(var(--parx, 0px) * 0.08), calc(var(--pary, 0px) * 0.08), 0)';
    canvas.style.willChange = 'transform';

    let w = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const MAX_PARTICLES = Math.max(80, Math.min(density, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000)));

    const rand = (min, max) => Math.random() * (max - min) + min;

    class P {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = initial ? Math.random() * canvas.offsetWidth : rand(-40, canvas.offsetWidth + 40);
        this.y = initial ? Math.random() * canvas.offsetHeight : rand(-40, canvas.offsetHeight + 40);
        this.vx = rand(-0.4, 0.4); this.vy = rand(-0.4, 0.4);
        this.r = rand(0.6, 1.8); this.alpha = rand(0.35, 0.75);
      }
      step() {
        const m = mouseRef.current;
        if (m.active) {
          const dx = m.x - this.x, dy = m.y - this.y;
          const d2 = Math.max(60, dx * dx + dy * dy);
          const force = Math.min(0.06, 1200 / d2);
          this.vx += dx * force * 0.0015; this.vy += dy * force * 0.0015;
        }
        this.x += this.vx; this.y += this.vy;
        if (this.x < -50 || this.x > canvas.offsetWidth + 50 || this.y < -50 || this.y > canvas.offsetHeight + 50) this.reset();
        this.vx *= 0.99; this.vy *= 0.99;
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/\d?\.\d+\)/, this.alpha + ")");
        ctx.fill();
      }
    }

    particlesRef.current = Array.from({ length: MAX_PARTICLES }, () => new P());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      for (const p of particlesRef.current) { p.step(); p.draw(); }
      rafRef.current = requestAnimationFrame(draw);
    };

    const resize = () => {
      w = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    let ticking = false;
    const onMove = (e) => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const rect = canvas.getBoundingClientRect();
          mouseRef.current.x = (e.clientX - rect.left);
          mouseRef.current.y = (e.clientY - rect.top);
          mouseRef.current.active = true;
          ticking = false;
        });
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [density, color]);

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" style={{ opacity: 0.7 }} />
    </div>
  );
};

export default ParticleLayer;
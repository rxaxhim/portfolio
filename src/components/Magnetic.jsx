import React, { useEffect, useRef } from "react";

// Wrap any element to add magnetic pull toward the cursor
// Usage: <Magnetic><Button>...</Button></Magnetic>
const Magnetic = ({ strength = 12, children, className = "" }) => {
  const wrapRef = useRef(null);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let active = false;
    const onEnter = () => (active = true);
    const onLeave = () => {
      active = false;
      el.style.transform = `translate3d(0,0,0)`;
    };
    const onMove = (e) => {
      if (!active) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        const dx = Math.max(-strength, Math.min(strength, (mx / r.width) * strength * 2));
        const dy = Math.max(-strength, Math.min(strength, (my / r.height) * strength * 2));
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });
    };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <div ref={wrapRef} className={`inline-block transition-transform duration-150 will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export default Magnetic;
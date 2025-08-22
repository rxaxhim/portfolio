import React, { useEffect, useRef } from "react";

// 3D tilt wrapper for cards with gentle glow
// Usage: <TiltCard><Card>...</Card></TiltCard>
const TiltCard = ({ maxTilt = 6, glow = true, children, className = "" }) => {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrap = ref.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5; // -0.5..0.5
        const py = (e.clientY - r.top) / r.height - 0.5;
        const rx = Math.max(-maxTilt, Math.min(maxTilt, -py * maxTilt * 2));
        const ry = Math.max(-maxTilt, Math.min(maxTilt, px * maxTilt * 2));
        inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };
    const reset = () => {
      inner.style.transform = `rotateX(0deg) rotateY(0deg)`;
    };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", reset);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", reset);
    };
  }, [maxTilt]);

  return (
    <div ref={ref} className={`tilt-wrap ${className}`} style={{ perspective: 800 }}>
      <div ref={innerRef} className={`transition-transform duration-150 will-change-transform ${glow ? "tilt-glow" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
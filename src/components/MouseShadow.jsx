import React, { useEffect, useRef } from "react";

const MouseShadow = () => {
  const ref = useRef(null);
  useEffect(() => {
    let ticking = false;
    const handler = (e) => {
      if (!ref.current) return;
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ref.current.style.setProperty('--mx', e.clientX + 'px');
          ref.current.style.setProperty('--my', e.clientY + 'px');
          ticking = false;
        });
      }
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return <div ref={ref} className="cursor-shadow" aria-hidden />;
};

export default MouseShadow;
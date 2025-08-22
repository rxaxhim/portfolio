import React, { useEffect, useState } from "react";

const TypewriterName = ({ text = "Muhammed Raahim Ghori", speed = 70, startDelay = 250, className = "" }) => {
  const [shown, setShown] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const tick = () => {
        if (i <= text.length) {
          setShown(text.slice(0, i));
          i += 1;
          timer = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);
    let timer;
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay]);

  return (
    <h1 aria-label={text} className={`gradient-name select-none text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl ${className}`}>
      {shown}
      <span className={`type-caret ${done ? "opacity-0" : ""}`}>|</span>
    </h1>
  );
};

export default TypewriterName;
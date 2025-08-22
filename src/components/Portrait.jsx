import React, { useState } from "react";

const Portrait = ({ imageUrl, initials = "MR", size = 112, alt = "Portrait" }) => {
  const [imgError, setImgError] = useState(false);
  const sz = `${size}px`;
  const base = process.env.PUBLIC_URL || ""; // "" in dev, "/portfolio" in prod builds

  // Normalize any provided imageUrl to live under the PUBLIC_URL base.
  const normalizeSrc = (url) => {
    if (!url || url === "#") return `${base}/images/raahim.jpg`;
    // absolute http(s) URLs: leave as-is
    if (/^https?:\/\//i.test(url)) return url;
    // leading slash => domain-root absolute; rewrite under base
    if (url.startsWith("/")) return `${base}${url}`;
    // plain relative like "images/raahim.jpg"
    return `${base}/${url}`;
  };

  const src = normalizeSrc(imageUrl);
  const showImg = !!src && !imgError;

  return (
    <div
      className="inline-block portrait-frame relative z-20 isolate"
      style={{ width: sz, height: sz, borderRadius: sz }}
    >
      <div
        className="portrait"
        style={{ width: `calc(${sz} - 4px)`, height: `calc(${sz} - 4px)` }}
      >
        {showImg ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover block"
            onError={() => setImgError(true)}
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-teal-200">
            {initials}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portrait;

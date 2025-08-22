import React, { useState } from "react";

const Portrait = ({
  imageUrl,
  initials = "MR",
  size = 112,
  alt = "Portrait",
}) => {
  const [imgError, setImgError] = useState(false);
  const sz = `${size}px`;

  // Works locally and under subpaths (GH Pages, router basename, etc.)
  const base = process.env.PUBLIC_URL || "";
  const src = (imageUrl && imageUrl !== "#") ? imageUrl : `${base}/images/raahim.jpg`;
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

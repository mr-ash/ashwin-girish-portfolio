"use client";

import { useEffect, useRef } from "react";

export function Reveal({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

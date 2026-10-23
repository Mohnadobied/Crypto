"use client";

import { useEffect, useRef, useState, type ComponentProps } from "react";

/**
 * Marks its children as revealed (data-reveal="in") the first time the
 * element scrolls into view. The animations themselves live in globals.css.
 */
export function Reveal(props: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen at mount (e.g. reload mid-page): reveal straight away.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} data-reveal={inView ? "in" : "out"} {...props} />;
}

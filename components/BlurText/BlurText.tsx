import { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  start?: boolean;
  className?: string;
}

const BlurText = ({ text, delay = 30, animateBy = "words", start = true, className = "" }: BlurTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const parts = animateBy === "words" ? text.split(" ") : [...text];

  return (
    <p ref={ref} className={`${styles.blurText} ${className}`} style={
      {
        ["--step" as any]: `${delay}ms`,
        filter: start && inView ? "blur(0px)" : "blur(10px)"
      }
    }>
      {parts.map((part, i) => (
        <span key={i + part} style={{ ["--i" as any]: i, ["--step" as any]: `${delay}ms` }}>
          {part}{animateBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default BlurText;
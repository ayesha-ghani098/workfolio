import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface ImageRevealHeroProps {
  frontImage: string;
  backImage: string;
  className?: string;
}

export default function ImageRevealHero({
  frontImage,
  backImage,
  className = "",
}: ImageRevealHeroProps) {
  const [revealPercentage, setRevealPercentage] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;

    setRevealPercentage(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseLeave = () => {
    setRevealPercentage(100);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-2xl cursor-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Back Image (Always visible) */}
      <div className="absolute inset-0">
        <img
          src={backImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Front Image (Erased by cursor) */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 0 0 ${revealPercentage}%)`,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <img
          src={frontImage}
          alt="Foreground"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Reveal Line */}
      <motion.div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg"
        style={{
          left: `${revealPercentage}%`,
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      />

      {/* Cursor Indicator */}
      <motion.div
        className="absolute top-1/2 w-8 h-8 bg-white/90 rounded-full border-2 border-primary shadow-lg flex items-center justify-center pointer-events-none"
        style={{
          left: `${revealPercentage}%`,
          transform: "translate(-50%, -50%)",
        }}
        transition={{ duration: 0.1, ease: "easeOut" }}
      >
        <div className="w-2 h-2 bg-primary rounded-full" />
      </motion.div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  );
}

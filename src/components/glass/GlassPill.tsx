import React from "react";

interface GlassPillProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export const GlassPill: React.FC<GlassPillProps> = ({
  children,
  className = "",
  variant = "default",
}) => {
  return (
    <div
      className={`glass-pill inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase ${
        variant === "accent"
          ? "text-[var(--accent-color,#38bdf8)] border-[var(--accent-color,#38bdf8)]/30 bg-[var(--accent-glow,rgba(56,189,248,0.1))]"
          : "text-white/70 border-white/10"
      } ${className}`}
    >
      {children}
    </div>
  );
};

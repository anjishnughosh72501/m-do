import React from "react";

interface GlassMetricProps {
  value: string | number;
  label: string;
  sublabel?: string;
  suffix?: string;
  className?: string;
  highlight?: boolean;
}

export const GlassMetric: React.FC<GlassMetricProps> = ({
  value,
  label,
  sublabel,
  suffix = "",
  className = "",
  highlight = false,
}) => {
  return (
    <div
      className={`glass-panel flex flex-col p-5 rounded-2xl border border-white/10 ${
        highlight
          ? "border-[var(--accent-color,#38bdf8)]/30 bg-[var(--accent-glow,rgba(56,189,248,0.06))]"
          : "bg-white/[0.04]"
      } ${className}`}
    >
      <div className="flex items-baseline gap-1">
        <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white font-sans">
          {value}
        </span>
        {suffix && (
          <span className="text-lg sm:text-xl text-white/50 font-mono">
            {suffix}
          </span>
        )}
      </div>
      <div className="mt-2 text-xs sm:text-sm font-medium tracking-wider text-white/70 uppercase font-mono">
        {label}
      </div>
      {sublabel && (
        <div className="mt-1 text-xs text-white/40 leading-relaxed font-sans">
          {sublabel}
        </div>
      )}
    </div>
  );
};

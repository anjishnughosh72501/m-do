import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glow = false,
  ...props
}) => {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${
        glow ? "shadow-glassGlow" : "shadow-glass"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

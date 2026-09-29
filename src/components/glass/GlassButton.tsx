import React from "react";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "subtle";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  ...props
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs min-h-[40px]",
    md: "px-6 py-3 text-sm min-h-[48px]",
    lg: "px-8 py-4 text-base min-h-[56px] font-medium tracking-wide",
  };

  const variantClasses = {
    primary:
      "text-white border-white/20 hover:border-white/40 bg-white/[0.08] hover:bg-white/[0.16]",
    secondary:
      "text-white/80 border-white/10 hover:border-white/25 bg-white/[0.04] hover:bg-white/[0.09]",
    subtle:
      "text-white/60 border-transparent hover:border-white/10 hover:bg-white/[0.05]",
  };

  return (
    <button
      className={`glass-button inline-flex items-center justify-center gap-2.5 rounded-full cursor-pointer select-none font-sans active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MusicArchetype } from "@/types";

interface ArchetypeRevealViewProps {
  archetype: MusicArchetype;
  secondaryArchetype?: MusicArchetype;
  stageProgress: number; // 0.0 to 1.0 (controlling the dramatic sequence)
}

export const ArchetypeRevealView: React.FC<ArchetypeRevealViewProps> = ({
  archetype,
  secondaryArchetype,
  stageProgress,
}) => {
  const accentColor = archetype.visualProfile.accent;

  // 4 Calibrated Stages across the expanded 50vh+ reveal scroll budget
  let revealStage: "pattern" | "type" | "you_are" | "archetype" = "pattern";
  if (stageProgress >= 0.22 && stageProgress < 0.45) revealStage = "type";
  else if (stageProgress >= 0.45 && stageProgress < 0.65) revealStage = "you_are";
  else if (stageProgress >= 0.65) revealStage = "archetype";

  return (
    <div className="w-full h-full flex flex-col justify-between text-white font-sans text-center relative overflow-hidden select-none">
      {/* Top Status */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/15 pb-3 flex-shrink-0"
      >
        <span className="tracking-widest uppercase font-semibold text-white flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: accentColor }}
          />
          07 // CLASSIFICATION REVEAL
        </span>
        <span
          className="font-bold px-2.5 py-0.5 rounded border text-[11px] font-mono tracking-wider uppercase"
          style={{
            color: accentColor,
            borderColor: `${accentColor}55`,
            backgroundColor: `${accentColor}18`,
          }}
        >
          IDENTITY DISTILLATION
        </span>
      </motion.div>

      {/* Center Cinematic Suspense / Dramatic Multi-Stage Climax */}
      <div className="py-2 my-auto flex flex-col items-center justify-center max-w-2xl mx-auto w-full relative">
        <AnimatePresence mode="wait">
          {/* Stage 1: Pattern Detection */}
          {revealStage === "pattern" && (
            <motion.div
              key="pattern"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -15, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 p-8 sm:p-10 rounded-3xl bg-[#0e111d]/90 border border-white/20 shadow-2xl max-w-lg w-full relative overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 70%)`,
                }}
              />
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold block">
                SIGNAL ISOLATED // COHERENCE 99.4%
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                WE FOUND A PATTERN.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-mono tracking-wide max-w-xs mx-auto">
                Scroll to decode your musical fingerprint
              </p>
            </motion.div>
          )}

          {/* Stage 2: Musical Type Discovery */}
          {revealStage === "type" && (
            <motion.div
              key="type"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -15, filter: "blur(6px)" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 p-8 sm:p-10 rounded-3xl bg-[#0e111d]/90 border border-white/20 shadow-2xl max-w-lg w-full relative overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  background: `radial-gradient(circle at 50% 50%, #a855f7 0%, transparent 70%)`,
                }}
              />
              <span className="text-xs font-mono tracking-widest text-purple-400 uppercase font-semibold block">
                CONVERGENCE VERIFIED
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
                YOUR MUSIC HAS A TYPE.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 font-mono tracking-wide max-w-xs mx-auto">
                Synthesizing multidimensional listening profile...
              </p>
            </motion.div>
          )}

          {/* Stage 3: Monumental Suspense "YOU ARE" */}
          {revealStage === "you_are" && (
            <motion.div
              key="you_are"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 p-8 sm:p-12 rounded-3xl bg-[#0c0e18]/95 border border-white/25 shadow-2xl max-w-lg w-full relative overflow-hidden"
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-40 animate-pulse"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${accentColor} 0%, transparent 75%)`,
                }}
              />
              <span className="text-xs font-mono tracking-widest text-amber-400 uppercase font-bold block">
                DISTILLATION COMPLETE
              </span>
              <h2
                className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-none drop-shadow-2xl"
                style={{
                  color: "#ffffff",
                  textShadow: `0 0 40px ${accentColor}88`,
                }}
              >
                YOU ARE
              </h2>
            </motion.div>
          )}

          {/* Stage 4: The Full Archetype Climax with Strengths */}
          {revealStage === "archetype" && (
            <motion.div
              key="archetype"
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-6 md:p-7 rounded-3xl bg-[#0d101d]/95 border border-white/20 shadow-2xl space-y-3.5 max-w-xl mx-auto flex flex-col items-center w-full relative overflow-hidden"
            >
              {/* Archetype Ambient Glow Backing */}
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background: `radial-gradient(circle at 50% 25%, ${accentColor} 0%, transparent 65%)`,
                }}
              />

              {/* Procedural Luminous Emblem */}
              <div
                className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full border-2 flex items-center justify-center shadow-2xl transition-all duration-1000 flex-shrink-0"
                style={{
                  borderColor: accentColor,
                  boxShadow: `0 0 40px ${accentColor}66`,
                  background: `radial-gradient(circle, ${accentColor}33 0%, rgba(10,12,22,0.95) 80%)`,
                }}
              >
                <svg
                  className="absolute inset-0 w-full h-full animate-spin-slow"
                  viewBox="0 0 100 100"
                  style={{ animationDuration: "20s" }}
                >
                  <polygon
                    points="50,10 90,50 50,90 10,50"
                    fill="none"
                    stroke={accentColor}
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                </svg>
                <span
                  className="text-2xl sm:text-3xl font-black tracking-tight"
                  style={{ color: accentColor }}
                >
                  {archetype.title.split(" ")[1]?.[0] || archetype.title[0] || "E"}
                </span>
              </div>

              {/* Archetype Landmark Title */}
              <div>
                <span className="text-[11px] font-mono tracking-widest text-cyan-300 uppercase font-semibold">
                  YOUR MUSICAL ARCHETYPE
                </span>
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase mt-0.5 drop-shadow-md"
                  style={{ color: accentColor }}
                >
                  {archetype.title}
                </h1>
                <div className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-200 font-mono mt-0.5">
                  {archetype.subtitle}
                </div>
              </div>

              {/* Secondary Influence Badge */}
              {secondaryArchetype && (
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#15192c] border border-white/20 text-xs font-mono text-neutral-200 shadow-sm">
                  <span>WITH AN</span>
                  <span
                    className="font-extrabold"
                    style={{ color: secondaryArchetype.visualProfile.accent }}
                  >
                    {secondaryArchetype.title}
                  </span>
                  <span>INFLUENCE</span>
                </div>
              )}

              {/* Archetype Editorial Description */}
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed font-sans font-normal">
                {archetype.description}
              </p>

              {/* Surfaced Archetype Strengths (Fixes Audit P2-1) */}
              {archetype.strengths && archetype.strengths.length > 0 && (
                <div className="w-full pt-1 space-y-1.5 border-t border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-semibold block text-left sm:text-center">
                    CORE LISTENING STRENGTHS
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                    {archetype.strengths.map((strength, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                        className="p-2.5 rounded-xl bg-[#131728] border border-white/15 text-[11px] text-neutral-200 leading-snug flex items-start gap-2 shadow-sm"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0"
                          style={{ backgroundColor: accentColor }}
                        />
                        <span>{strength}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="border-t border-white/15 pt-3 text-xs text-neutral-400 font-mono flex-shrink-0"
      >
        ORIGINAL MŪDO DETERMINISTIC CLASSIFIER // ムード // ZERO AI HALLUCINATION
      </motion.div>
    </div>
  );
};


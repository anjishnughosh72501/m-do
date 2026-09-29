"use client";

import React from "react";
import { motion } from "framer-motion";
import { MusicProfile } from "@/types";

interface ExplorationViewProps {
  profile: MusicProfile;
  accentColor?: string;
}

function Counter({ value, duration = 900 }: { value: number; duration?: number }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }
    const startTime = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(start + (end - start) * ease));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return <span>{count}</span>;
}

export const ExplorationView: React.FC<ExplorationViewProps> = ({
  profile,
  accentColor = "#38bdf8",
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between text-white font-sans select-none">
      {/* Top Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/15 pb-3 flex-shrink-0"
      >
        <span className="tracking-widest uppercase font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: accentColor }} />
          04 // EXPLORATION INDEX
        </span>
        <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30 text-[11px] font-mono">
          DISCOVERY CAPACITY
        </span>
      </motion.div>

      {/* Main Exploration Score Callout */}
      <div className="py-2 space-y-4 my-auto max-w-2xl mx-auto w-full">
        {/* Hero Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#121626]/90 border border-white/20 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold"
            >
              EXPLORATION SCORE
            </motion.div>
            <div className="flex items-baseline gap-2 mt-1">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl font-black tracking-tight font-mono drop-shadow-md"
                style={{ color: accentColor }}
              >
                <Counter value={profile.explorationScore} />
              </motion.span>
              <span className="text-2xl text-neutral-400 font-mono font-bold">/ 100</span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xs text-left sm:text-right"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-tight">
              {profile.explorationScore >= 75
                ? "Your music keeps moving."
                : "Your sound has settled in."}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1.5 leading-relaxed font-sans">
              {profile.insights.explorationNote}
            </p>
          </motion.div>
        </div>

        {/* Supporting Metric Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="p-4 rounded-xl bg-[#141829] border border-white/15 shadow-md flex justify-between items-center sm:flex-col sm:items-start group hover:border-purple-400/50 transition-colors"
          >
            <span className="text-xs text-purple-300 font-mono uppercase font-semibold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
              Genre Diversity
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
              {Math.round(profile.dimensions.genreDiversity)}%
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="p-4 rounded-xl bg-[#141829] border border-white/15 shadow-md flex justify-between items-center sm:flex-col sm:items-start group hover:border-blue-400/50 transition-colors"
          >
            <span className="text-xs text-blue-300 font-mono uppercase font-semibold bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/20">
              Artist Spread
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
              {Math.round(profile.dimensions.artistDiversity)}%
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="p-4 rounded-xl bg-[#141829] border border-white/15 shadow-md flex justify-between items-center sm:flex-col sm:items-start group hover:border-amber-400/50 transition-colors"
          >
            <span className="text-xs text-amber-300 font-mono uppercase font-semibold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
              Recent Shift
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-2">
              {Math.round(profile.dimensions.recentChange)}%
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="border-t border-white/15 pt-3 text-xs text-neutral-400 font-mono flex items-center justify-between flex-shrink-0"
      >
        <span>METRIC: MULTI-PARAMETRIC ENTROPY + TURNOVER</span>
        <span className="text-emerald-400">STATUS: VERIFIED</span>
      </motion.div>
    </div>
  );
};

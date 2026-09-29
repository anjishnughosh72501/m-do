"use client";

import React from "react";
import { motion } from "framer-motion";
import { ComparisonProfile } from "@/types";

interface PeriodComparisonViewProps {
  comparison?: ComparisonProfile;
  recentChangeScore: number;
  accentColor?: string;
}

export const PeriodComparisonView: React.FC<PeriodComparisonViewProps> = ({
  comparison,
  recentChangeScore,
  accentColor = "#38bdf8",
}) => {
  const shifts = comparison?.shifts || [
    {
      family: "ELECTRONIC",
      displayName: "Electronic & Dance",
      previousPercentage: 14,
      currentPercentage: 38,
      delta: 24,
    },
    {
      family: "INDIE",
      displayName: "Indie & Alternative",
      previousPercentage: 22,
      currentPercentage: 11,
      delta: -11,
    },
    {
      family: "RNB",
      displayName: "R&B",
      previousPercentage: 12,
      currentPercentage: 18,
      delta: 6,
    },
  ];

  const rangeLabels: Record<string, string> = {
    short_term: "Last Month",
    medium_term: "Last 6 Months",
    long_term: "Last Year",
  };

  const baseLabel = comparison ? rangeLabels[comparison.baseRange] || "Recent" : "Last Month";
  const targetLabel = comparison ? rangeLabels[comparison.targetRange] || "Baseline" : "Last Year";

  return (
    <div className="w-full h-full flex flex-col justify-between text-white font-sans">
      {/* Top Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between text-xs font-mono text-neutral-300 border-b border-white/15 pb-3 flex-shrink-0"
      >
        <span className="tracking-widest uppercase font-semibold text-white">
          05 // TEMPORAL DRIFT
        </span>
        <div className="flex items-center gap-2 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-500/30">
          <span className="text-amber-300 text-xs font-semibold">PERIOD SHIFT:</span>
          <span className="text-white font-bold font-mono">
            {recentChangeScore} / 100
          </span>
        </div>
      </motion.div>

      {/* Main Period Comparison Section */}
      <div className="py-2 space-y-3.5 my-auto max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="p-4 rounded-xl bg-[#121626] border border-white/15 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-2"
        >
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight uppercase">
              {comparison?.headline || "YOUR SOUND IS SHIFTING"}
            </h2>
            <div className="text-xs font-mono text-neutral-300 mt-0.5">
              COMPARING: <span className="text-cyan-400 font-semibold">{baseLabel.toUpperCase()}</span> vs{" "}
              <span className="text-neutral-400">{targetLabel.toUpperCase()}</span>
            </div>
          </div>
        </motion.div>

        {/* Shift Delta Cards */}
        <div className="space-y-2.5">
          {shifts.slice(0, 4).map((shift, idx) => {
            const isGain = shift.delta > 0;
            return (
              <motion.div
                key={shift.family}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.12 + idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-3.5 rounded-xl bg-[#121626]/90 border border-white/20 shadow-lg flex flex-col gap-2 group hover:border-white/40 transition-colors"
              >
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-black text-white tracking-tight">
                    {shift.displayName}
                  </span>
                  <div className="flex items-center gap-2.5 font-mono text-xs">
                    <span className="text-neutral-400 font-medium">
                      {shift.previousPercentage}%
                    </span>
                    <span className="text-neutral-500">→</span>
                    <span className="text-white font-extrabold">
                      {shift.currentPercentage}%
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-black flex items-center gap-1 shadow-sm ${
                        isGain
                          ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"
                          : "bg-rose-500/25 text-rose-300 border border-rose-500/40"
                      }`}
                    >
                      <span>{isGain ? "↗" : "↘"}</span>
                      <span>{isGain ? `+${shift.delta}%` : `${shift.delta}%`}</span>
                    </span>
                  </div>
                </div>

                {/* Comparative Dual Bar Track */}
                <div className="relative h-2.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, shift.previousPercentage * 2.2)}%` }}
                    transition={{ duration: 0.6, delay: 0.15 + idx * 0.08 }}
                    className="absolute left-0 top-0 h-full rounded-full opacity-30 bg-white"
                  />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, shift.currentPercentage * 2.2)}%` }}
                    transition={{
                      duration: 0.85,
                      delay: 0.25 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute left-0 top-0 h-full rounded-full shadow-[0_0_12px_rgba(56,189,248,0.6)]"
                    style={{
                      backgroundColor: isGain ? accentColor : "rgba(244, 63, 94, 0.9)",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Insights Note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="p-3.5 rounded-xl bg-[#111422] border border-white/15 text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans flex-shrink-0"
      >
        {comparison?.narrative ||
          "Your recent listening has moved noticeably away from your historical baseline."}
      </motion.div>
    </div>
  );
};

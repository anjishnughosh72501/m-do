import React, { useState } from "react";
import { TimeRange } from "@/types";
import { GlassButton } from "../glass/GlassButton";

interface RangeSelectorViewProps {
  userName: string;
  onSelectRange: (range: TimeRange, compareWith?: TimeRange) => void;
  isLoading?: boolean;
}

export const RangeSelectorView: React.FC<RangeSelectorViewProps> = ({
  userName,
  onSelectRange,
  isLoading = false,
}) => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("short_term");
  const [enableCompare, setEnableCompare] = useState<boolean>(true);

  const ranges: {
    id: TimeRange;
    label: string;
    subtext: string;
    tooltip: string;
  }[] = [
    {
      id: "short_term",
      label: "LAST MONTH",
      subtext: "~4 weeks of recent listening",
      tooltip: "Spotify's recent listening window.",
    },
    {
      id: "medium_term",
      label: "LAST 6 MONTHS",
      subtext: "Medium-range rotation",
      tooltip: "Spotify's medium-term window.",
    },
    {
      id: "long_term",
      label: "LAST YEAR",
      subtext: "Historical musical foundation",
      tooltip: "Spotify's multi-season window.",
    },
  ];

  const handleStart = () => {
    // If comparison is enabled and user chose short_term or medium_term, compare with long_term
    const compareTarget: TimeRange | undefined =
      enableCompare && selectedRange !== "long_term" ? "long_term" : undefined;
    onSelectRange(selectedRange, compareTarget);
  };

  return (
    <div className="relative w-full h-[100dvh] flex flex-col justify-between items-center p-6 sm:p-12 text-white bg-[#080808] overflow-hidden select-none z-30">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between z-10">
        <div className="font-mono text-xs tracking-widest text-white/50 uppercase">
          WELCOME, <span className="text-white font-semibold">{userName}</span>
        </div>
        <div className="text-xs font-mono text-white/40">
          STEP 02 // TIME HORIZON
        </div>
      </div>

      {/* Main Range Selection Interface */}
      <div className="my-auto max-w-xl w-full text-center space-y-6 sm:space-y-8 z-10">
        <div>
          <span className="text-xs font-mono tracking-widest text-white/40 uppercase">
            TEMPORAL CALIBRATION
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mt-1">
            HOW FAR BACK
            <br />
            SHOULD WE LOOK?
          </h2>
        </div>

        {/* 3 Minimal Glass Range Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ranges.map((r) => {
            const isSelected = selectedRange === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRange(r.id)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? "bg-white/[0.12] border-white/50 shadow-glassGlow"
                    : "bg-white/[0.04] border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-wider font-semibold text-white">
                      {r.label}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                  <p className="text-[11px] text-white/50 mt-1 leading-snug">
                    {r.subtext}
                  </p>
                </div>
                <span className="text-[9px] font-mono text-white/30 mt-3 block">
                  {r.tooltip}
                </span>
              </button>
            );
          })}
        </div>

        {/* Period Comparison Toggle */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <label className="inline-flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-white/70">
            <input
              type="checkbox"
              checked={enableCompare}
              onChange={(e) => setEnableCompare(e.target.checked)}
              className="rounded bg-neutral-900 border-white/20 text-cyan-400 focus:ring-0 w-4 h-4 cursor-pointer"
            />
            <span>COMPARE WITH HISTORICAL BASELINE</span>
          </label>
        </div>

        {/* Start Analysis Button */}
        <div className="pt-4">
          <GlassButton
            variant="primary"
            size="lg"
            onClick={handleStart}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            {isLoading ? "CALCULATING MATRICES..." : "START ANALYSIS →"}
          </GlassButton>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="text-[11px] font-mono text-white/40 z-10">
        DATA IS RETRIEVED ON-THE-FLY &amp; PROCESSED LOCALLY IN YOUR BROWSER
      </div>
    </div>
  );
};

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
    jpLabel: string;
    enLabel: string;
    subtext: string;
    tooltip: string;
  }[] = [
    {
      id: "short_term",
      jpLabel: "先月",
      enLabel: "LAST MONTH",
      subtext: "直近4週間の視聴傾向",
      tooltip: "Spotify's recent listening window.",
    },
    {
      id: "medium_term",
      jpLabel: "過去6ヶ月",
      enLabel: "LAST 6 MONTHS",
      subtext: "中期的なローテーション",
      tooltip: "Spotify's medium-term window.",
    },
    {
      id: "long_term",
      jpLabel: "年間",
      enLabel: "LAST YEAR",
      subtext: "音楽的基礎・通年嗜好",
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
    <div className="relative w-full h-[100dvh] flex flex-col justify-between items-center p-6 sm:p-12 text-white bg-[#06070a] overflow-hidden select-none z-30">
      {/* Subtle Japanese Solar Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(225, 29, 72, 0.4) 0%, rgba(15, 23, 42, 0.0) 70%)",
        }}
      />

      {/* Top Header */}
      <div className="w-full flex items-center justify-between z-10 border-b border-white/10 pb-4">
        <div className="font-mono text-xs tracking-widest text-white/60">
          ようこそ、<span className="text-white font-serifJp font-bold text-sm tracking-normal">{userName}</span> 様 <span className="text-white/40">// WELCOME</span>
        </div>
        <div className="text-xs font-mono text-white/50 tracking-wider">
          第二段階 <span className="text-white/30">//</span> STEP 02: 時間軸の選定
        </div>
      </div>

      {/* Main Range Selection Interface */}
      <div className="my-auto max-w-xl w-full text-center space-y-6 sm:space-y-8 z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono tracking-widest text-neutral-300 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            時間軸の較正 // TEMPORAL CALIBRATION
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serifJp font-normal tracking-tight text-white mt-1">
            どの時間軸を
            <br />
            観測しますか？
          </h2>
          <p className="text-xs sm:text-sm font-sans text-neutral-400 mt-2">
            過去のリスニングデータを多角的に解析し、あなたの音楽的肖像を紡ぎ出します。
          </p>
        </div>

        {/* 3 Minimal Glass Range Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {ranges.map((r) => {
            const isSelected = selectedRange === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRange(r.id)}
                className={`p-4 sm:p-5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? "bg-white/[0.12] border-rose-400/60 shadow-[0_0_25px_rgba(225,29,72,0.25)]"
                    : "bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.06]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-serifJp font-semibold text-white block">
                        {r.jpLabel}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 tracking-wider">
                        {r.enLabel}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-300 mt-2.5 leading-snug font-sans">
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
          <label className="inline-flex items-center gap-2.5 cursor-pointer select-none text-xs font-mono text-white/80 hover:text-white transition-colors">
            <input
              type="checkbox"
              checked={enableCompare}
              onChange={(e) => setEnableCompare(e.target.checked)}
              className="rounded bg-neutral-900 border-white/20 text-rose-500 focus:ring-0 w-4 h-4 cursor-pointer accent-rose-500"
            />
            <span>過去の基準値（年間データ）との変遷を比較 // COMPARE BASELINE</span>
          </label>
        </div>

        {/* Start Analysis Button */}
        <div className="pt-2">
          <GlassButton
            variant="primary"
            size="lg"
            onClick={handleStart}
            disabled={isLoading}
            className="w-full sm:w-auto font-serifJp text-sm tracking-wide px-8 py-3.5 bg-rose-600/80 hover:bg-rose-600 border-rose-500/50 shadow-[0_0_20px_rgba(225,29,72,0.35)]"
          >
            {isLoading ? "解析マトリクス算出中..." : "解析を開始する // START ANALYSIS →"}
          </GlassButton>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="text-[11px] font-mono text-neutral-500 z-10">
        データはブラウザ内部でのみ確定論的に処理され、外部保存されません
      </div>
    </div>
  );
};

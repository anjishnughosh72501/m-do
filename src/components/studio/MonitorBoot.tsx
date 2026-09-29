import React from "react";

interface MonitorBootProps {
  bootProgress: number; // 0.0 to 1.0
  accentColor?: string;
}

export const MonitorBoot: React.FC<MonitorBootProps> = ({
  bootProgress,
  accentColor = "#38bdf8",
}) => {
  // Boot steps mapped to progress thresholds
  const steps = [
    { label: "mūdo (ムード) コアカーネル起動 // BOOTING CORE KERNEL...", threshold: 0.15 },
    { label: "Spotify データグラフ接続 // CONNECTING GRAPH API...", threshold: 0.35 },
    { label: "聴覚プロファイル及び親和性の読込 // READING AFFINITIES...", threshold: 0.55 },
    { label: "ジャンル系列とエントロピーの写像 // MAPPING ENTROPY...", threshold: 0.75 },
    { label: "確定論的音楽肖像の構築完了 // BUILDING IDENTITY...", threshold: 0.9 },
  ];

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 font-mono select-none bg-black/85 z-20">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-xs tracking-widest text-white/80">
            システム起動 // BOOT SEQUENCE (STAGE 01)
          </span>
        </div>
        <div className="text-xs text-white/40">
          確定論的メモリ: 100% // DETERMINISTIC
        </div>
      </div>

      {/* Center Boot Terminal Readout */}
      <div className="space-y-3 my-auto max-w-lg">
        {steps.map((step, idx) => {
          const isDone = bootProgress >= step.threshold;
          const isCurrent =
            bootProgress < step.threshold &&
            (idx === 0 || bootProgress >= steps[idx - 1].threshold);

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs sm:text-sm transition-opacity duration-300 ${
                isDone
                  ? "text-white opacity-100"
                  : isCurrent
                  ? "text-[var(--accent-color,#38bdf8)] opacity-100 animate-pulse"
                  : "text-white/20 opacity-30"
              }`}
            >
              <span className="font-mono text-[10px] w-6">
                {isDone ? "[OK]" : isCurrent ? "[..]" : "[  ]"}
              </span>
              <span>{step.label}</span>
            </div>
          );
        })}
      </div>

      {/* Bottom Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[11px] text-white/50">
          <span>作業領域の初期化中 // INITIALIZING WORKSPACE</span>
          <span>{Math.round(bootProgress * 100)}%</span>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-150"
            style={{
              width: `${Math.round(bootProgress * 100)}%`,
              backgroundColor: accentColor,
            }}
          />
        </div>
      </div>
    </div>
  );
};

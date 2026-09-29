import React from "react";
import { DEMO_PERSONAS, DemoPersona } from "@/data/demo-data";
import { GlassButton } from "../glass/GlassButton";

interface DemoPersonaSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPersona: (persona: DemoPersona) => void;
}

export const DemoPersonaSelector: React.FC<DemoPersonaSelectorProps> = ({
  isOpen,
  onClose,
  onSelectPersona,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 rounded-2xl border border-white/20 text-white font-sans space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-serifJp font-bold tracking-tight">デモ用聴覚プロファイル // DEMO PROFILES</h2>
            <p className="text-xs text-white/50 mt-1 font-sans">
              確定論的解析エンジンを即座に検証するための疑似ペルソナを選択してください。
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-xs font-mono cursor-pointer"
          >
            [閉じる // ESC]
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(DEMO_PERSONAS).map((persona) => (
            <div
              key={persona.id}
              onClick={() => onSelectPersona(persona)}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/30 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base font-serifJp font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {persona.name}
                </h3>
                <p className="text-xs text-white/50 mt-1.5 leading-relaxed font-sans">
                  {persona.tagline}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-white/40 group-hover:text-white/80">
                <span>検証データセット // SET</span>
                <span className="font-semibold text-cyan-400">選択 // SELECT →</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-white/10">
          <span className="text-[11px] text-white/40 font-mono">
            Spotify連携不要 • ブラウザ内完結
          </span>
          <GlassButton variant="secondary" size="sm" onClick={onClose} className="font-serifJp text-xs">
            キャンセル
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

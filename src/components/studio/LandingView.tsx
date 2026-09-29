import React from "react";
import Image from "next/image";
import { GlassButton } from "../glass/GlassButton";

interface LandingViewProps {
  onContinueSpotify: () => void;
  onTryDemo: () => void;
  onOpenPrivacy: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onContinueSpotify,
  onTryDemo,
  onOpenPrivacy,
  isLoading = false,
  errorMessage,
}) => {
  return (
    <div className="relative w-full h-[100dvh] flex flex-col justify-between items-center p-6 sm:p-12 text-white bg-[#060609] overflow-hidden select-none z-30">
      {/* 1. Atmospheric Japanese Sumi & Vermilion Aura Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <Image
          src="/door/door-open.png"
          alt="Studio Chamber Portal"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-10 filter blur-md scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060609] via-[#060609]/85 to-[#060609]/95" />

        {/* Cinnabar / Crimson Solar Disc (日の丸 Aura) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] rounded-full bg-gradient-to-br from-rose-600/20 via-red-900/10 to-transparent blur-[90px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[35vh] rounded-full bg-amber-700/10 blur-[120px]" />

        {/* Monumental Watermark Katakana Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serifJp font-black text-[22vw] text-white/[0.025] tracking-[0.2em] uppercase whitespace-nowrap leading-none select-none">
          ムード
        </div>

        {/* Delicate Vertical Japanese Calligraphy Side Accents */}
        <div className="hidden lg:flex flex-col items-center gap-4 fixed left-10 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
          <span className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <span className="font-serifJp text-xs tracking-[0.45em] [writing-mode:vertical-rl] text-neutral-300">
            音の記憶 // 魂の共鳴
          </span>
          <span className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>

        <div className="hidden lg:flex flex-col items-center gap-4 fixed right-10 top-1/2 -translate-y-1/2 pointer-events-none opacity-30">
          <span className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <span className="font-serifJp text-xs tracking-[0.45em] [writing-mode:vertical-rl] text-neutral-300">
            音楽分析空間 // ムード
          </span>
          <span className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </div>

      {/* Top Header */}
      <div className="w-full flex items-center justify-between z-10 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Hanko Stamp Mini Seal */}
          <div className="w-7 h-7 rounded border border-rose-500/60 bg-rose-950/70 flex items-center justify-center font-serifJp text-xs text-rose-300 font-bold shadow-[0_0_12px_rgba(244,63,94,0.35)]">
            気
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serifJp text-sm tracking-widest text-white font-bold leading-tight">
              mūdo
            </span>
            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
              ムード // OS 2.6
            </span>
          </div>
        </div>

        <button
          onClick={onOpenPrivacy}
          className="text-white/50 hover:text-white text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer border border-white/10 px-3.5 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08]"
        >
          プライバシー設計 // PRIVACY
        </button>
      </div>

      {/* Center Cinematic Editorial Hero */}
      <div className="my-auto max-w-3xl text-center space-y-6 z-10 w-full px-2">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-950/40 text-xs font-mono tracking-widest text-rose-300 uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
          <span>音響分析体験 // DETERMINISTIC MUSIC ANALYSIS</span>
        </div>

        {/* Canonical Product Title & Japanese Theme */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serifJp font-bold tracking-tight text-white leading-none drop-shadow-2xl">
              mūdo
            </h1>
            {/* Red seal Hanko stamp */}
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg border-2 border-rose-500/70 bg-rose-950/80 flex flex-col items-center justify-center text-rose-300 font-serifJp font-bold shadow-[0_0_20px_rgba(244,63,94,0.45)] select-none">
              <span className="text-xs sm:text-sm leading-none">ム</span>
              <span className="text-[10px] sm:text-xs leading-none">ード</span>
            </div>
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl font-serifJp text-white/90 font-light tracking-wide">
            あなたの音楽が、すべてを語る。
          </p>

          <p className="text-xs sm:text-sm md:text-base text-neutral-300 max-w-lg mx-auto font-sans font-normal leading-relaxed pt-1">
            Your music says more than you think. Step into a meditative acoustic chamber
            and decode your Spotify listening history into an original musical archetype.
          </p>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-500/15 text-rose-200 text-xs font-mono max-w-md mx-auto shadow-lg">
            {errorMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 max-w-md mx-auto">
          <GlassButton
            variant="primary"
            size="lg"
            onClick={onContinueSpotify}
            disabled={isLoading}
            className="w-full sm:w-auto font-serifJp font-bold tracking-wider text-xs bg-rose-950/40 hover:bg-rose-900/60 border-rose-500/40 hover:border-rose-400 text-white shadow-[0_0_30px_rgba(244,63,94,0.3)] transition-all"
          >
            {isLoading ? "接続中..." : "CONNECT WITH SPOTIFY // 連携"}
          </GlassButton>

          <GlassButton
            variant="secondary"
            size="lg"
            onClick={onTryDemo}
            className="w-full sm:w-auto font-serifJp font-normal tracking-wider text-xs border-white/15 hover:border-white/30 text-white/80 hover:text-white"
          >
            DEMO PERSONAS // デモ体験
          </GlassButton>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-2 z-10 border-t border-white/10 pt-4">
        <span className="tracking-wider">
          純粋数学的アルゴリズム • 音響解析 • 完全プライベート
        </span>
        <span className="text-neutral-500 uppercase tracking-widest font-mono">
          MŪDO // ZERO AI HALLUCINATION
        </span>
      </div>
    </div>
  );
};



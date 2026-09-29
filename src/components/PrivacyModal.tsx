import React from "react";
import { GlassButton } from "./glass/GlassButton";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 rounded-2xl border border-white/20 text-white font-sans space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-light tracking-tight">PRIVACY & DATA DESIGN</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-sm font-mono cursor-pointer"
          >
            [CLOSE]
          </button>
        </div>

        <div className="space-y-5 text-xs sm:text-sm">
          <div>
            <h3 className="font-mono text-emerald-400 text-xs tracking-wider uppercase mb-2">
              ✓ WHAT MŪDO USES
            </h3>
            <ul className="space-y-1.5 text-white/80 list-disc list-inside">
              <li>Your Spotify public profile name and avatar</li>
              <li>Your top affinity artists (via official Spotify API)</li>
              <li>Your top affinity tracks</li>
              <li>Recently played tracks when permitted by your token</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-rose-400 text-xs tracking-wider uppercase mb-2">
              × WHAT MŪDO NEVER DOES
            </h3>
            <ul className="space-y-1.5 text-white/70 list-disc list-inside">
              <li>Never streams audio or plays music</li>
              <li>Never alters or modifies your playlists or library</li>
              <li>Never sells, monetizes, or permanently stores your data</li>
              <li>Never sends your listening habits to external AI or LLM models</li>
              <li>All analysis is computed 100% locally and deterministically</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/60 text-xs leading-relaxed">
            Authentication is performed directly via Spotify&apos;s official OAuth 2.0 with
            PKCE (Proof Key for Code Exchange). Your credentials never touch an intermediary server.
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <GlassButton variant="primary" size="md" onClick={onClose}>
            Understood
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

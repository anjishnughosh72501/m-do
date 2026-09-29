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
          <h2 className="text-xl font-serifJp font-bold tracking-tight">プライバシーとデータ設計 // PRIVACY DESIGN</h2>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white text-xs font-mono cursor-pointer"
          >
            [閉じる // ESC]
          </button>
        </div>

        <div className="space-y-5 text-xs sm:text-sm font-sans">
          <div>
            <h3 className="font-mono text-emerald-400 text-xs tracking-wider uppercase mb-2">
              ✓ mūdo (ムード) が取得・利用する情報
            </h3>
            <ul className="space-y-1.5 text-white/80 list-disc list-inside">
              <li>Spotifyの公開プロフィール名およびアイコン</li>
              <li>公式Spotify APIによるトップ親和性アーティスト</li>
              <li>トップ親和性トラックおよびジャンル情報</li>
              <li>認証トークンが許可する範囲での直近再生履歴</li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-rose-400 text-xs tracking-wider uppercase mb-2">
              × mūdo が決して行わないこと
            </h3>
            <ul className="space-y-1.5 text-white/70 list-disc list-inside">
              <li>音声のストリーミング再生や外部音楽配信</li>
              <li>プレイリストやライブラリの改変・編集</li>
              <li>データの外部永続保存、販売、商業利用</li>
              <li>外部AIやLLMモデルへの視聴データの送信（完全確定論的解析）</li>
              <li>すべての集計・分類はブラウザ内部（ローカル）でのみ完結</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/60 text-xs leading-relaxed">
            認証はSpotify公式のOAuth 2.0 PKCE（Proof Key for Code Exchange）によって直接実行されます。クレデンシャルやパスワードが仲介サーバーを経由することは一切ありません。
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <GlassButton variant="primary" size="md" onClick={onClose} className="font-serifJp text-xs px-6">
            了解 // UNDERSTOOD
          </GlassButton>
        </div>
      </div>
    </div>
  );
};

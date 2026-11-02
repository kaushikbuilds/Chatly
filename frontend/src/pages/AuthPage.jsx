import { useState } from "react";
import AuthHeader from "../components/auth/AuthHeader";
import AuthHeroPanel from "../components/auth/AuthHeroPanel";
import AuthActionPanel from "../components/auth/AuthActionPanel";
import { useWallpaper } from "../context/wallpaper";
import { Heart } from "lucide-react";

export default function AuthPage() {
  const { frameStyle } = useWallpaper();
  const [dark, setDark] = useState(true);

  return (
    <div
      className="box-border flex h-dvh flex-col overflow-hidden p-3 sm:p-5 md:p-8"
      style={frameStyle}
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[1440px] flex-1 flex-col overflow-hidden rounded-3xl border border-blue-500/30 bg-[#050816] text-white shadow-[0_0_60px_rgba(37,99,235,0.25)]">
        <div className="shrink-0">
          <AuthHeader dark={dark} onToggleDark={() => setDark(!dark)} />
        </div>

        <main className="relative min-h-0 flex-1 overflow-hidden bg-[#050816] [--u:clamp(10px,2.8vw,13px)] lg:[container-type:size] lg:[--u:min(1cqw,1.84cqh)]">
          <video
            src="/wallpapers/Rocket_animating_in_space_loop_d0acc240.mp4"
            poster="/wallpapers/Neon_Blue_Rocket_Through_Space.png"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover object-[30%_50%] lg:object-[25%_50%]"
          />

          {/* mobile par text/card padhne ke liye halka dark layer */}
          <div className="pointer-events-none absolute inset-0 bg-[#050816]/35 lg:hidden" />

          {/* mobile: scrollable stack | desktop: contents (panels khud absolute) */}
          <div className="relative z-10 flex h-full flex-col items-center gap-6 overflow-y-auto px-4 py-6 lg:contents">
            <AuthHeroPanel />
            <AuthActionPanel />
          </div>
        </main>

        <footer className="flex h-12 shrink-0 items-center gap-3 border-t border-white/5 bg-[#050816] px-4 text-xs text-slate-400 sm:gap-4 sm:px-8 sm:text-sm">
          <span>MessagePro v2.0.0</span>
          <span className="h-4 w-px bg-white/10" />
          <span className="flex items-center gap-2">
            Built for a better tomorrow
            <Heart className="h-4 w-4 fill-blue-500 text-blue-500" />
          </span>
        </footer>
      </div>
    </div>
  );
}
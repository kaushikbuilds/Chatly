import { MessageCircleMore } from "lucide-react";
import {WallpaperPicker} from "../WallpaperPicker";
import { ThemePresetPicker } from "../ThemePresetPicker";
import {ThemeToggle} from "../ThemeToggle";

export default function AuthHeader() {
  return (
    <header className="relative z-20 flex h-[84px] shrink-0 items-center justify-between border-b border-white/5 px-6">
      {/* logo (sidebar nahi hai, isliye header me) */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_0_18px_rgba(56,130,255,0.6)]">
          <MessageCircleMore className="h-5 w-5 text-white" />
        </div>
        <div className="leading-tight">
          <div className="text-lg font-bold">
            Message<span className="text-sky-400">Pro</span>
          </div>
          <div className="text-[10px] text-slate-400">Connect • Chat • Share</div>
        </div>
      </div>

      {/* icons: theme, image, dark mode */}
      <div className="flex items-center gap-3">
        <ThemePresetPicker/>
         <WallpaperPicker/>
        <ThemeToggle/>
      </div>
    </header>
  );
}
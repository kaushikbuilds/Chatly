import { MessageCircleMore } from "lucide-react";

export  function PageLoader() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-6 bg-[#050816] text-white">
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* ghoomta neon ring */}
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-sky-400 border-r-violet-500 shadow-[0_0_24px_rgba(56,189,248,0.5)]" />

        {/* logo */}
        <div className="flex h-14 w-14 animate-pulse items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-[0_0_28px_rgba(56,130,255,0.7)]">
          <MessageCircleMore className="h-7 w-7 text-white" />
        </div>
      </div>

      <div className="text-center leading-tight">
        <div className="text-xl font-bold">
          Message<span className="text-sky-400">Pro</span>
        </div>
        <div className="mt-1 text-xs text-slate-400">Loading...</div>
      </div>
    </div>
  );
}
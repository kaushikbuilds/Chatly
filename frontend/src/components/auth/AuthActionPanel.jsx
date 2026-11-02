import { ArrowRight, ShieldCheck } from "lucide-react";
import { useClerk } from "@clerk/react";

const u = (n) => `calc(var(--u) * ${n})`;

const AFTER_AUTH = "/";

export default function AuthActionPanel() {
  const clerk = useClerk();

  const handleContinue = () => {
    clerk.openSignIn({
      fallbackRedirectUrl: AFTER_AUTH,
      forceRedirectUrl: AFTER_AUTH,
    });
  };

  return (
    <section className="z-20 my-auto w-[min(92vw,400px)] shrink-0 bg-transparent lg:absolute lg:right-[calc(var(--u)*8)] lg:top-1/2 lg:my-0 lg:w-[calc(var(--u)*37.5)] lg:-translate-y-1/2">
      {/* gradient glow border */}
      <div
        className="bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500"
        style={{
          padding: u(0.14),
          borderRadius: u(2.2),
          boxShadow: "0 0 40px rgba(59,130,246,0.45)",
        }}
      >
        <div
          className="text-center backdrop-blur-xl"
          style={{
            borderRadius: u(2.1),
            padding: `${u(3.4)} ${u(3.2)} ${u(3)}`,
            background:
              "linear-gradient(160deg, rgba(16,52,130,0.78), rgba(30,22,100,0.78))",
          }}
        >
          {/* logo + orbit ring */}
          <div
            className="relative mx-auto flex items-center justify-center"
            style={{ width: u(11), height: u(8) }}
          >
            <span
              className="pointer-events-none absolute rounded-[50%] border-2 border-sky-400/80"
              style={{
                width: u(11),
                height: u(5.6),
                transform: "rotate(-18deg)",
                boxShadow: "0 0 14px rgba(56,189,248,0.7)",
              }}
            />
            <div
              className="relative flex items-center justify-center border border-blue-400/40 bg-gradient-to-br from-blue-500/50 to-blue-900/70"
              style={{
                width: u(7),
                height: u(7),
                borderRadius: u(1.5),
                boxShadow: "0 0 28px rgba(59,130,246,0.6)",
              }}
            >
              <svg viewBox="0 0 48 48" style={{ width: u(4.2), height: u(4.2) }}>
                <path
                  d="M24 6C13.5 6 6 13 6 22c0 5 2.4 9.3 6.3 12.2L10 42l8.6-4.2c1.7.4 3.5.6 5.4.6 10.5 0 18-7 18-16S34.5 6 24 6z"
                  fill="#60a5fa"
                />
                <circle cx="18" cy="21" r="2.6" fill="#0b1b4d" />
                <circle cx="30" cy="21" r="2.6" fill="#0b1b4d" />
                <path
                  d="M18 28c3.5 3 8.5 3 12 0"
                  stroke="#0b1b4d"
                  strokeWidth="2.4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <h2
            className="font-bold text-white"
            style={{ fontSize: u(2.5), marginTop: u(1.4) }}
          >
            Welcome to Message
          </h2>

          <p
            className="flex items-center justify-center text-slate-200"
            style={{ fontSize: u(1.4), gap: u(0.8), marginTop: u(0.8) }}
          >
            <span className="bg-white/25" style={{ width: u(2), height: 1 }} />
            Your personal messaging space
            <span className="bg-white/25" style={{ width: u(2), height: 1 }} />
          </p>

          <button
            type="button"
            onClick={handleContinue}
            className="relative z-30 flex w-full cursor-pointer items-center justify-center font-semibold text-white transition hover:scale-[1.02]"
            style={{
              height: u(4.9),
              marginTop: u(2.6),
              gap: u(0.8),
              fontSize: u(1.6),
              borderRadius: 9999,
              background: "linear-gradient(90deg,#0ea5ff,#6d6bff 60%,#8b5cf6)",
              boxShadow: "0 0 28px rgba(56,189,248,0.5)",
            }}
          >
            Continue
            <ArrowRight style={{ width: u(1.8), height: u(1.8) }} />
          </button>

          <p
            className="flex items-center justify-center text-slate-200"
            style={{ fontSize: u(1.1), gap: u(0.6), marginTop: u(2.2) }}
          >
            <ShieldCheck
              className="text-blue-400"
              style={{ width: u(1.4), height: u(1.4) }}
            />
            Secure &amp; Private
          </p>
        </div>
      </div>
    </section>
  );
}
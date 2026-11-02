const u = (n) => `calc(var(--u) * ${n})`;

export default function AuthHeroPanel() {
  return (
    <section className="pointer-events-none z-20 shrink-0 bg-transparent text-center lg:absolute lg:left-[calc(var(--u)*4.8)] lg:top-[calc(var(--u)*2.8)] lg:text-left">
      <p
        className="flex items-center justify-center font-medium text-slate-200 lg:justify-start"
        style={{ gap: u(0.9), fontSize: `max(10px, ${u(0.85)})`, letterSpacing: "0.32em" }}
      >
        <span className="bg-white/30" style={{ width: u(2), height: 1 }} />
        WELCOME TO MESSAGEPRO
        <span className="bg-white/30" style={{ width: u(2), height: 1 }} />
      </p>

      <h1
        className="font-bold leading-none text-white"
        style={{ fontSize: u(3.7), marginTop: u(1.1) }}
      >
        Open <span className="text-blue-500">Message</span>
      </h1>

      <p className="text-slate-100" style={{ fontSize: u(1.45), marginTop: u(0.9) }}>
        Chat Faster. Share More. Stay Connected.
      </p>

      <div
        className="mx-auto rounded-full bg-gradient-to-r from-sky-500 to-transparent lg:mx-0"
        style={{ width: u(11), height: u(0.22), marginTop: u(0.9) }}
      />
    </section>
  );
}
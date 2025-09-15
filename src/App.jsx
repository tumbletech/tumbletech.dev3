import React, { useEffect, useMemo, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <SiteNav />
      <main id="home" className="relative min-h-[92vh] w-full overflow-hidden">
        <HeroWithCallouts />
      </main>
    </div>
  );
}

/* ---------------- NAV ---------------- */
function SiteNav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-black/60 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 select-none">
          <img src="/001.mainlogo-b.png" alt="Tumbletech" className="h-8 w-auto" />
        </a>
        <ul className="hidden md:flex items-center gap-8 text-cyan-300">
          <li><a href="#home" className="hover:text-cyan-200">Home</a></li>
          <li><a href="#services" className="hover:text-cyan-200">Services</a></li>
          <li><a href="#projects" className="hover:text-cyan-200">Featured Projects</a></li>
          <li><a href="#contact" className="hover:text-cyan-200">Contact Us</a></li>
        </ul>
      </nav>
    </header>
  );
}

/* --------------- HERO + CALLOUTS ---------------- */
function HeroWithCallouts() {
  const [showCallouts, setShowCallouts] = useState(false);
  const spin = useAnimation();

  useEffect(() => {
    spin.start({ rotate: 360 }, { repeat: Infinity, ease: "linear", duration: 8 });
    const t = setTimeout(() => setShowCallouts(true), 2000);
    return () => clearTimeout(t);
  }, [spin]);

  const center = useMemo(() => ({ x: 960, y: 540 }), []);

  const callouts = [
    // shorter + indented left boxes
    { id: "auto", label: "Automate Your Business", box: { x: 160, y: 220, w: 280, h: 70 } },
    { id: "idea", label: "From Idea to App",       box: { x: 160, y: 520, w: 260, h: 70 } },
    // shorter right-side boxes
    { id: "web",  label: "Web Apps & Websites",    box: { x: 1180, y: 240, w: 300, h: 70 } },
    { id: "ai",   label: "AI-Powered Solutions",   box: { x: 1180, y: 720, w: 300, h: 70 } },
  ];

  return (
    <section className="relative h-[calc(100vh-80px)] md:h-[calc(100vh-88px)]">
      {/* center spinning logo */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.img
          animate={spin}
          src="/002.favicon-b.png"
          alt="Tumbletech Spinning Logo"
          className="h-40 w-40 origin-center"
          style={{ transformOrigin: "center" }}
        />
      </div>

      {/* Desktop: connectors + callouts */}
      <div className="hidden md:block">
        {showCallouts && (
          <>
            <svg className="absolute inset-0 z-0" viewBox="0 0 1920 1080" preserveAspectRatio="none">
              {callouts.map((c, i) => {
                const target = { x: c.box.x + 12, y: c.box.y + c.box.h / 2 };
                return (
                  <Connector
                    key={`line-${c.id}`}
                    from={center}
                    to={target}
                    delay={0.15 + i * 0.12}
                  />
                );
              })}
            </svg>

            {callouts.map((c, i) => (
              <motion.a
                key={c.id}
                href="#services"
                className="absolute z-10 group"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.22 + i * 0.12, type: "spring", stiffness: 240, damping: 24 }}
                style={{ left: c.box.x, top: c.box.y, width: c.box.w, height: c.box.h }}
              >
                <div className="h-full w-full rounded-lg border border-cyan-400/60 text-white flex items-center px-6 text-lg tracking-wide shadow-[0_0_0_1px_rgba(56,189,248,0.25)] group-hover:border-cyan-300 group-hover:shadow-[0_0_0_1px_rgba(125,211,252,0.35)] transition">
                  {c.label}
                </div>
              </motion.a>
            ))}
          </>
        )}
      </div>
    </section>
  );
}

/* ----------- Connector line ----------- */
function Connector({ from, to, delay = 0 }) {
  const mid = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 + (to.y > from.y ? 30 : -30),
  };
  const d = `M ${from.x},${from.y} L ${mid.x},${mid.y} L ${to.x},${to.y}`;
  return (
    <motion.path
      d={d}
      stroke="url(#tt-cyan)"
      strokeWidth={2}
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay, duration: 0.9, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,0.6))" }} // add glow
    >
      <defs>
         {/* bright green gradient */}
        <linearGradient id="tt-green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00ff00" />
          <stop offset="100%" stopColor="#00cc00" />
        </linearGradient>
      </defs>
    </motion.path>
  );
}

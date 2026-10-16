"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  ["Fast", "Built with a focus on performance.", "bolt"],
  ["Customizable", "Make your system yours.", "settings"],
  ["Secure", "Modern security features and Secure Boot support.", "shield"],
  ["Developer Friendly", "Tools and workflows designed for developers.", "code"],
  ["Wayland First", "Modern Linux graphics with Wayland.", "screen"],
  ["Built Different", "Tuxy is designed as its own Linux experience.", "layers"],
] as const;

const editions = [
  {
    name: "TUXY FREEg",
    price: "$0",
    description: "Fully usable Tuxy OS.",
    items: ["Full system", "Wayland & KDE Plasma", "Community support"],
    featured: false,
    trial: null,
    suffix: null,
  }
];

/* const steps = [
  ["Open Buy Keys", "Launch the Buy Keys tool from Tuxy Settings or the website."],
  ["Purchase a Tuxy Pro license", "Complete checkout to generate your personal license pair."],
  ["Download your license files", "You'll receive tuxy-pro.tux2 and tuxy-pro.tux2.key."],
  ["Copy both files to USB", "Both files are required together: the license and its decryption key."],
  ["Open Tuxy Settings", "On your Tuxy OS install, go to Settings → System."],
  ["Select Activate Tuxy OS Pro", "Found under the licensing section of Tuxy Settings."],
  ["Select both files", "Point Tuxy to the two license files on your USB."],
  ["Click Activate", "Tuxy decrypts the license locally and unlocks Pro features."],
]; */

const MARQUEE_ITEMS = ["WAYLAND", "KDE PLASMA", "SECURE BOOT", "OPEN SOURCE"];

function Icon({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
    shield: <path d="M12 2 4 5v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V5l-8-3Z" />,
    code: <path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" />,
    screen: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="1.5" />
        <path d="M9 21h6M12 17v4" />
      </>
    ),
    layers: <path d="m12 2-9 5 9 5 9-5-9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" />,
    settings: (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </>
    ),
  };
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <svg className="h-[22px] w-[22px] text-accent" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C9.5 2 8 4 8 6.5c0 1.1.3 1.9.3 2.7C6.8 10 5.5 12 5.5 14.5 5.5 18 7 20 7 20.5c0 .5-1 1-1 1.5 0 0 2.5 0 3-.5.3.3 1.5.5 3 .5s2.7-.2 3-.5c.5.5 3 .5 3 .5 0-.5-1-1-1-1.5 0-.5 1.5-2.5 1.5-6 0-2.5-1.3-4.5-2.8-5.3 0-.8.3-1.6.3-2.7C16 4 14.5 2 12 2Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="10" cy="8" r=".9" fill="currentColor" />
      <circle cx="14" cy="8" r=".9" fill="currentColor" />
    </svg>
  );
}

function Label({ children }: { children: string }) {
  return <div className="mb-3.5 font-mono text-[12.5px] text-ice">{"// "}{children}</div>;
}

/**
 * Glass panel: every "block" on the page (cards, terminals, boxes) is one of these.
 * It bundles three effects together:
 *  - a mouse-follow spotlight (handled globally by the `.spotlight-panel` effect hook)
 *  - a rotating, blurred conic-gradient glow, fully clipped inside the panel
 *  - a mouse-tilt 3D effect (handled globally by the `.tilt-panel` effect hook)
 */
function Glass({
  children,
  className = "",
  rounded = "rounded-2xl",
  ring = "neutral",
  ringOpacity = 50,
  tiltMax = 16,
  clip = true,
}: {
  children: React.ReactNode;
  className?: string;
  rounded?: string;
  ring?: "neutral" | "accent" | "none";
  ringOpacity?: number;
  tiltMax?: number;
  clip?: boolean;
}) {
  const ringGradient =
    ring === "accent"
      ? "conic-gradient(from 0deg, rgba(227,168,87,.55) 0%, rgba(227,168,87,.9) 15%, rgba(227,168,87,.35) 30%, rgba(127,186,218,.35) 50%, rgba(127,186,218,.8) 65%, rgba(127,186,218,.35) 80%, rgba(227,168,87,.55) 100%)"
      : "conic-gradient(from 0deg, rgba(127,186,218,.5) 0%, rgba(156,140,224,.6) 25%, rgba(127,186,218,.25) 50%, rgba(156,140,224,.55) 75%, rgba(127,186,218,.5) 100%)";

  return (
    <div
      data-tilt-max={tiltMax}
      className={`spotlight-panel tilt-panel isolate relative border border-white/10 bg-white/[0.04] shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_24px_60px_-24px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-[background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${rounded} ${clip ? "overflow-hidden" : ""} ${className}`}
    >
      {ring !== "none" && (
        <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden rounded-[inherit]">
          <div
            className="absolute -inset-10 animate-ring-spin blur-2xl"
            style={{ opacity: ringOpacity / 100, background: ringGradient }}
          />
        </div>
      )}
      <div
        className="spotlight pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          background:
            "radial-gradient(260px circle at var(--sx, 50%) var(--sy, 50%), rgba(255,255,255,.12), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

/** Primary/secondary button with a diagonal shine sweep on hover. */
function ShineButton({
  href,
  onClick,
  children,
  variant = "primary",
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-[14.5px] font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] [transform:translateZ(0)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden]";
  const variants: Record<string, string> = {
    primary:
      "text-ink bg-gradient-to-br from-accent-light to-accent shadow-[0_10px_30px_-10px_rgba(227,168,87,0.55)] hover:shadow-[0_14px_36px_-8px_rgba(227,168,87,0.7)] hover:-translate-y-0.5",
    secondary:
      "border border-white/10 bg-white/5 backdrop-blur-md hover:border-white/20 hover:bg-white/[0.09]",
  };
  const content = (
    <>
      <span className="relative z-10 [transform:translateZ(0)]">{children}</span>
      <span
        className="shine-sweep pointer-events-none absolute inset-0 -translate-x-full group-hover:animate-shine"
        style={{ background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%)" }}
      />
    </>
  );
  return href ? (
    <a href={href} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </a>
  ) : (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const bannerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const [tip, setTip] = useState("5");
  const [customTip, setCustomTip] = useState("");
  const [terminal, setTerminal] = useState("");

  // Hero terminal boot typing animation
  useEffect(() => {
    const lines = [
      "tuxy-installer --welcome",
      "Booting Tuxy OS installer...",
      "Kernel: Linux",
      "Desktop: KDE Plasma  Init: Systemd",
      "",
      "echo $PHILOSOPHY",
      "Linux, but your way.",
      "",
    ];
    let line = 0;
    let character = 0;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      if (line >= lines.length) return;
      const current = lines[line];
      setTerminal(lines.slice(0, line).join("\n") + (line ? "\n" : "") + current.slice(0, character));
      if (character < current.length) {
        character += 1;
        timer = setTimeout(type, current.startsWith("tuxy") || current.startsWith("echo") ? 28 : 14);
      } else {
        line += 1;
        character = 0;
        timer = setTimeout(type, 150);
      }
    };
    timer = setTimeout(type, 350);
    return () => clearTimeout(timer);
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  // Smooth-scroll for in-page anchors
  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const scrollToSection = (event: MouseEvent) => {
      const link = event.currentTarget as HTMLAnchorElement;
      const target = document.querySelector(link.hash);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", link.hash);
    };
    links.forEach((link) => link.addEventListener("click", scrollToSection));
    return () => links.forEach((link) => link.removeEventListener("click", scrollToSection));
  }, []);

  // Mouse-follow spotlight on every glass panel (skipped on touch-only devices,
  // where there's no mouseleave to clear the "stuck" hover state after a tap)
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const panels = document.querySelectorAll<HTMLElement>(".spotlight-panel");
    const cleanups = Array.from(panels).map((panel) => {
      const spotlight = panel.querySelector<HTMLElement>(":scope > .spotlight");
      if (!spotlight) return () => undefined;
      const move = (event: MouseEvent) => {
        const bounds = panel.getBoundingClientRect();
        panel.style.setProperty("--sx", `${event.clientX - bounds.left}px`);
        panel.style.setProperty("--sy", `${event.clientY - bounds.top}px`);
      };
      const enter = () => { spotlight.style.opacity = "1"; };
      const leave = () => { spotlight.style.opacity = "0"; };
      panel.addEventListener("mousemove", move);
      panel.addEventListener("mouseenter", enter);
      panel.addEventListener("mouseleave", leave);
      return () => {
        panel.removeEventListener("mousemove", move);
        panel.removeEventListener("mouseenter", enter);
        panel.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  // 3D tilt-on-hover for every panel (angle capped per-panel via data-tilt-max),
  // skipped on touch-only devices — same "stuck state" reasoning as the spotlight above
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const panels = document.querySelectorAll<HTMLElement>(".tilt-panel");
    const cleanups = Array.from(panels).map((panel) => {
      panel.style.transformStyle = "preserve-3d";
      panel.style.willChange = "transform";
      const maxAngle = parseFloat(panel.dataset.tiltMax || "16");
      const move = (event: MouseEvent) => {
        const bounds = panel.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width;
        const py = (event.clientY - bounds.top) / bounds.height;
        const rotateY = (px - 0.5) * maxAngle;
        const rotateX = (0.5 - py) * maxAngle;
        panel.style.transition = "transform 0.08s linear";
        panel.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      };
      const leave = () => {
        panel.style.transition = "transform 0.7s cubic-bezier(0.34,1.56,0.64,1)";
        panel.style.transform = "";
      };
      panel.addEventListener("mousemove", move);
      panel.addEventListener("mouseleave", leave);
      return () => {
        panel.removeEventListener("mousemove", move);
        panel.removeEventListener("mouseleave", leave);
      };
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  const chosenTip = tip === "custom" ? customTip : tip;
  const closeMenu = () => setMenuOpen(false);
  const updateCustomTip = (value: string) => {
    if (value === "") {
      setCustomTip("");
      return;
    }
    setCustomTip(String(Math.min(1000, Math.max(1, Number(value)))));
  };
  const handleDownloadClick = () => {
    setDownloaded(true);
    setPulseKey((key) => key + 1);
    setBannerVisible(true);
    if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    bannerTimerRef.current = setTimeout(() => setBannerVisible(false), 3000);
  };

  useEffect(() => {
    return () => {
      if (bannerTimerRef.current) clearTimeout(bannerTimerRef.current);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-ink text-[16px] leading-relaxed text-fg antialiased">
      {/* Layered background orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          className="animate-orb-1 absolute -left-28 -top-44 h-[660px] w-[660px] rounded-full opacity-70 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(227,168,87,.65), transparent 70%)" }}
        />
        <div
          className="animate-orb-2 absolute -right-40 top-[10%] h-[600px] w-[600px] rounded-full opacity-70 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(127,186,218,.6), transparent 70%)" }}
        />
        <div
          className="animate-orb-3 absolute -bottom-52 left-[20%] h-[500px] w-[500px] rounded-full opacity-60 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(156,140,224,.5), transparent 70%)" }}
        />
        <div
          className="animate-orb-4 absolute bottom-[8%] right-[8%] h-[400px] w-[400px] rounded-full opacity-50 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(227,168,87,.4), transparent 70%)" }}
        />
        <div
          className="animate-orb-5 absolute left-[45%] top-[42%] h-[340px] w-[340px] rounded-full opacity-40 blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(127,186,218,.45), transparent 70%)" }}
        />
      </div>
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,.03) 1px, transparent 0)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-[100] border-b border-white/10 bg-ink/60 backdrop-blur-xl backdrop-saturate-150">
        <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight">
            <Logo /> TUXY OS
          </a>
          <nav
            className={`${menuOpen ? "flex" : "hidden"} absolute left-0 right-0 top-[68px] flex-col border-b border-white/10 bg-ink/95 px-6 pb-5 pt-2 backdrop-blur-xl md:static md:flex md:flex-row md:gap-8 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none`}
          >
            {["Home", "Download", "Features", "Showcase", "Support"].map((item) => (
              <a
                key={item}
                href={`#${item === "Home" ? "top" : item === "Features" ? "why" : item.toLowerCase()}`}
                onClick={closeMenu}
                className="border-b border-white/5 py-3 text-fg-muted transition-colors hover:text-fg md:border-0 md:py-1"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3.5">
            <a href="https://github.com/Tuxy-os" className="hidden text-fg-muted transition-colors hover:text-fg sm:flex" aria-label="GitHub repository">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.5 2 2 6.6 2 12.2c0 4.5 2.9 8.3 6.8 9.6.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.4-3.4-1.4-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.1 10.1 0 0 0 22 12.2C22 6.6 17.5 2 12 2Z" />
              </svg>
            </a>
            <a
              href="#support"
              onClick={handleDownloadClick}
              className="hidden rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[13.5px] font-medium backdrop-blur-md transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/20 hover:bg-white/[0.09] sm:inline-flex"
            >
              Download Tuxy
            </a>
            <button className="text-xl md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        id="top"
        className="relative z-[1] mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-14 px-5 sm:px-8 pb-28 pt-24 md:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <div className="mb-5 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[13px] text-ice opacity-0" style={{ animationDelay: "0.05s" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-ice shadow-[0_0_8px_#7FBADA]" />
            tuxy-os v1.0
          </div>
          <h1
            className="animate-[shimmer-text_7s_cubic-bezier(0.37,0,0.63,1)_infinite,fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.12s_forwards] bg-[linear-gradient(100deg,#EDEFF1_30%,#E3A857_45%,#7FBADA_55%,#EDEFF1_70%)] bg-[length:260%_100%] bg-clip-text font-display text-[52px] leading-[1.05] tracking-tight text-transparent opacity-0 md:text-[84px]"
          >
            TUXY OS
          </h1>
          <div className="mt-4 animate-fade-up font-display text-[19px] font-medium text-accent opacity-0 md:text-[24px]" style={{ animationDelay: "0.25s" }}>
            Linux, but your way.
          </div>
          <p className="mt-5 max-w-[46ch] animate-fade-up text-[17px] text-fg-muted opacity-0" style={{ animationDelay: "0.38s" }}>
            An operating system built for people who want Linux their way. No presets forced on you, no
            bloat you didn't ask for. Just a system you shape from the ground up.
          </p>
          <div className="mt-9 flex animate-fade-up flex-col gap-3.5 opacity-0 sm:flex-row sm:flex-wrap" style={{ animationDelay: "0.5s" }}>
            <ShineButton href="#support" onClick={handleDownloadClick} className="w-full sm:w-auto">Download Tuxy</ShineButton>
            <ShineButton href="#why" variant="secondary" className="w-full sm:w-auto">Explore Tuxy</ShineButton>
          </div>
        </div>
        <div
          className="relative animate-[float-y_6s_cubic-bezier(0.45,0.05,0.55,0.95)_infinite,fade-up_0.9s_cubic-bezier(0.16,1,0.3,1)_0.3s_forwards] opacity-0"
        >
          <div
            className="absolute -inset-14 -z-10 animate-pulse-glow"
            style={{ background: "radial-gradient(circle, rgba(227,168,87,.22), transparent 65%)" }}
          />
          <Glass ring="neutral" ringOpacity={50} tiltMax={14} rounded="rounded-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
              <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-2.5 font-mono text-[12.5px] text-fg-faint">tuxy@tuxy-os: ~</span>
            </div>
            <pre className="min-h-[240px] whitespace-pre-wrap px-6 pb-8 pt-6 font-mono text-[13.5px] leading-[1.75] text-fg-muted sm:min-h-[320px]">
              {terminal}
              <span className="inline-block h-[14px] w-[7px] translate-y-[3px] animate-blink-cursor bg-accent" />
            </pre>
          </Glass>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative z-[1] overflow-hidden border-y border-white/10 bg-white/[0.04] py-4 backdrop-blur-2xl backdrop-saturate-150">
        <div className="flex w-max animate-marquee [animation-play-state:running] hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-7 whitespace-nowrap px-7 font-mono text-[13px] text-fg-faint">
              {MARQUEE_ITEMS.map((item) => (
                <span key={item} className="flex items-center gap-7">
                  {item}
                  <b className="text-accent-dim">/</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Why Tuxy */}
      <section id="why" className="relative z-[1] mx-auto max-w-[1180px] px-5 sm:px-8 py-24">
        <div className="reveal mb-14 max-w-[620px]">
          <Label>why-tuxy</Label>
          <h2 className="font-display text-[28px] md:text-[38px]">Why Tuxy?</h2>
          <p className="mt-3.5 max-w-[54ch] text-[15.5px] text-fg-muted">
            Every default in Tuxy is a starting point, not a limit. Here's what that means in practice.
          </p>
        </div>
        <div className="reveal grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, description, icon], index) => (
            <Glass
              key={title}
              rounded="rounded-[14px]"
              tiltMax={16}
              className="group p-8 hover:border-accent-dim hover:bg-white/[0.07] hover:shadow-[0_24px_50px_-20px_rgba(227,168,87,0.35)]"
            >
              <span className="mb-5 inline-block animate-icon-bob" style={{ animationDelay: `${index * 0.5}s` }}>
                <Icon
                  name={icon}
                  className="h-[34px] w-[34px] text-accent transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] group-hover:animate-icon-pop"
                />
              </span>
              <h3 className="mb-2 text-[17px] font-semibold">{title}</h3>
              <p className="text-[14.5px] text-fg-muted">{description}</p>
            </Glass>
          ))}
        </div>
      </section>

      {/* Editions */}
      <section id="editions" className="relative z-[1] mx-auto max-w-[1180px] px-5 sm:px-8 py-24">
        <div className="reveal mb-14 max-w-[620px]">
          <Label>editions</Label>
          <h2 className="font-display text-[28px] md:text-[38px]">Tuxy Editions</h2>
          <p className="mt-3.5 text-[15.5px] text-fg-muted">Start free. Upgrade whenever Tuxy earns it.</p>
        </div>
        <div
          className={`reveal mx-auto grid grid-cols-1 gap-5 ${
            editions.length === 1
              ? "max-w-[420px]"
              : editions.length === 2
              ? "max-w-[820px] sm:grid-cols-2"
              : "lg:grid-cols-3"
          }`}
        >
          {editions.map((edition) => (
            <Glass
              key={edition.name}
              tiltMax={16}
              clip={false}
              ring={edition.featured ? "accent" : "neutral"}
              ringOpacity={edition.featured ? 70 : 50}
              className={`flex flex-col p-8 hover:border-accent-dim hover:shadow-[0_26px_60px_-24px_rgba(227,168,87,0.3)] ${
                edition.featured ? "border-accent/30 bg-gradient-to-b from-accent/10 to-accent/[0.02]" : "hover:bg-white/[0.055]"
              }`}
            >
              {edition.featured && (
                <span className="absolute -top-3 left-7 animate-badge-pulse rounded-full bg-gradient-to-br from-accent-light to-accent px-2.5 py-1 text-[11px] font-semibold text-ink shadow-[0_6px_18px_-6px_rgba(227,168,87,0.6)]">
                  MOST POPULAR
                </span>
              )}
              <div className="mb-3.5 font-mono text-[13px] text-fg-muted">{edition.name}</div>
              <div className="font-display text-[38px] font-semibold">
                {edition.price}{" "}
                <span className="font-body text-[15px] font-normal text-fg-muted">{edition.suffix}</span>
              </div>
              <p className="mb-2 min-h-[42px] text-[14.5px] text-fg-muted">{edition.description}</p>
              {edition.trial && <div className="mb-4 font-mono text-[12.5px] text-ice">{edition.trial}</div>}
              <ul className={`mb-7 flex-1 space-y-2.5 text-[14px] text-fg-muted ${edition.trial ? "" : "mt-3"}`}>
                {edition.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-[15px] w-[15px] shrink-0 text-ice" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <ShineButton
                href={edition.featured ? "#pro-activation" : "#support"}
                onClick={edition.featured ? undefined : handleDownloadClick}
                variant={edition.featured ? "primary" : "secondary"}
                className="w-full"
              >
                {edition.featured ? "Try Pro" : "Download"}
              </ShineButton>
            </Glass>
          ))}
        </div>
      </section>

      {/* Terminal showcase */}
      <section id="showcase" className="relative z-[1] mx-auto max-w-[1180px] px-5 sm:px-8 py-24">
        <div className="reveal mb-14 max-w-[620px]">
          <Label>terminal</Label>
          <h2 className="font-display text-[28px] md:text-[38px]">This is Tuxy</h2>
          <p className="mt-3.5 text-[15.5px] text-fg-muted">A quick look at what greets you on a fresh install.</p>
        </div>
        <Glass rounded="rounded-2xl" tiltMax={8} ringOpacity={35} className="reveal mx-auto max-w-[760px]">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <span className="ml-2.5 font-mono text-[12.5px] text-fg-faint">tuxy@tuxy-os: ~</span>
          </div>
          <pre className="overflow-x-auto px-6 pb-8 pt-6 font-mono text-[12.5px] leading-[1.75] text-fg-muted sm:text-[13.5px]">
            <span className="text-ice">tuxy@tuxy-os</span>:~$ <strong className="text-fg">neofetch</strong>
            {"\n\n"}
            <b className="text-accent">
              {"       ████████\n     ███      ███\n    ██   TUXY   ██"}
            </b>
            {"\n\n"}
            <b className="text-accent">OS:</b> Tuxy OS{"\n"}
            <b className="text-accent">Kernel:</b> Linux{"\n"}
            <b className="text-accent">Desktop:</b> KDE Plasma{"\n"}
            <b className="text-accent">Init:</b> Systemd{"\n"}
            <b className="text-accent">Shell:</b> bash{"\n\n"}
            <span className="text-ice">tuxy@tuxy-os</span>:~${" "}
            <span className="inline-block h-[14px] w-[7px] translate-y-[3px] animate-blink-cursor bg-accent" />
          </pre>
        </Glass>
      </section>

      {/* Download */}
      <section id="download" className="relative z-[1] mx-auto max-w-[1180px] px-5 sm:px-8 py-24">
        <Glass
          rounded="rounded-2xl"
          tiltMax={5}
          ringOpacity={35}
          className="reveal grid grid-cols-1 items-center gap-12 bg-gradient-to-br from-ice/[0.08] to-accent/[0.04] p-10 md:grid-cols-[1.2fr_1fr] md:p-14"
        >
          <div>
            <Label>get-tuxy</Label>
            <h2 className="font-display text-[26px] md:text-[34px]">Get Tuxy OS</h2>
            <p className="mt-3 text-[15.5px] text-fg-muted">Ready to build your own Linux experience?</p>
            <div className="mt-7 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <ShineButton href="#support" onClick={handleDownloadClick} className="w-full sm:w-auto">Download ISO</ShineButton>
            </div>
          </div>
          <div className="border-t border-white/15 pt-7 font-mono text-[13px] text-fg-muted md:border-l md:border-t-0 md:pl-7 md:pt-0">
            <div className="mb-3.5 text-fg">MINIMUM REQUIREMENTS</div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-3.5 gap-y-2">
              <dt className="text-fg-faint">CPU</dt><dd>x86_64, 2 cores</dd>
              <dt className="text-fg-faint">RAM</dt><dd>4 GB</dd>
              <dt className="text-fg-faint">Storage</dt><dd>20 GB free</dd>
              <dt className="text-fg-faint">Boot</dt><dd>UEFI recommended</dd>
              <dt className="text-fg-faint">Graphics</dt><dd>Wayland-compatible GPU</dd>
            </dl>
          </div>
        </Glass>
      </section>

      {/* Support / Tip Tuxy */}
      <section id="support" className="relative z-[1] mx-auto max-w-[1180px] rounded-2xl px-5 sm:px-8 py-24 text-center">
        <div
          className={`mx-auto flex max-w-[560px] items-center gap-3 overflow-hidden rounded-[14px] border text-left text-[13.5px] text-fg-muted backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            bannerVisible
              ? "mb-8 max-h-[120px] border-accent/30 bg-accent/[0.09] px-5 py-3.5 opacity-100"
              : "mb-0 max-h-0 border-transparent bg-transparent px-5 py-0 opacity-0"
          }`}
        >
          <svg className="h-5 w-5 shrink-0 animate-bounce-down text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" />
          </svg>
          <span>Your download is on its way. While you wait — Tuxy is free to use, but not free to build.</span>
        </div>
        {downloaded && (
          <div
            key={pulseKey}
            className="pointer-events-none absolute inset-0 -z-10 animate-section-pulse rounded-2xl"
          />
        )}

        <div className="reveal mx-auto mb-10 max-w-[620px]">
          <Label>support-tuxy</Label>
          <h2 className="font-display text-[28px] md:text-[38px]">Support Tuxy</h2>
          <p className="mt-3.5 text-[15.5px] text-fg-muted">Love Tuxy OS? Help keep the project alive.</p>
        </div>

        <div className="reveal">
          <div className="mb-6 flex flex-wrap justify-center gap-2.5">
            {["1", "5", "20", "50", "custom"].map((amount) => (
              <button
                key={amount}
                onClick={() => setTip(amount)}
                className={`rounded-full border px-6 py-3 font-mono text-[14px] backdrop-blur-md transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  tip === amount
                    ? "border-accent bg-accent/[0.12] text-accent shadow-[0_8px_20px_-10px_rgba(227,168,87,0.5)]"
                    : "border-white/10 bg-white/[0.04] hover:border-ice hover:text-fg"
                }`}
              >
                {amount === "custom" ? "Custom" : `$${amount}`}
              </button>
            ))}
          </div>
          {tip === "custom" && (
            <label className="mb-5 inline-flex items-center gap-2.5 font-mono text-fg-muted">
              $
              <input
                className="w-[130px] rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-fg backdrop-blur-md focus:border-ice focus:outline-none"
                type="number"
                min="1"
                max="1000"
                value={customTip}
                onChange={(event) => updateCustomTip(event.target.value)}
                placeholder="1–1000"
              />
            </label>
          )}
          <div>
            <ShineButton>{`Tip Tuxy${chosenTip ? ` — $${chosenTip}` : ""}`}</ShineButton>
          </div>
          <p className="mt-5 text-[13px] text-fg-faint">
            Tips support development directly.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-[1] border-t border-white/10 bg-white/[0.015] px-5 sm:px-8 pb-10 pt-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-start justify-between gap-10 pb-10">
            <div>
              <a href="#top" className="flex items-center gap-2.5 font-display text-[17px] font-semibold">
                <Logo /> TUXY OS
              </a>
              <p className="mt-2.5 font-mono text-[13px] text-fg-faint">Made with Linux</p>
            </div>
            <div className="flex flex-wrap gap-16">
              {[
                ["PROJECT", ["Download", "Showcase", "Support"]],
                ["COMMUNITY", ["GitHub", "Discord"]],
                ["LEGAL", ["Privacy", "Terms"]],
              ].map(([title, links]) => (
                <div key={title as string} className="flex flex-col gap-2.5">
                  <b className="font-mono text-[13px] text-fg-faint">{title}</b>
                  {(links as string[]).map((link) => (
                    <a
                      key={link}
                      href={link === "Download" ? "#download" : link === "Showcase" ? "#showcase" : link === "Support" ? "#support" : "#"}
                      className="text-[14px] text-fg-muted hover:text-fg"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-between gap-2.5 border-t border-white/5 pt-6 font-mono text-[13px] text-fg-faint">
            <span>© 2026 Tuxy OS.</span>
            <span>tuxy-os / build 0.0.0</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

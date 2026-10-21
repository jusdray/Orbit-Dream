import { useState, useRef, useEffect, useLayoutEffect, lazy, Suspense, type ReactNode } from "react";
/* Design: Orbital Editorial — quiet hero copy plane, lowered horizon, contained Signal Cyan interaction cues. */
import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Code2, ShieldCheck, BarChart3, Server, Wrench, FlaskConical } from "lucide-react";

const HeroGlobe = lazy(() => import("./HeroGlobe"));
const LowerSections = lazy(() => import("./LowerSections"));

const HERO_HORIZON = "/assets/18-358.webp";
const bgVideo = HERO_HORIZON;
const aboutVideo = "/assets/about-video.mp4";
const imgWWDIcon1 = "/assets/wwd-icon-1.png";
const imgWWDIcon2 = "/assets/wwd-icon-2.png";
const imgWWDIcon3 = "/assets/wwd-icon-3.png";
const imgNigeriaArmy = "/assets/logo-nigeria-army.png";
const imgEmbassy = "/assets/logo-embassy.png";
const imgJuvee = "/assets/logo-juvee.png";
const imgLaswa = "/assets/logo-laswa.png";
const imgEvans = "/assets/logo-evans.png";
const imgPacific = "/assets/logo-pacific.png";
const imgLasgboost = "/assets/logo-lasgboost.png";
const imgSoftSeer = "/assets/softseer-logo.png";
const imgSoftSeerWatermark = imgSoftSeer;
const figmaTopology = "/assets/18-358.webp";
const figmaSoftwarePreview = "/assets/18-412.webp";

// ── Constants ────────────────────────────────────────────────────
const NOHEMI = "'Nohemi', 'Plus Jakarta Sans', sans-serif";

// Space/earth background (city lights aerial — Jan Huber / Unsplash)

const EASE_SPRING: [number, number, number, number] = [0.5, 0, 0.5, 1];
const EASE_EASE_OUT: [number, number, number, number] = [0, 0, 0.58, 1];

/* ─────────────────── SoftSeer Navbar ───────────────────────────── */
// Faithfully matches Frame / Frame1 / Frame2 from Desktop7 import

const SS_NAV = [
  { label: "About Us", href: "#section-about-us" },
  { label: "Our Services", href: "#section-our-services" },
  { label: "Product", href: "#section-products" },
  { label: "Our Team", href: "#section-team" },
];

function navigateToSection(href: string) {
  const id = href.slice(1);
  let destination: number;

  if (id === "section-about-us") {
    const home = document.getElementById("section-home");
    if (!home) return;
    const homeTop = home.getBoundingClientRect().top + window.scrollY;
    const scrollRange = Math.max(0, home.offsetHeight - window.innerHeight);
    destination = homeTop + scrollRange * 0.22;
  } else {
    const section = document.getElementById(id);
    if (!section) return;
    destination = section.getBoundingClientRect().top + window.scrollY;
  }

  window.history.replaceState(null, "", href);
  window.dispatchEvent(new CustomEvent("site:section-navigation"));
  window.scrollTo({
    top: destination,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

function SoftSeerNavbar() {
  const [navVisible, setNavVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const heroThreshold = window.innerHeight * 0.6;

      if (y <= heroThreshold) {
        setNavVisible(true);
      } else if (y > lastY.current + 3) {
        // scrolling down — hide
        setNavVisible(false);
      } else if (y < lastY.current - 3) {
        // scrolling up — show
        setNavVisible(true);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-[28px] left-1/2 -translate-x-1/2 z-[200] w-full max-w-[1100px] px-4"
      animate={{ y: navVisible ? 0 : -110, opacity: navVisible ? 1 : 0 }}
      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
    >
      <div
        className="relative flex h-[62px] items-center justify-between rounded-[48px] px-6 py-3"
        style={{
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          background: "rgba(0,0,0,0.24)",
        }}
      >
        {/* Glass border */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[48px]"
          style={{ border: "1px solid rgba(255,255,255,0.24)" }}
        />

        {/* Supplied brand artwork establishes the first-screen identity. */}
        <a href="#section-home" onClick={(event) => { event.preventDefault(); navigateToSection("#section-home"); }} aria-label="SoftSeer home" className="relative h-[50px] w-[149px] shrink-0">
          <img src={imgSoftSeer} alt="SoftSeer" className="h-full w-full object-contain object-left" />
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-0">
          {SS_NAV.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => {
                event.preventDefault();
                navigateToSection(link.href);
              }}
              className="px-4 py-2 text-[14px] leading-[24px] text-white hover:text-white/70 transition-colors whitespace-nowrap"
              style={{ fontFamily: NOHEMI, scrollMarginTop: 96 }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button
          type="button"
          onClick={() => navigateToSection("#section-reach-out")}
          className="shrink-0 rounded-[24px] px-5 py-2 text-[13px] leading-none text-black whitespace-nowrap font-medium transition-all duration-300 ease-out hover:scale-105"
          style={{
            fontFamily: NOHEMI,
            background: "linear-gradient(to right, #04d9ff, #028299)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 22px rgba(4,217,255,0.6), 0 0 44px rgba(4,217,255,0.25), 0 4px 14px rgba(0,0,0,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
          }}
        >
          Contact Us
        </button>
      </div>
    </motion.div>
  );
}

/* ────────────────── Headline (node 3:177) ──────────────────────── */
// Fades + slides in: delay 1.954s, duration 1.866s, ease [0.5,0,0.5,1]
// Original: initial y=-432 (enters from above). Scaled to -60 for web.

function HeroHeadline() {
  return (
    <motion.div
      className="text-center w-full max-w-[1120px]"
      initial={{ opacity: 0, x: -6, y: -60 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        opacity: { delay: 1.954, duration: 1.866, ease: EASE_SPRING },
        x:       { delay: 1.954, duration: 1.866, ease: "linear" },
        y:       { delay: 1.954, duration: 1.866, ease: "linear" },
      }}
    >
      {/* Line 1 */}
      <p
        className="leading-[0.98] text-center tracking-[-0.045em]"
        style={{ fontFamily: NOHEMI, fontWeight: 700, fontSize: "clamp(52px, 6.25vw, 88px)", color: "rgba(255,255,255,0.94)" }}
      >
        Looking Into the Future
      </p>
      {/* Line 2 — "Together" gradient */}
      <p
        className="leading-[0.98] text-center mt-0 tracking-[-0.05em]"
        style={{
          fontFamily: NOHEMI,
          fontWeight: 700,
          fontSize: "clamp(58px, 7vw, 98px)",
          backgroundImage: "linear-gradient(100deg, #ffb26b 0%, #f36a2f 52%, #d94b21 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        Together
      </p>
    </motion.div>
  );
}

/* ──────────── Subheading — 2 fixed lines ───────────────────────── */

function AnimatedSubheading() {
  return (
    <div className="mt-[24px] text-center" style={{ fontFamily: NOHEMI, color: "rgba(255,255,255,0.6)" }}>
      <motion.p
        className="text-[19px] leading-[29px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.0, duration: 0.6, ease: EASE_EASE_OUT }}
      >
        {"Let's shape the future together with smarter, faster, and more"}
      </motion.p>
      <motion.p
        className="text-[19px] leading-[29px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.4, duration: 0.6, ease: EASE_EASE_OUT }}
      >
        Connected technology
      </motion.p>
    </div>
  );
}

/* ─────────────── Get Started CTA ──────────────────────────────── */

function GetStartedButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="mt-9 flex justify-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4.3, duration: 0.5, ease: EASE_EASE_OUT }}
    >
      <button
        type="button"
        aria-label="Scroll to Reach Out To Us"
        onClick={() => document.getElementById("section-reach-out")?.scrollIntoView({ behavior: "smooth", block: "start" })}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`get-started-cta ${hovered ? "is-hovered" : ""} rounded-[28px] px-6 py-2.5 text-[14px] text-black font-semibold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#04d9ff] active:scale-[0.97]`}
        style={{
          fontFamily: NOHEMI,
          background: "linear-gradient(135deg, #04d9ff 0%, #028299 100%)",
          boxShadow: hovered
            ? "0 0 0 1px rgba(185,253,255,0.72), 0 0 26px rgba(4,217,255,0.94), 0 0 62px rgba(4,217,255,0.62), 0 0 112px rgba(4,217,255,0.30), 0 8px 22px rgba(0,0,0,0.44)"
            : "0 2px 8px rgba(0,0,0,0.3)",
          transform: hovered ? "scale(1.04)" : "scale(1)",
          filter: hovered ? "brightness(1.12) saturate(1.16)" : "none",
          transition: "box-shadow 0.3s ease, transform 0.2s ease",
        }}
      >
        Get Started
      </button>
    </motion.div>
  );
}

/* ──────────────────────── Logo Strip ───────────────────────────── */
// Entrance animation: node 3:173 from motion context.
// Times derived from µs positions: 3576747µs = 3.577s, 3820000µs = 3.82s
// Normalised times within 3.82s duration: [0, 0.937, 1]
// After entrance: marquee scrolls the logos at constant speed.

// One logo-set width: 6×155 + 78 + 6×43 = 1266px; +43 gap = 1309px stride
const MARQUEE_STRIDE = 1309;

type LogoEntry = { src: string; w: number; h: number; crop?: boolean; opacity?: number };

const LOGOS: LogoEntry[] = [
  // Nigerian Army — special crop to match Component's overflow treatment
  { src: imgNigeriaArmy, w: 155, h: 73, crop: true },
  { src: imgEmbassy,     w: 155, h: 65 },
  { src: imgJuvee,       w: 155, h: 42 },
  { src: imgLaswa,       w: 155, h: 65 },
  { src: imgEvans,       w: 155, h: 42 },
  { src: imgPacific,     w: 155, h: 26, opacity: 0.7 },
  { src: imgLasgboost,   w: 78,  h: 73 },
];

function LogoItem({ logo }: { logo: LogoEntry }) {
  if (logo.crop) {
    return (
      <div
        className="relative shrink-0 overflow-hidden"
        style={{ width: logo.w, height: logo.h }}
      >
        <img
          alt=""
          src={logo.src}
          className="absolute max-w-none pointer-events-none"
          style={{ height: "433.73%", left: "-20.97%", top: "-120.96%", width: "135.29%" }}
        />
      </div>
    );
  }
  return (
    <div
      className="relative shrink-0"
      style={{ width: logo.w, height: logo.h }}
    >
      <img
        alt=""
        src={logo.src}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        style={{ opacity: logo.opacity ?? 1 }}
      />
    </div>
  );
}

function LogoStrip({ skipEntrance = false }: { skipEntrance?: boolean }) {
  const marquee = (
    <motion.div
      className="flex items-center gap-[43px] shrink-0"
      style={{ width: MARQUEE_STRIDE * 2 + "px" }}
      animate={{ x: [0, -MARQUEE_STRIDE] }}
      transition={{ duration: 28, ease: "linear", repeat: Infinity }}
    >
      {[...LOGOS, ...LOGOS].map((logo, i) => (
        <LogoItem key={i} logo={logo} />
      ))}
    </motion.div>
  );

  if (skipEntrance) {
    return (
      <div className="w-full overflow-hidden pb-8 pt-3">
        {marquee}
      </div>
    );
  }

  return (
    <motion.div
      className="w-full overflow-hidden pb-10 pt-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4.2, duration: 0.7, ease: EASE_EASE_OUT }}
    >
      {marquee}
    </motion.div>
  );
}

/* ──────────────────── About text lines ────────────────────────── */

const ABOUT_LINES: { text: ReactNode }[] = [
  {
    text: (
      <>
        <span style={{ color: "rgba(255,255,255,1)", fontWeight: 700 }}>At Softseer,{" "}</span>
        <span style={{ color: "rgba(255,255,255,0.5)" }}>we help businesses harness</span>
      </>
    ),
  },
  { text: <span style={{ color: "rgba(255,255,255,0.5)" }}>the power of technology through</span> },
  { text: <span style={{ color: "rgba(255,255,255,0.5)" }}>innovative, intelligent, and scalable digital</span> },
  { text: <span style={{ color: "rgba(255,255,255,0.5)" }}>solutions. From automation and software</span> },
  { text: <span style={{ color: "rgba(255,255,255,0.5)" }}>development to digital transformation, we</span> },
  { text: <span style={{ color: "rgba(255,255,255,0.5)" }}>create tailored solutions that drive</span> },
  { text: <span style={{ color: "rgba(255,255,255,0.5)" }}>efficiency, growth, and long-term success.</span> },
];

const textContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const textLineVariants = {
  hidden: { opacity: 0, x: -60, transition: { duration: 0.15 } },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0, 0, 0.58, 1] as [number,number,number,number] } },
};

function AboutTextBlock({ visible }: { visible: boolean }) {
  return (
    <div className="flex items-center justify-center h-full w-full px-8 md:px-16 lg:px-20">
      <motion.div
        className="w-full"
        style={{ maxWidth: 1100 }}
        variants={textContainerVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
      >
        {ABOUT_LINES.map(({ text }, i) => (
          <motion.p
            key={i}
            variants={textLineVariants}
            style={{
              fontFamily: NOHEMI,
              fontSize: "clamp(28px, 3.9vw, 56px)",
              lineHeight: "1.15",
            }}
          >
            {text}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

/* ────────────────── What We Do Section ────────────────────────── */

const WWD_CARDS = [
  {
    icon: imgWWDIcon1,
    title: "We Develop Bespoke System Solutions",
    body: "We are a top notch tech solution provider to any kinds of businesses. We simply understand the problem and develop a tailored solution for you.",
    align: "left" as const,
  },
  {
    icon: imgWWDIcon2,
    title: "We Innovate For Progress",
    body: "We are at the forefront of digital transformation, capable of integrating and automating business processes.",
    align: "right" as const,
  },
  {
    icon: imgWWDIcon3,
    title: "We Offer Professional I.T Consultancy",
    body: "With wealth of know how in the industry, we bring on a platter, an unmatched and priceless consultation to help our clients reach their goals.",
    align: "left" as const,
  },
];

function WWDCard({
  card,
  iconRotate,
}: {
  card: (typeof WWD_CARDS)[number];
  iconRotate: MotionValue<number>;
}) {
  return (
    <div
      className="relative rounded-[24px] flex gap-[20px] items-center"
      style={{
        padding: "28px 32px",
        width: "min(560px, 90vw)",
        background: "linear-gradient(135deg, rgba(4,217,255,0.08) 0%, rgba(255,255,255,0.03) 55%, rgba(4,217,255,0.06) 100%)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12), 0 0 0 1px rgba(4,217,255,0.08)",
      }}
    >
      <motion.div
        className="shrink-0 rounded-[16px] overflow-hidden"
        style={{ width: 84, height: 77, rotate: iconRotate }}
      >
        <img src={card.icon} alt="" className="w-full h-full object-cover" />
      </motion.div>

      <div className="flex flex-col gap-[10px] flex-1">
        <p className="leading-[28px] text-[24px] font-semibold text-white" style={{ fontFamily: NOHEMI }}>
          {card.title}
        </p>
        <p className="leading-[26px] text-[17px]" style={{ fontFamily: NOHEMI, color: "rgba(255,255,255,0.65)" }}>
          {card.body}
        </p>
      </div>
    </div>
  );
}

function WhatWeDoLayer({
  opacity,
  y,
  scrollYProgress,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}) {
  const sp = scrollYProgress;

  // All three cards share the exact same rhythm: enter (0.10) → hold (0.08) → exit (0.06)
  // Card 1 (left)
  const c1Op = useTransform(sp, [0.42, 0.52, 0.60, 0.66], [0, 1, 1, 0]);
  const c1Y  = useTransform(sp, [0.42, 0.52, 0.60, 0.66], [44, 0, 0, -30]);
  const i1R  = useTransform(sp, [0.42, 0.54], [-360, 0]);

  // Card 2 (right)
  const c2Op = useTransform(sp, [0.60, 0.70, 0.78, 0.84], [0, 1, 1, 0]);
  const c2Y  = useTransform(sp, [0.60, 0.70, 0.78, 0.84], [44, 0, 0, -30]);
  const i2R  = useTransform(sp, [0.60, 0.72], [-360, 0]);

  // Card 3 (left) — longer fully visible read time, followed by a clear final fade.
  const c3Op = useTransform(sp, [0.74, 0.84, 0.965, 1], [0, 1, 1, 0]);
  const c3Y  = useTransform(sp, [0.74, 0.84, 0.965, 1], [44, 0, 0, -30]);
  const i3R  = useTransform(sp, [0.78, 0.90], [-360, 0]);


  return (
    <motion.div
      className="absolute inset-0 z-[5] overflow-hidden"
      style={{
        opacity,
        y,
        background: "radial-gradient(ellipse 130% 90% at 55% 45%, #012428 0%, #010e12 55%, #000d10 100%)",
      }}
    >
      {/* SoftSeer logo — large background watermark, color-dodge blend */}
      <img
        src={imgSoftSeerWatermark}
        alt=""
        className="pointer-events-none absolute"
        style={{
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(900px, 95vw)",
          height: "auto",
          objectFit: "contain",
          mixBlendMode: "color-dodge",
          opacity: 0.06,
        }}
      />

      {/* Diagonal cyan beam */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: "42%", top: "50%",
          transform: "translate(-50%, -50%) rotate(52.4deg)",
          width: 85, height: 1561,
          background: "#04d9ff",
          filter: "blur(300px)",
          opacity: 0.22,
        }}
      />

      {/* What We Do label */}
      <div
        className="absolute z-10 pointer-events-none"
        style={{ top: "108px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}
      >
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.18em]"
          style={{ fontFamily: NOHEMI, color: "#04d9ff" }}
        >
          What We Do
        </p>
      </div>

      {/* Card 1 — left-centered */}
      <motion.div
        className="absolute inset-0 flex items-center z-10"
        style={{ opacity: c1Op, y: c1Y, paddingTop: "90px", paddingLeft: "8vw" }}
      >
        <WWDCard card={WWD_CARDS[0]!} iconRotate={i1R} />
      </motion.div>

      {/* Card 2 — right-centered */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end z-10"
        style={{ opacity: c2Op, y: c2Y, paddingTop: "90px", paddingRight: "8vw" }}
      >
        <WWDCard card={WWD_CARDS[1]!} iconRotate={i2R} />
      </motion.div>

      {/* Card 3 — left-centered */}
      <motion.div
        className="absolute inset-0 flex items-center z-10"
        style={{ opacity: c3Op, y: c3Y, paddingTop: "90px", paddingLeft: "8vw" }}
      >
        <WWDCard card={WWD_CARDS[2]!} iconRotate={i3R} />
      </motion.div>
    </motion.div>
  );
}


/* ──────────────────── Our Services Section ─────────────────────── */
// 6 services × 120vh = 720vh sticky-scroll container.
// Left column: static heading + progress bar + animated service list.
// Right column: service title + description + video area — all crossfade
//               as the user scrolls, driven entirely by scrollYProgress.

const servicesContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const serviceLineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0, 0, 0.58, 1] as [number, number, number, number] },
  },
};

const OUR_SERVICES = [
  {
    name: "Software Development",
    desc: "We create software programs, which can include anything from operating systems and business applications to mobile apps and video games. This involves coding, testing, and debugging",
    Icon: Code2,
    glow: "#04d9ff",
    video: "/assets/service-software.mp4",
  },
  {
    name: "Cyber Security",
    desc: "We offer expertise to protect systems, networks, and data from digital attacks, theft, and damage. We deploy a range of technologies to safeguard and ensure the integrity and confidentiality of data",
    Icon: ShieldCheck,
    glow: "#ef4444",
    video: "/assets/service-cyber.mp4",
  },
  {
    name: "Data Analytics",
    desc: "We help companies examine large datasets to uncover patterns, correlations, insights, and trends that can inform business decisions and strategies while extracting meaningful information from raw data.",
    Icon: BarChart3,
    glow: "#10b981",
    video: "/assets/service-data.mp4",
  },
  {
    name: "IT Infrastructural Setup",
    desc: "We help companies setup IT infrastructure, which involves creating foundational systems and services required for a business or organization to operate efficiently and securely.",
    Icon: Server,
    glow: "#8b5cf6",
    video: "/assets/service-infra.mp4",
  },
  {
    name: "Maintenance and Support",
    desc: "We provide ongoing technical support and maintenance services to ensure your systems remain operational, secure, and performing at their best.",
    Icon: Wrench,
    glow: "#f59e0b",
    video: "/assets/service-maintenance.mp4",
  },
  {
    name: "Research and Development",
    desc: "We invest in R&D to explore new technologies, develop innovative solutions, and stay competitive in the trendy market.",
    Icon: FlaskConical,
    glow: "#ec4899",
    video: "/assets/service-research.mp4",
  },
];

type ServiceSolution = {
  name: string;
  subtitle: string;
  description: string;
  productPreview: boolean;
  previewUrl?: string;
  embedPreview?: boolean;
  overviewText?: string;
};

const SERVICE_SOLUTIONS: ServiceSolution[][] = [
  [
    { name: "LERMS", subtitle: "Emergency response intelligence", description: "An AI-driven response platform that detects incidents, assesses severity, and coordinates emergency action in real time.", productPreview: true },
    { name: "KohBot", subtitle: "Your intelligent digital companion and guide to Lagos State.", description: "Your intelligent digital companion and guide to Lagos State.", productPreview: false, previewUrl: "https://kohbot.ai/" },
    { name: "CamperVerse", subtitle: "corps member’s trusted digital companion", description: "corps member’s trusted digital companion", productPreview: false, previewUrl: "https://camperverse.ng/", embedPreview: false, overviewText: "CamperVerse, also presented as Corpsmate, helps corps members find their NYSC orientation camp and serves as a trusted digital companion. Visit camperverse.ng to explore." },
  ],
  [
    { name: "DUTYCOM", subtitle: "Secure duty operations", description: "A resilient coordination layer for duty rosters, communications, notifications, and operational accountability.", productPreview: false },
    { name: "LERMS", subtitle: "Protected incident response", description: "A response environment designed around trusted data flows, protected operations, and timely information access.", productPreview: true },
  ],
  [
    { name: "EQIS", subtitle: "Environmental intelligence", description: "A quality intelligence system that monitors environmental information, identifies patterns, and supports compliant decisions.", productPreview: false },
    { name: "Accugauge", subtitle: "Precision data monitoring", description: "A measurement and monitoring solution that turns live industrial signals into confident operational insights.", productPreview: false },
  ],
  [
    { name: "LERMS", subtitle: "Connected emergency infrastructure", description: "A coordinated technology foundation that connects data sources, responders, and operational services when time matters.", productPreview: true },
    { name: "DUTYCOM", subtitle: "Reliable workforce infrastructure", description: "A dependable communications foundation for scheduling, workforce coordination, and real-time operational updates.", productPreview: false },
  ],
  [
    { name: "Accugauge", subtitle: "Always-on measurement care", description: "A monitoring solution built for accurate, continuous information with the service support needed to keep it dependable.", productPreview: false },
    { name: "Sales Rep Manager", subtitle: "Optimised field operations", description: "A service platform that keeps distributed sales operations visible, maintained, and ready for sustained performance.", productPreview: false },
  ],
  [
    { name: "EQIS", subtitle: "Applied environmental research", description: "A research-led system that transforms environmental signals into emerging trends, reports, and actionable knowledge.", productPreview: false },
    { name: "Home2Class", subtitle: "Learning innovation lab", description: "A digital learning environment informed by research into better collaboration, access, and adaptive education.", productPreview: false },
  ],
];


function OurServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const N   = OUR_SERVICES.length;  // 6
  const seg = 1 / N;               // ≈0.1667 per service
  const fw  = 0.02;
  const programmaticScrollRef = useRef(false);
  const scrollIdleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const progressBarH = useTransform(scrollYProgress, [0, 1], [0, 216]);

  const op0 = useTransform(scrollYProgress, [0,          seg-fw,     seg        ], [1, 1, 0]);
  const op1 = useTransform(scrollYProgress, [seg-fw,     seg,        2*seg-fw,   2*seg], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [2*seg-fw,   2*seg,      3*seg-fw,   3*seg], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [3*seg-fw,   3*seg,      4*seg-fw,   4*seg], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [4*seg-fw,   4*seg,      5*seg-fw,   5*seg], [0, 1, 1, 0]);
  const op5 = useTransform(scrollYProgress, [5*seg-fw,   5*seg,      1,          1    ], [0, 1, 1, 1]);
  const svcOps = [op0, op1, op2, op3, op4, op5];

  const y0 = useTransform(scrollYProgress, [0,        seg-fw,   seg      ], [0,  0, -20]);
  const y1 = useTransform(scrollYProgress, [seg-fw,   seg,      2*seg-fw, 2*seg], [20, 0,  0, -20]);
  const y2 = useTransform(scrollYProgress, [2*seg-fw, 2*seg,    3*seg-fw, 3*seg], [20, 0,  0, -20]);
  const y3 = useTransform(scrollYProgress, [3*seg-fw, 3*seg,    4*seg-fw, 4*seg], [20, 0,  0, -20]);
  const y4 = useTransform(scrollYProgress, [4*seg-fw, 4*seg,    5*seg-fw, 5*seg], [20, 0,  0, -20]);
  const y5 = useTransform(scrollYProgress, [5*seg-fw, 5*seg,    1               ], [20, 0,  0]);
  const svcYs = [y0, y1, y2, y3, y4, y5];

  // Hard-hide panels once they've faded out so nothing lingers at low opacity
  const v0 = useTransform(op0, (v: number) => (v < 0.02 ? "hidden" : "visible"));
  const v1 = useTransform(op1, (v: number) => (v < 0.02 ? "hidden" : "visible"));
  const v2 = useTransform(op2, (v: number) => (v < 0.02 ? "hidden" : "visible"));
  const v3 = useTransform(op3, (v: number) => (v < 0.02 ? "hidden" : "visible"));
  const v4 = useTransform(op4, (v: number) => (v < 0.02 ? "hidden" : "visible"));
  const v5 = useTransform(op5, (v: number) => (v < 0.02 ? "hidden" : "visible"));
  const svcVis = [v0, v1, v2, v3, v4, v5];

  // Entrance fade-in is handled by the per-column whileInView variants below,
  // so the sticky wrapper always stays fully opaque while the section is pinned.


  const [activeIdx, setActiveIdx] = useState(0);
  const [solutionIdx, setSolutionIdx] = useState(0);
  const [isOverviewSpeaking, setIsOverviewSpeaking] = useState(false);
  const [overviewSpeechError, setOverviewSpeechError] = useState("");
  useEffect(() => {
    return scrollYProgress.on("change", (v: number) => {
      if (!programmaticScrollRef.current) {
        setActiveIdx(Math.min(N - 1, Math.floor(v / seg)));
      }
    });
  }, [scrollYProgress]);

  useEffect(() => {
    setSolutionIdx(0);
  }, [activeIdx]);

  useEffect(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsOverviewSpeaking(false);
    setOverviewSpeechError("");
  }, [activeIdx, solutionIdx]);

  useEffect(() => () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const toggleSolutionOverview = () => {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setOverviewSpeechError("Voice overview is not available in this browser.");
      return;
    }

    if (isOverviewSpeaking) {
      window.speechSynthesis.cancel();
      setIsOverviewSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(activeSolution.overviewText ?? activeSolution.description);
    utterance.lang = "en-NG";
    utterance.onend = () => setIsOverviewSpeaking(false);
    utterance.onerror = (event) => {
      setIsOverviewSpeaking(false);
      if (event.error !== "canceled" && event.error !== "interrupted") {
        setOverviewSpeechError("The voice overview could not be played. Please try again.");
      }
    };

    setOverviewSpeechError("");
    setIsOverviewSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const scrollToService = (index: number) => {
    const section = ref.current;
    if (!section) return;

    if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
    setActiveIdx(index);
    programmaticScrollRef.current = true;
    if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = Math.max(0, section.offsetHeight - window.innerHeight);
    const targetProgress = (index + 0.5) / N;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: sectionTop + targetProgress * scrollableDistance,
      behavior: reducedMotion ? "auto" : "smooth",
    });

    navigationTimerRef.current = setTimeout(() => {
      programmaticScrollRef.current = false;
      setActiveIdx(Math.min(N - 1, Math.floor(scrollYProgress.get() / seg)));
    }, reducedMotion ? 200 : 1400);
  };

  useEffect(() => {
    const finishNavigation = () => {
      if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = setTimeout(() => {
        programmaticScrollRef.current = false;
        setActiveIdx(Math.min(N - 1, Math.floor(scrollYProgress.get() / seg)));
      }, 180);
    };

    const onSectionNavigation = () => {
      programmaticScrollRef.current = true;
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      finishNavigation();
    };

    const onScroll = () => {
      if (programmaticScrollRef.current) {
        if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
        finishNavigation();
        return;
      }

      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      scrollIdleTimerRef.current = setTimeout(() => {
        const section = ref.current;
        const progress = scrollYProgress.get();
        if (!section || progress <= 0 || progress >= 1) return;

        const activeService = Math.min(N - 1, Math.floor(progress / seg));
        const targetProgress = (activeService + 0.5) / N;
        if (Math.abs(progress - targetProgress) < 0.015) return;

        programmaticScrollRef.current = true;
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const scrollableDistance = Math.max(0, section.offsetHeight - window.innerHeight);
        window.scrollTo({
          top: sectionTop + targetProgress * scrollableDistance,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
        finishNavigation();
      }, 160);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const section = ref.current;
      const target = event.target;
      if (!section || !(target instanceof HTMLElement)) return;
      if (
        target.isContentEditable ||
        target.closest("input, textarea, select, [contenteditable='true']")
      ) return;

      const bounds = section.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) return;

      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        const solutions = SERVICE_SOLUTIONS[activeIdx]!;
        if (solutions.length < 2) return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        setSolutionIdx((current) => (current + direction + solutions.length) % solutions.length);
        return;
      }

      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex = activeIdx + direction;

      if (nextIndex < 0 && direction < 0) {
        const home = document.getElementById("section-home");
        if (!home) return;
        event.preventDefault();
        const homeTop = home.getBoundingClientRect().top + window.scrollY;
        const homeScrollRange = Math.max(0, home.offsetHeight - window.innerHeight);
        programmaticScrollRef.current = true;
        if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
        window.scrollTo({
          top: homeTop + homeScrollRange * 0.9,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
        finishNavigation();
        return;
      }

      if (nextIndex >= N && direction > 0) {
        const nextSection = document.getElementById("section-products");
        if (!nextSection) return;
        event.preventDefault();
        nextSection.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start",
        });
        return;
      }

      if (nextIndex < 0 || nextIndex >= N) return;
      event.preventDefault();
      scrollToService(nextIndex);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("site:section-navigation", onSectionNavigation);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("site:section-navigation", onSectionNavigation);
      if (scrollIdleTimerRef.current) clearTimeout(scrollIdleTimerRef.current);
      if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    };
  }, [activeIdx, scrollYProgress, N, seg]);

  const solutions = SERVICE_SOLUTIONS[activeIdx]!;
  const activeSolution = solutions[solutionIdx] ?? solutions[0]!;
  const cycleSolution = (direction: 1 | -1) => {
    setSolutionIdx((current) => (current + direction + solutions.length) % solutions.length);
  };

  return (
    <div ref={ref} className="relative" style={{ height: "780vh" }}>

      <div
        className="sticky top-0 z-0 h-screen overflow-hidden isolate pt-[108px] pb-0 flex items-start"
        style={{ background: "#011418" }}
      >
          <img src={figmaTopology} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover" style={{ opacity: 0.44, mixBlendMode: "screen" }} />
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(1,20,24,0.86) 0%, rgba(1,20,24,0.55) 44%, rgba(1,20,24,0.28) 100%)" }} />
          <div
            className="pointer-events-none absolute"
            style={{
              left: "55%", top: "50%",
              transform: "translate(-50%,-50%) rotate(52.4deg)",
              width: 85, height: 1561,
              background: "#04d9ff",
              filter: "blur(300px)",
              opacity: 0.12,
            }}
          />

          <div
            className="relative z-10 w-full max-w-[1400px] mx-auto px-8 lg:px-14 grid grid-cols-[44%_56%] gap-12 items-start"
          >

            {/* ── LEFT COLUMN ── */}
            <motion.div
              variants={servicesContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p
                variants={serviceLineVariants}
                className="text-[16px] font-semibold uppercase tracking-[0.15em] mb-4"
                style={{ fontFamily: NOHEMI, color: "#04d9ff" }}
              >
                OUR SERVICES
              </motion.p>

              <motion.div
                variants={serviceLineVariants}
                className="text-[44px] font-semibold leading-[1.2] capitalize mb-4"
                style={{ fontFamily: NOHEMI, maxWidth: 520 }}
              >
                <span style={{ color: "rgba(255,255,255,0.85)" }}>Next Generation </span>
                <span
                  style={{
                    backgroundImage: "linear-gradient(to right, #04f8ff 0%, #029599 80%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Enterprise Solutions
                </span>
              </motion.div>

              <motion.p
                variants={serviceLineVariants}
                className="text-[17px] leading-[1.6] mb-7"
                style={{ fontFamily: NOHEMI, color: "#94a3b8", maxWidth: 460 }}
              >
                Empowering businesses with cutting-edge technology, robust security, and data-driven insights.
              </motion.p>

              <motion.div variants={serviceLineVariants} className="flex gap-5 items-start">
                <div
                  className="relative shrink-0 rounded-full"
                  style={{ width: 8, height: 216, background: "rgba(217,217,217,0.25)" }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full rounded-full"
                    style={{ height: progressBarH, background: "#04d9ff" }}
                  />
                </div>

                <motion.nav aria-label="Our services" className="flex flex-col" variants={servicesContainerVariants}>
                  {OUR_SERVICES.map((svc, i) => {
                    const isActive = i === activeIdx;
                    return (
                      <motion.button
                        key={i}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => scrollToService(i)}
                        variants={serviceLineVariants}
                        className="flex items-center gap-[14px] rounded-sm text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04d9ff]"
                        style={{ height: 36, background: "transparent", border: 0, padding: 0 }}
                      >
                        {isActive ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                            <circle cx="6" cy="6" r="6" fill="#04D9FF" />
                          </svg>
                        ) : (
                          <div className="w-[12px] shrink-0" />
                        )}
                        <span
                          style={{
                            fontFamily: NOHEMI,
                            fontSize: 20,
                            lineHeight: "36px",
                            color: isActive ? "white" : "rgba(255,255,255,0.32)",
                            fontWeight: isActive ? 500 : 400,
                            transition: "color 0.45s ease",
                          }}
                        >
                          {svc.name}{isActive ? "." : ""}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.nav>
              </motion.div>
            </motion.div>


            {/* ── RIGHT COLUMN — Figma-informed solution portfolio stage ── */}
            <div className="relative min-w-0" style={{ height: "clamp(580px, calc(100vh - 108px), 740px)" }}>
              <AnimatePresence mode="wait">
                <motion.div key={activeIdx} className="relative flex h-full flex-col" initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -18, filter: "blur(8px)" }} transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}>
                  <div className="relative z-20 mb-3 border-b border-cyan-300/20 pb-3">
                    <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.20em] text-[#04d9ff]" style={{ fontFamily: NOHEMI }}><span className="h-2 w-2 rounded-full bg-[#04f8ff] shadow-[0_0_12px_rgba(4,248,255,0.85)]" />Selected solution</p>
                    <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
                      <h3 className="text-[34px] font-semibold leading-none tracking-[-0.04em] text-white" style={{ fontFamily: NOHEMI }}>{activeSolution.name}</h3>
                      <p className="pb-0.5 text-[14px] font-medium text-slate-400" style={{ fontFamily: NOHEMI }}>{activeSolution.subtitle}</p>
                    </div>
                  </div>

                  <div className="relative z-20 flex gap-2 overflow-x-auto pb-1" aria-label={`${OUR_SERVICES[activeIdx]!.name} solutions`}>
                    {solutions.map((solution, index) => {
                      const selected = index === solutionIdx;
                      return <button key={solution.name} type="button" onClick={() => setSolutionIdx(index)} className="shrink-0 rounded-[11px] px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04d9ff]" style={{ minWidth: 164, color: selected ? "white" : "rgba(255,255,255,0.62)", background: selected ? "rgba(4,217,255,0.09)" : "rgba(0,0,0,0.14)", border: selected ? "1px solid rgba(4,217,255,0.82)" : "1px solid rgba(148,163,184,0.25)", boxShadow: selected ? "0 0 18px rgba(4,217,255,0.18), inset 0 1px 0 rgba(255,255,255,0.10)" : "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
                        <span className="flex items-center gap-2 text-[12px] font-semibold" style={{ fontFamily: NOHEMI }}><span className="h-2 w-2 rounded-full bg-[#04f8ff]" />{solution.name}</span>
                        <span className="mt-1 block pl-4 text-[9px] leading-tight text-slate-400" style={{ fontFamily: NOHEMI }}>{solution.subtitle}</span>
                      </button>;
                    })}
                  </div>

                  <div className="relative z-10 mt-8 h-[390px] shrink-0 rounded-[30px] border-2 border-[#04d9ff] bg-[#03171d]/80 shadow-[0_0_56px_rgba(4,217,255,0.18)]" style={{ boxShadow: "0 0 56px rgba(4,217,255,0.20), inset 0 1px 0 rgba(255,255,255,0.08)" }}>
                    <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(ellipse_at_center,rgba(4,217,255,0.12),transparent_55%)]" />
                    <AnimatePresence mode="wait">
                      <motion.div key={`${activeIdx}-${solutionIdx}`} className="absolute inset-0 overflow-hidden rounded-[28px]" initial={{ opacity: 0, scale: 1.045, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.97, x: -24 }} transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>
                        {activeSolution.previewUrl && activeSolution.embedPreview !== false ? (
                          <iframe
                            src={activeSolution.previewUrl}
                            title={`Interactive ${activeSolution.name} website preview`}
                            className="absolute inset-0 h-full w-full border-0 bg-[#011418]"
                            allow="autoplay; microphone; camera"
                            allowFullScreen
                          />
                        ) : activeSolution.previewUrl ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[radial-gradient(ellipse_at_center,rgba(4,217,255,0.15),transparent_60%),linear-gradient(135deg,#011418,#061d27)] px-6 text-center">
                            {activeSolution.name === "CamperVerse" ? (
                              <div className="w-full max-w-[620px]">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#04d9ff]" style={{ fontFamily: NOHEMI }}>CORPSMATE · CAMPERVERSE</p>
                                <h4 className="mt-4 text-[clamp(32px,3vw,54px)] font-semibold leading-[0.96] tracking-[-0.05em] text-white" style={{ fontFamily: NOHEMI }}>Find your NYSC orientation<br />camp</h4>
                                <p className="mx-auto mt-5 max-w-[430px] text-[13px] leading-[1.5] text-slate-300" style={{ fontFamily: NOHEMI }}>Open the secure CamperVerse website to explore your corps member companion.</p>
                                <a
                                  href={activeSolution.previewUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-6 inline-flex items-center justify-center rounded-full border border-[#04d9ff] bg-[#04d9ff] px-5 py-3 text-sm font-semibold text-[#011418] shadow-[0_0_24px_rgba(4,217,255,0.45)] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                  style={{ fontFamily: NOHEMI }}
                                >
                                  Visit camperverse.ng
                                </a>
                              </div>
                            ) : (
                              <>
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[#04d9ff]" style={{ fontFamily: NOHEMI }}>{`${activeSolution.name.toUpperCase()} • LIVE PREVIEW`}</span>
                                <h4 className="max-w-md text-2xl font-semibold text-white md:text-3xl" style={{ fontFamily: NOHEMI }}>{activeSolution.name}</h4>
                                <p className="max-w-md text-sm text-slate-300" style={{ fontFamily: NOHEMI }}>{activeSolution.description}</p>
                                <a
                                  href={activeSolution.previewUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="rounded-full border border-[#04d9ff] bg-[#04d9ff] px-5 py-2.5 text-sm font-semibold text-[#011418] transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                  style={{ fontFamily: NOHEMI }}
                                >
                                  Visit {activeSolution.name} ↗
                                </a>
                              </>
                            )}
                          </div>
                        ) : (
                          <>
                            <video src={OUR_SERVICES[activeIdx]!.video} autoPlay muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(130deg, rgba(1,10,20,0.52) 0%, transparent 48%, rgba(1,10,20,0.48) 100%)" }} />
                            {activeSolution.productPreview ? <img src={figmaSoftwarePreview} alt={`${activeSolution.name} interface preview`} className="absolute inset-[13%] h-[74%] w-[74%] object-contain opacity-90 drop-shadow-[0_0_24px_rgba(4,217,255,0.34)]" /> : null}
                          </>
                        )}

                        {activeSolution.previewUrl && activeSolution.embedPreview !== false ? (
                          <a
                            href={activeSolution.previewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute right-4 top-4 z-20 rounded-full border border-cyan-300/50 bg-cyan-950/90 px-3 py-2 text-[10px] font-semibold text-cyan-100 backdrop-blur-sm transition hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04d9ff]"
                            style={{ fontFamily: NOHEMI }}
                          >
                            OPEN {activeSolution.name.toUpperCase()} ↗
                          </a>
                        ) : null}
                        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                          <div className="rounded-xl px-3 py-2" style={{ background: "rgba(2,12,20,0.68)", border: "1px solid rgba(4,217,255,0.32)", backdropFilter: "blur(12px)" }}>
                            <span className="block text-[9px] font-semibold uppercase tracking-[0.15em] text-[#04d9ff]" style={{ fontFamily: NOHEMI }}>Solution preview</span>
                            <span className="mt-0.5 block text-[13px] font-semibold text-white" style={{ fontFamily: NOHEMI }}>{activeSolution.name}</span>
                          </div>
                          {activeSolution.previewUrl ? (
                            <button
                              type="button"
                              onClick={toggleSolutionOverview}
                              aria-pressed={isOverviewSpeaking}
                              className="rounded-full border border-cyan-300/50 bg-cyan-950/90 px-3 py-2 text-[10px] font-semibold text-cyan-100 backdrop-blur-sm transition hover:bg-cyan-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04d9ff]"
                              style={{ fontFamily: NOHEMI }}
                            >
                              {isOverviewSpeaking ? "STOP OVERVIEW" : "LIVE OVERVIEW · HEAR"}
                            </button>
                          ) : (
                            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[10px] font-medium text-cyan-100 backdrop-blur-sm" style={{ fontFamily: NOHEMI }}>LIVE OVERVIEW</span>
                          )}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p key={`copy-${activeIdx}-${solutionIdx}`} className="mt-3 text-[14px] leading-[1.55] text-slate-400" style={{ fontFamily: NOHEMI }} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.28 }}>{activeSolution.description}</motion.p>
                  </AnimatePresence>
                  {activeSolution.previewUrl ? (
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <a href={activeSolution.previewUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#04d9ff] underline underline-offset-4 hover:text-white">
                        Open {activeSolution.name === "KohBot" ? "kohbot.ai" : "camperverse.ng"}
                      </a>
                      {overviewSpeechError ? <p role="status" className="text-xs text-amber-300">{overviewSpeechError}</p> : null}
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
      </div>
    </div>
  );
}

/* ──────────────────────────── Root ─────────────────────────────── */
  // 720vh cinematic container keeps each editorial scene intentional without creating empty interludes.
// 0.00–0.04  hero hold          0.04–0.14  hero → about
// 0.14–0.33  about hold         0.33–0.42  about → WhatWeDo
// 0.42–0.66  card 1 (left)      0.60–0.80  card 2 (right)
// 0.74–1.00  card 3 (left)

export default function SoftSeerSite() {
  useEffect(() => {
    let sectionObserver: MutationObserver | null = null;
    let observerTimeout: ReturnType<typeof setTimeout> | null = null;

    const navigationEntry = window.performance
      ?.getEntriesByType("navigation")
      .at(0) as PerformanceNavigationTiming | undefined;
    const isReload =
      navigationEntry?.type === "reload" ||
      (!navigationEntry && window.performance?.navigation?.type === 1);

    if (isReload) {
      window.history.replaceState(null, "", "/");
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    const handleHashScroll = () => {
      sectionObserver?.disconnect();
      sectionObserver = null;
      if (observerTimeout) clearTimeout(observerTimeout);

      const hash = window.location.hash;
      if (!hash) return;

      const scrollToHashSection = () => {
        const section = document.getElementById(hash.slice(1));
        if (!section) return false;

        sectionObserver?.disconnect();
        sectionObserver = null;
        if (observerTimeout) clearTimeout(observerTimeout);

        requestAnimationFrame(() => {
          const top = section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          });
        });
        return true;
      };

      if (scrollToHashSection()) return;

      sectionObserver = new MutationObserver(() => {
        scrollToHashSection();
      });
      sectionObserver.observe(document.body, { childList: true, subtree: true });
      observerTimeout = setTimeout(() => {
        sectionObserver?.disconnect();
        sectionObserver = null;
      }, 5000);
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
      sectionObserver?.disconnect();
      if (observerTimeout) clearTimeout(observerTimeout);
    };
  }, []);

  // Framer Motion's useScroll checks getComputedStyle(document.scrollingElement).position.
  // In Vite dev mode CSS is injected via JS *after* effects fire, so the stylesheet rule
  // html { position: relative } isn't in the DOM yet when the check runs.
  // useLayoutEffect is guaranteed to complete before any useEffect (including Framer
  // Motion's internal scroll-setup effect), making this the correct intercept point.
  useLayoutEffect(() => {    const el = (document.scrollingElement ?? document.documentElement) as HTMLElement;
    el.style.position = "relative";
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Container is 900vh; sticky releases at 800vh → progress 1.0 = 800vh.
  // Layout: hero(112vh) → about(264vh) → wwd entry(72vh) → 3 card pages(352vh)

  // ── Hero ── hold 32vh, fade 80vh
  const heroOpacity       = useTransform(scrollYProgress, [0, 0.03, 0.09], [1, 1, 0]);
  const heroVisibility    = useTransform(scrollYProgress, (v: number) => (v > 0.1 ? "hidden" : "visible"));
  const heroY             = useTransform(scrollYProgress, [0.04, 0.14], [0, -60]);

  // ── About ── enters with hero crossfade, exits as WhatWeDo arrives
  const aboutOpacity      = useTransform(scrollYProgress, [0.03, 0.11, 0.33, 0.42], [0, 1, 1, 0]);
  const aboutY            = useTransform(scrollYProgress, [0.03, 0.11, 0.33, 0.42], [80, 0, 0, -60]);

  // ── Videos ──
  const heroVideoOpacity  = useTransform(scrollYProgress, [0, 0.03, 0.09], [0.75, 0.75, 0]);
  const aboutVideoOpacity = useTransform(scrollYProgress, [0.04, 0.14, 0.33, 0.42], [0, 0.55, 0.55, 0]);

  // ── What We Do layer ── card animations handled inside WhatWeDoLayer
  // ── Hero globe ── holds full size, then shrinks away into the next section
  const globeScale        = useTransform(scrollYProgress, [0, 0.03, 0.09], [1, 1, 0.45]);
  const globeOpacity      = useTransform(scrollYProgress, [0, 0.03, 0.09], [1, 1, 0]);
  const globeY            = useTransform(scrollYProgress, [0.03, 0.09], [0, -40]);

  const wwdOpacity        = useTransform(scrollYProgress, [0.33, 0.42], [0, 1]);
  const wwdY              = useTransform(scrollYProgress, [0.33, 0.42], [80, 0]);

  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v: number) => {
      setTextVisible(v > 0.12);
    });
  }, [scrollYProgress]);

  useEffect(() => {
    let isTransitioning = false;
    let transitionComplete = false;
    let wheelIsIdle = true;
    let transitionTimer: ReturnType<typeof setTimeout> | null = null;
    let wheelIdleTimer: ReturnType<typeof setTimeout> | null = null;

    const scheduleWheelIdle = () => {
      wheelIsIdle = false;
      if (wheelIdleTimer) clearTimeout(wheelIdleTimer);
      wheelIdleTimer = setTimeout(() => {
        wheelIsIdle = true;
        if (transitionComplete) isTransitioning = false;
      }, 180);
    };

    const beginTransition = () => {
      isTransitioning = true;
      transitionComplete = false;
      scheduleWheelIdle();
      if (transitionTimer) clearTimeout(transitionTimer);
      transitionTimer = setTimeout(() => {
        transitionComplete = true;
        if (wheelIsIdle) isTransitioning = false;
      }, 700);
    };

    const onScrollEnd = () => {
      if (!isTransitioning) return;
      transitionComplete = true;
      if (transitionTimer) clearTimeout(transitionTimer);
      if (wheelIsIdle) isTransitioning = false;
    };

    const getSnapStops = () => {
      const home = document.getElementById("section-home");
      const services = document.getElementById("section-our-services");
      const products = document.getElementById("section-products");
      const team = document.getElementById("section-team");
      const contact = document.getElementById("section-reach-out");

      if (!home || !services) return [];

      const topOf = (element: HTMLElement) => element.getBoundingClientRect().top + window.scrollY;
      const homeTop = topOf(home);
      const homeScrollRange = Math.max(0, home.offsetHeight - window.innerHeight);
      const servicesTop = topOf(services);
      const servicesScrollRange = Math.max(0, services.offsetHeight - window.innerHeight);
      const stops = [
        homeTop,
        homeTop + homeScrollRange * 0.22,
        homeTop + homeScrollRange * 0.55,
        homeTop + homeScrollRange * 0.74,
        homeTop + homeScrollRange * 0.9,
        ...OUR_SERVICES.map((_, index) => servicesTop + servicesScrollRange * ((index + 0.5) / OUR_SERVICES.length)),
      ];

      for (const section of [products, team, contact]) {
        if (section instanceof HTMLElement) stops.push(topOf(section));
      }

      return stops.sort((a, b) => a - b);
    };

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 8 || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      const target = event.target;
      if (target instanceof HTMLElement && target.closest("input, textarea, select, [contenteditable='true']")) return;

      if (isTransitioning) {
        event.preventDefault();
        scheduleWheelIdle();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const longSections = [
        { id: "section-products", nextId: "section-team", previousId: null },
        { id: "section-team", nextId: "section-reach-out", previousId: "section-products" },
      ];
      const currentY = window.scrollY;
      const currentLongSection = longSections.find(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const top = section.getBoundingClientRect().top + currentY;
        const bottom = top + section.offsetHeight;
        return currentY >= top - 1 && currentY < bottom - 1;
      });

      if (currentLongSection) {
        const section = document.getElementById(currentLongSection.id);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + currentY;
          const sectionBottom = sectionTop + section.offsetHeight;
          const atTop = currentY <= sectionTop + 1;
          const atBottom = currentY + window.innerHeight >= sectionBottom - 1;

          if (direction > 0 && !atBottom) return;
          if (direction < 0 && !atTop) return;

          event.preventDefault();

          let destinationY: number;
          if (direction > 0) {
            const destination = document.getElementById(currentLongSection.nextId);
            if (!destination) return;
            destinationY = destination.getBoundingClientRect().top + currentY;
          } else if (currentLongSection.previousId) {
            const previous = document.getElementById(currentLongSection.previousId);
            if (!previous) return;
            const previousTop = previous.getBoundingClientRect().top + currentY;
            destinationY = previousTop + previous.offsetHeight - window.innerHeight;
          } else {
            const previousStops = getSnapStops().filter((stop) => stop < sectionTop - 1);
            if (!previousStops.length) return;
            destinationY = previousStops[previousStops.length - 1]!;
          }

          beginTransition();
          window.scrollTo({
            top: destinationY,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          });
          return;
        }
      }

      event.preventDefault();

      const stops = getSnapStops();
      if (!stops.length) return;

      const currentStop = stops.reduce((nearest, stop, index) =>
        Math.abs(stop - currentY) < Math.abs(stops[nearest]! - currentY) ? index : nearest, 0);
      const nextStop = currentStop + direction;
      if (nextStop < 0 || nextStop >= stops.length) return;

      let destinationY = stops[nextStop]!;
      if (direction < 0) {
        const previousSection = ["section-products", "section-team"]
          .map((id) => document.getElementById(id))
          .find((section) =>
            section instanceof HTMLElement &&
            Math.abs(section.getBoundingClientRect().top + currentY - destinationY) < 1,
          );
        if (previousSection instanceof HTMLElement) {
          destinationY += previousSection.offsetHeight - window.innerHeight;
        }
      }

      beginTransition();
      window.scrollTo({
        top: destinationY,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest("input, textarea, select, [contenteditable='true']"))
      ) return;

      const services = document.getElementById("section-our-services");
      if (services) {
        const bounds = services.getBoundingClientRect();
        if (bounds.bottom > 0 && bounds.top < window.innerHeight) return;
      }

      if (isTransitioning) {
        event.preventDefault();
        return;
      }

      const direction = event.key === "ArrowDown" ? 1 : -1;
      const currentY = window.scrollY;
      const longSections = [
        { id: "section-products", nextId: "section-team", previousId: null },
        { id: "section-team", nextId: "section-reach-out", previousId: "section-products" },
      ];
      const currentLongSection = longSections.find(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return false;
        const top = section.getBoundingClientRect().top + currentY;
        return currentY >= top - 1 && currentY < top + section.offsetHeight - 1;
      });

      if (currentLongSection) {
        const section = document.getElementById(currentLongSection.id);
        if (!section) return;
        const sectionTop = section.getBoundingClientRect().top + currentY;
        const sectionBottom = sectionTop + section.offsetHeight;
        const atTop = currentY <= sectionTop + 1;
        const atBottom = currentY + window.innerHeight >= sectionBottom - 1;

        if ((direction > 0 && !atBottom) || (direction < 0 && !atTop)) return;

        let destinationY: number;
        if (direction > 0) {
          const next = document.getElementById(currentLongSection.nextId);
          if (!next) return;
          destinationY = next.getBoundingClientRect().top + currentY;
        } else if (currentLongSection.previousId) {
          const previous = document.getElementById(currentLongSection.previousId);
          if (!previous) return;
          destinationY = previous.getBoundingClientRect().top + currentY +
            previous.offsetHeight - window.innerHeight;
        } else {
          const previousStops = getSnapStops().filter((stop) => stop < sectionTop - 1);
          if (!previousStops.length) return;
          destinationY = previousStops[previousStops.length - 1]!;
        }

        event.preventDefault();
        beginTransition();
        window.scrollTo({
          top: destinationY,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
        return;
      }

      const stops = getSnapStops();
      if (!stops.length) return;
      const currentStop = stops.reduce((nearest, stop, index) =>
        Math.abs(stop - currentY) < Math.abs(stops[nearest]! - currentY) ? index : nearest, 0);
      const nextStop = currentStop + direction;
      if (nextStop < 0 || nextStop >= stops.length) return;

      let destinationY = stops[nextStop]!;
      if (direction < 0) {
        const previousSection = ["section-products", "section-team"]
          .map((id) => document.getElementById(id))
          .find((section) =>
            section instanceof HTMLElement &&
            Math.abs(section.getBoundingClientRect().top + currentY - destinationY) < 1,
          );
        if (previousSection instanceof HTMLElement) {
          destinationY += previousSection.offsetHeight - window.innerHeight;
        }
      }

      event.preventDefault();
      beginTransition();
      window.scrollTo({
        top: destinationY,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scrollend", onScrollEnd);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scrollend", onScrollEnd);
      if (transitionTimer) clearTimeout(transitionTimer);
      if (wheelIdleTimer) clearTimeout(wheelIdleTimer);
    };
  }, []);

  return (
    <>
      {/* Fixed navbar — persists across all sections */}
      <SoftSeerNavbar />

      {/* ── Cinematic sticky-scroll zone — hero + about + WhatWeDo in 900vh ── */}
      <div id="section-home" ref={containerRef} className="relative" style={{ height: "460vh", scrollMarginTop: 96 }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#011418]">

          {/* Layer 0: shared video background */}
          <div className="absolute inset-0 z-0">
            {/* Space plate — framed above its own horizon so the 3D earth is the only planet below */}
            <motion.img
              src={bgVideo}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: heroVideoOpacity,
                objectPosition: "center center",
              }}
            />
            <motion.video
              src={aboutVideo}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: aboutVideoOpacity, filter: "saturate(0.88) brightness(0.70)" }}
            />
          </div>

          {/* Layer 0b: horizon veil — sinks the plate's own planet so the 3D earth reads as the only one */}
          <div
            className="absolute inset-x-0 bottom-0 h-[46%] z-0 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(1,20,24,0) 0%, rgba(1,20,24,0.85) 42%, rgba(1,20,24,1) 78%)",
            }}
          />

          {/* Layer 1: top vignette */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(1,20,24,0.88) 0%, rgba(1,20,24,0) 22%, rgba(1,20,24,0) 75%, rgba(1,20,24,0.55) 100%)",
            }}
          />

          {/* Layer 3: hero content */}
          <motion.div
            className="absolute inset-0 z-[3] flex flex-col pointer-events-none"
            style={{ opacity: heroOpacity, y: heroY, visibility: heroVisibility }}
          >
            <motion.div
              className="absolute pointer-events-none"
              style={{
                left: "50%", top: "calc(100% + 500px)",
                x: "-50%", y: "-50%",
                width: 2000, height: 2000,
                scale: globeScale,
                opacity: globeOpacity,
                transformOrigin: "50% 40%",
              }}
            >
              {/* Atmospheric halo — matches the cyan rim light of the space plate */}
              <div
                className="absolute inset-[10%]"
                style={{
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(4,150,255,0.12) 0%, rgba(4,217,255,0.05) 58%, transparent 70%)",
                  boxShadow: "0 0 160px 50px rgba(4,150,255,0.20)",
                }}
              />
              {/* 3D earth */}
              <Suspense fallback={null}>
                <HeroGlobe />
              </Suspense>

            </motion.div>
            <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pt-[108px] pointer-events-auto">
              <HeroHeadline />
              <AnimatedSubheading />
              <GetStartedButton />
            </div>
          </motion.div>

          {/* Layer 4: about content + logo carousel */}
          <motion.div
            id="section-about-us"
            className="absolute inset-0 z-[4] flex flex-col"
            style={{ opacity: aboutOpacity, y: aboutY, scrollMarginTop: 96 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(1,20,24,0.65) 100%)",
              }}
            />
            <div className="relative flex-1 flex items-center" style={{ paddingTop: "clamp(72px, 12vh, 120px)", boxSizing: "border-box" }}>
              <AboutTextBlock visible={textVisible} />
            </div>
            <LogoStrip skipEntrance />
          </motion.div>

          {/* Layer 5: What We Do — each card on its own scroll page */}
          <WhatWeDoLayer opacity={wwdOpacity} y={wwdY} scrollYProgress={scrollYProgress} />

        </div>
      </div>

      {/* ── Our Services — 720vh sticky-scroll zone ── */}
      <div id="section-our-services" style={{ scrollMarginTop: 96 }}>
        <OurServicesSection />
      </div>

      {/* ── Selected Platforms → Footer ── */}
      <Suspense fallback={null}>
        <LowerSections />
      </Suspense>
    </>
  );
}

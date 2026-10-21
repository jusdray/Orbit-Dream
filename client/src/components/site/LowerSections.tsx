/* Design: Orbital Editorial — upright human portraits give the deep-space narrative an intentional human anchor. */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import TeamCarousel from "./TeamCarousel";

import svgTeam from "@/lib/site/svg-team";
import svgContact from "@/lib/site/svg-contact";

const NOHEMI = "'Nohemi', 'Plus Jakarta Sans', sans-serif";
const INTER = "'Inter', 'Plus Jakarta Sans', sans-serif";
const EASE_EASE_OUT: [number, number, number, number] = [0, 0, 0.58, 1];

const imgSoftSeer = "/assets/softseer-logo.png";
const imgSoftSeerMark = "/assets/softseer-logo.png";
const imgSoftSeerWatermark = "/assets/softseer-logo.png";
const imgLERMSApp = "/assets/18-412.webp";
const imgTeamFrame = "/assets/18-452.webp";
const imgEarth = "/assets/18-358.webp";

/* ──────────────────────── Products Section ────────────────────── */

const PRODUCTS = [
  {
    id: "lerms",
    name: "Lagos Emergency Responder Management System (LERMS)",
    description:
      "LERMS is a fully integrated, AI-driven platform designed to drastically reduce emergency response time by analyzing real time data from various incident triggers to detect and access severity.",
    image: imgLERMSApp,
  },
  {
    id: "eqis",
    name: "EQIS",
    description:
      "A comprehensive Environmental Quality Intelligence System that monitors, analyzes, and reports on environmental data to help organizations maintain compliance and drive sustainability initiatives.",
    image: null,
  },
  {
    id: "dutycom",
    name: "DUTYCOM",
    description:
      "DUTYCOM streamlines duty management and communication across teams, ensuring efficient workforce coordination with real-time updates, scheduling, and automated notifications.",
    image: null,
  },
  {
    id: "salesrep",
    name: "Sales Rep Manager",
    description:
      "A comprehensive sales force management tool that helps organizations track, manage, and optimize their sales representative performance with real-time insights and analytics.",
    image: null,
  },
  {
    id: "accugauge",
    name: "Accugauge",
    description:
      "Accugauge delivers precision measurement and monitoring solutions for industrial and enterprise environments, providing accurate real-time data for informed decision-making.",
    image: null,
  },
  {
    id: "home2class",
    name: "Home2Class",
    description:
      "Home2Class bridges the gap between home and classroom, providing seamless remote learning experiences with interactive tools, real-time collaboration, and adaptive curriculum delivery.",
    image: null,
  },
  {
    id: "myechurch",
    name: "Mye Church",
    description:
      "Mye Church is a comprehensive church management platform that helps faith communities organize, communicate, and grow through digital tools for membership, events, and giving.",
    image: null,
  },
] as const;

const ROCK_ANIM = { rotate: [7.63, -22.37, 7.63] };
const ROCK_TRANS = {
  rotate: {
    duration: 3.67,
    ease: [0.5, 0, 0.5, 1] as [number, number, number, number],
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

function ProductImagePlaceholder() {
  return (
    <div
      className="rounded-[32px] flex items-center justify-center"
      style={{
        width: 280,
        height: 294,
        background: "linear-gradient(135deg, #012428 0%, #01404a 100%)",
        border: "1px solid rgba(4,217,255,0.25)",
        boxShadow: "0px 4px 24px rgba(0,0,0,0.75), 0 0 60px -20px rgba(4,217,255,0.5)",
      }}
    >
      <img src={imgSoftSeerMark} alt="" className="w-[55%] object-contain" style={{ opacity: 0.25 }} />
    </div>
  );
}

function ProductRow({
  product,
  isActive,
  onClick,
}: {
  product: (typeof PRODUCTS)[number];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="relative w-full cursor-pointer"
      style={{ borderBottom: "2px solid rgba(255,255,255,0.2)" }}
      animate={{ opacity: isActive ? 1 : 0.3 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onClick={onClick}
    >
      {isActive ? (
        <motion.div
          className="relative flex gap-9 items-center pl-[37px] py-4 pr-4"
          style={{
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            background: "rgba(255,255,255,0.04)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 4px rgba(255,255,255,0.12)" }}
          />

          <div className="shrink-0 rounded-[24px]" style={{ width: 4, height: 113, background: "#04d9ff", boxShadow: "0 0 18px rgba(4,217,255,0.7)" }} />

          <div className="flex-1 py-4">
            <h3
              className="text-[24px] font-semibold text-white leading-[32px] capitalize"
              style={{ fontFamily: NOHEMI, maxWidth: 712 }}
            >
              {product.name}
            </h3>
            <p
              className="text-[18px] leading-[24px] mt-[44px]"
              style={{ fontFamily: NOHEMI, color: "#94a3b8", maxWidth: 580 }}
            >
              {product.description}
            </p>
          </div>

          <div className="relative shrink-0 flex items-center" style={{ width: 346, height: 340 }}>
            <motion.div
              animate={ROCK_ANIM}
              transition={ROCK_TRANS}
              className="absolute inset-0 flex items-center justify-center"
              style={{ transformOrigin: "50% 50%" }}
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded-[32px] object-cover"
                  style={{ width: 280, height: 294, boxShadow: "0px 4px 24px rgba(0,0,0,0.75)" }}
                />
              ) : (
                <ProductImagePlaceholder />
              )}
            </motion.div>

            <div
              className="absolute flex items-center justify-center rounded-full"
              style={{
                right: 0,
                bottom: 24,
                width: 40,
                height: 40,
                background: "#04D9FF",
                boxShadow: "0 0 16px rgba(4,217,255,0.45)",
              }}
            >
              <ArrowUpRight size={20} color="black" />
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="flex items-center justify-between py-4 pl-[37px] pr-4" style={{ minHeight: 83 }}>
          <h3 className="text-[24px] font-semibold text-white capitalize leading-[32px]" style={{ fontFamily: NOHEMI }}>
            {product.name}
          </h3>
          <ArrowUpRight size={22} color="white" />
        </div>
      )}
    </motion.div>
  );
}

function ProductsSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative z-10 isolate overflow-hidden" style={{ background: "#011418" }}>
      <div
        className="pointer-events-none absolute"
        style={{
          left: "60%",
          top: "30%",
          transform: "translate(-50%, -50%) rotate(52.4deg)",
          width: 85,
          height: 1561,
          background: "#04d9ff",
          filter: "blur(300px)",
          opacity: 0.09,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          left: "10%",
          top: "5%",
          width: 700,
          height: 700,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(4,217,255,0.14) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <div className="relative pt-[110px] pb-24">
        <p
          className="text-center text-[18px] font-semibold uppercase tracking-[0.15em] mb-5"
          style={{ fontFamily: NOHEMI, color: "#04d9ff" }}
        >
          Selected Platforms
        </p>

        <div
          className="text-center font-semibold leading-[1.33] mb-14"
          style={{ fontFamily: NOHEMI, fontSize: "clamp(32px, 3.5vw, 48px)" }}
        >
          <p style={{ color: "rgba(255,255,255,0.85)" }}>Cutting-Edge Tech</p>
          <p
            style={{
              backgroundImage: "linear-gradient(to right, #04f8ff 0%, #029599 80%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Ecosystems
          </p>
        </div>

        <div className="w-full max-w-[1328px] mx-auto px-4 lg:px-14">
          {PRODUCTS.map((product, i) => (
            <ProductRow key={product.id} product={product} isActive={i === activeIdx} onClick={() => setActiveIdx(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────── Team Section ─────────────────────── */

const TEAM_MEMBERS = [
  {
    name: "Emmanuel Fakoya",
    title: "Chief Executive Officer",
    image: "/assets/18-516.webp",
    socials: [
      { icon: "linkedin", path: svgTeam.pb8c40c0 },
      { icon: "x", path: svgTeam.p311ca372 },
    ],
  },
  {
    name: "Omotosin Ogunmakin",
    title: "Director of Strategy",
    image: "/assets/18-520.webp",
    socials: [
      { icon: "linkedin", path: svgTeam.pb8c40c0 },
      { icon: "github", path: svgTeam.p31e7ef00 },
    ],
  },
  {
    name: "Folu Busari",
    title: "Director of Administration",
    image: "/assets/18-507.webp",
    socials: [
      { icon: "linkedin", path: svgTeam.pb8c40c0 },
      { icon: "instagram", path: svgTeam.p2216ff40 },
    ],
  },
  {
    name: "Opeyemi Fakoya",
    title: "General Manager",
    image: "/assets/18-524.webp",
    socials: [
      { icon: "linkedin", path: svgTeam.pb8c40c0 },
      { icon: "globe", path: svgTeam.p3e568000 },
    ],
  },
];

const TEAM_STAGGER_DELAYS = [0, 0.4, 0.6, 0.9];

const ICON_VIEWBOXES: Record<string, string> = {
  linkedin: "0 0 13 13",
  x: "0 0 11 12",
  github: "0 0 13.5 13.5",
  instagram: "0 0 13 13",
  globe: "0 0 13 13",
};

function SocialIcon({ path, label, icon }: { path: string; label: string; icon: string }) {
  const vb = ICON_VIEWBOXES[icon] ?? "0 0 13 13";
  return (
    <div
      className="flex items-center justify-center rounded-full cursor-pointer"
      style={{ width: 32, height: 32, border: "0.667px solid #27272a", transition: "border-color 0.3s ease", flexShrink: 0 }}
      aria-label={label}
    >
      <svg width="14" height="14" viewBox={vb} fill="none">
        <path d={path} fill="#6B7280" />
      </svg>
    </div>
  );
}

function TeamMemberCard({ member, delay, inView }: { member: (typeof TEAM_MEMBERS)[0]; delay: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.65, delay, ease: EASE_EASE_OUT }}
      style={{ willChange: "transform, opacity" }}
    >
      <div
        className="relative cursor-pointer"
        style={{
          width: 255,
          height: 432,
          borderRadius: 16,
          background: "rgba(24,24,27,0.85)",
          border: hovered ? "1.5px solid #04d9ff" : "0.667px solid #27272a",
          boxShadow: hovered
            ? "0 0 0 1px #04d9ff, 0 0 28px 4px rgba(4,217,255,0.35), 0 0 56px 8px rgba(4,217,255,0.15)"
            : "0 0 40px -10px rgba(4,217,255,0.2)",
          transform: hovered ? "scale(1.045)" : "scale(1)",
          transition: "transform 0.45s cubic-bezier(0,0,0.58,1), box-shadow 0.45s ease, border 0.45s ease",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 305, background: `#27272a url(${imgTeamFrame}) center / cover`, overflow: "hidden" }}>
          <img
            src={member.image}
            alt={member.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              transform: "rotate(0deg)",
              transformOrigin: "center center",
              filter: hovered ? "grayscale(0)" : "grayscale(1)",
              transition: "filter 0.5s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "linear-gradient(to top, #18181b, transparent)",
              pointerEvents: "none",
            }}
          />
        </div>

        <div style={{ position: "absolute", top: 305, left: 0, right: 0, bottom: 0, padding: "18px 20px 16px" }}>
          <p style={{ fontFamily: NOHEMI, fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: "24px", marginBottom: 4 }}>
            {member.name}
          </p>
          <p
            style={{
              fontFamily: NOHEMI,
              fontSize: 11,
              fontWeight: 700,
              color: "#04d9ff",
              letterSpacing: "1.1px",
              textTransform: "uppercase",
              lineHeight: "15px",
              marginBottom: 14,
            }}
          >
            {member.title}
          </p>
          <div className="flex items-center gap-2">
            {member.socials.map((s) => (
              <SocialIcon key={s.icon} path={s.path} label={s.icon} icon={s.icon} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section ref={ref} className="relative" style={{ background: "#011418", paddingTop: 120, paddingBottom: 120, overflow: "hidden" }}>
      <div
        className="pointer-events-none absolute"
        style={{
          left: "50%",
          top: "20%",
          width: 1100,
          height: 700,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(4,217,255,0.10) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div className="relative text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASE_EASE_OUT }}
          style={{
            fontFamily: NOHEMI,
            fontSize: 18,
            fontWeight: 600,
            color: "#04d9ff",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          THE TEAM
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.12, ease: EASE_EASE_OUT }}
          style={{ fontFamily: NOHEMI, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 600, lineHeight: 1.15, textAlign: "center" }}
        >
          <span style={{ color: "rgba(255,255,255,0.85)" }}>Architecturing The</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #04f8ff 0%, #029599 79.808%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Future Of Tech
          </span>
        </motion.div>
      </div>

      <div className="relative flex justify-center gap-5 px-8" style={{ overflowX: "auto" }}>
        {TEAM_MEMBERS.map((member, i) => (
          <TeamMemberCard key={member.name} member={member} delay={TEAM_STAGGER_DELAYS[i]} inView={inView} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────── Earth Visual (cyan glow + rotation) ──────── */

function EarthVisual() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
      <div
        style={{
          position: "absolute",
          inset: "-10%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(4,217,255,0.18) 55%, rgba(4,217,255,0.06) 75%, transparent 88%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "-4%",
          borderRadius: "50%",
          boxShadow:
            "0 0 60px 14px rgba(4,217,255,0.35), 0 0 120px 28px rgba(4,217,255,0.16), 0 0 200px 48px rgba(4,217,255,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          border: "1.5px solid rgba(4,217,255,0.3)",
        }}
      >
        <motion.img
          src={imgEarth}
          alt="Earth from space"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
            transformOrigin: "50% 50%",
          }}
        />
      </div>
    </div>
  );
}

/* ──────────────────── Global Footprint Section ─────────────────── */

function GlobalFootprintSection({ onContact }: { onContact?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const [hov1, setHov1] = useState(false);
  const [hov2, setHov2] = useState(false);

  return (
    <section ref={ref} className="contact-footer-page__contact" style={{ flex: "1 0 auto", display: "flex", alignItems: "center", background: "#011418", position: "relative", overflow: "hidden", padding: "clamp(8px, 2.5vh, 24px) 0" }}>
      <div
        className="pointer-events-none absolute"
        style={{
          right: "5%",
          top: "50%",
          transform: "translate(30%, -50%)",
          width: 640,
          height: 640,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(4,217,255,0.10) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{
          left: "38%",
          top: "50%",
          transform: "translate(-50%, -50%) rotate(52.4deg)",
          width: 70,
          height: 1400,
          background: "#04d9ff",
          filter: "blur(240px)",
          opacity: 0.09,
        }}
      />

      <div
        className="contact-footer-content relative grid w-full grid-cols-1 md:grid-cols-2"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px, 4vw, 48px)", gap: "clamp(20px, 3vw, 40px)", alignItems: "center" }}
      >
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE_EASE_OUT }}
            style={{
              fontFamily: NOHEMI,
              fontSize: 15,
              fontWeight: 600,
              color: "#04d9ff",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Reach Out To Us
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: EASE_EASE_OUT }}
            style={{ fontFamily: NOHEMI, fontWeight: 700, fontSize: "clamp(26px, 3vw, 42px)", lineHeight: 1.02, marginBottom: 10 }}
          >
            <span style={{ color: "rgba(255,255,255,0.9)" }}>Our Global Footprint</span>
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #04f8ff 0%, #029599 79.808%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {"& Partnerships"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_EASE_OUT }}
            style={{
              fontFamily: NOHEMI,
              fontSize: "clamp(14px, 1.3vw, 18px)",
              color: "rgba(255,255,255,0.58)",
              lineHeight: 1.4,
              marginBottom: 14,
              maxWidth: 460,
            }}
          >
            Connecting businesses worldwide. Explore our reach and specialized services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE_EASE_OUT }}
            style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            <button
              onClick={onContact}
              onMouseEnter={() => setHov1(true)}
              onMouseLeave={() => setHov1(false)}
              style={{
                fontFamily: NOHEMI,
                fontSize: 13,
                fontWeight: 600,
                color: "#000",
                background: "linear-gradient(135deg, #04d9ff 0%, #028299 100%)",
                border: "none",
                borderRadius: 28,
                padding: "9px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                boxShadow: hov1 ? "0 0 24px rgba(4,217,255,0.65), 0 0 48px rgba(4,217,255,0.25)" : "0 2px 8px rgba(0,0,0,0.35)",
                transform: hov1 ? "scale(1.04)" : "scale(1)",
                transition: "box-shadow 0.3s ease, transform 0.2s ease",
              }}
            >
              Contact Us
              <Mail size={16} />
            </button>

            <button
              onMouseEnter={() => setHov2(true)}
              onMouseLeave={() => setHov2(false)}
              style={{
                fontFamily: NOHEMI,
                fontSize: 13,
                fontWeight: 600,
                color: hov2 ? "#04d9ff" : "rgba(255,255,255,0.75)",
                background: hov2 ? "rgba(4,217,255,0.06)" : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${hov2 ? "rgba(4,217,255,0.6)" : "rgba(255,255,255,0.2)"}`,
                borderRadius: 28,
                padding: "9px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                backdropFilter: "blur(10px)",
                transition: "color 0.3s ease, background 0.3s ease, border-color 0.3s ease",
              }}
            >
              Discover Our Subsidiary Network
              <ArrowUpRight size={16} />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.18, ease: EASE_EASE_OUT }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        >
          <div style={{ width: "min(clamp(120px, 22vh, 190px), 70%)", opacity: 0.58 }}>
            <EarthVisual />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Footer Section ────────────────────────── */

function FooterSection({ onHome }: { onHome?: () => void }) {
  return (
    <footer className="contact-footer-footer" style={{ background: "#010f12", position: "relative", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <img
          src={imgSoftSeerWatermark}
          alt=""
          style={{ width: "min(1000px, 110vw)", height: "auto", objectFit: "contain", opacity: 0.055, mixBlendMode: "screen" }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 200,
          background: "radial-gradient(ellipse, rgba(4,217,255,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(4,217,255,0.5), transparent)",
        }}
      />

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "clamp(8px, 2vh, 20px) clamp(20px, 4vw, 48px) 8px", position: "relative", zIndex: 1 }}>
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr]"
          style={{ gap: "clamp(12px, 1.5vw, 22px)", paddingBottom: 10, borderBottom: "1px solid #111827", marginBottom: 8 }}
        >
          <div>
            <div style={{ width: 116, height: 40, position: "relative", marginBottom: 6, cursor: onHome ? "pointer" : "default" }} onClick={onHome}>
              <div style={{ paddingTop: `${(68 / 202) * 100}%`, position: "relative" }}>
                <img
                  src={imgSoftSeer}
                  alt="SoftSeer"
                  style={{ position: "absolute", top: 0, height: "100%", left: "-5.5%", width: "105.55%", maxWidth: "none", objectFit: "contain" }}
                />
              </div>
            </div>
            <p style={{ fontFamily: INTER, fontWeight: 400, fontSize: 18, color: "#9ca3af", lineHeight: "29.25px", maxWidth: 260 }}>
              Looking into the Future Together
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: 16 }}>
            {[
              { heading: "Products", links: ["LERMS", "EQIS", "DUTYCOM"] },
              { heading: "Company", links: ["About", "Careers", "Contact", "Press"] },
              { heading: "Resources", links: ["Documentation", "API", "Blog", "Support"] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <p
                  style={{
                    fontFamily: INTER,
                    fontWeight: 600,
                    fontSize: 14,
                    color: "white",
                    textTransform: "uppercase",
                    letterSpacing: "0.7px",
                    marginBottom: 6,
                    lineHeight: "20px",
                  }}
                >
                  {heading}
                </p>
                {links.map((link) => (
                  <p
                    key={link}
                    style={{
                      fontFamily: INTER,
                      fontWeight: 400,
                      fontSize: 14,
                      color: "#9ca3af",
                      lineHeight: "20px",
                      marginBottom: 4,
                      cursor: "pointer",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#04d9ff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
                  >
                    {link}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontFamily: INTER, fontWeight: 400, fontSize: 14, color: "#6b7280", lineHeight: "20px" }}>
            © 2026 SOFTSEER. All rights reserved.
          </p>

          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }} aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 19.5 19.5" fill="none">
                <path d={svgContact.p253d70c0} fill="#A1A1AA" />
              </svg>
            </a>
            <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }} aria-label="YouTube">
              <svg width="21" height="17" viewBox="0 0 21 16.5" fill="none">
                <path d={svgContact.p16c47a00} fill="#A1A1AA" />
              </svg>
            </a>
            <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }} aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 19.5 19.5" fill="none">
                <path d={svgContact.p367c100} fill="#A1A1AA" />
              </svg>
            </a>
            <a href="#" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }} aria-label="Twitter">
              <svg width="20" height="18" viewBox="0 0 20.25 18" fill="none">
                <path d={svgContact.pbc0aa00} fill="#A1A1AA" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LowerSections() {
  const scrollToReachOut = () => {
    document.getElementById("section-reach-out")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div id="section-products">
        <ProductsSection />
      </div>
      <div id="section-team">
        <TeamCarousel />
      </div>
      <div id="section-reach-out" style={{ minHeight: "100svh", display: "flex", flexDirection: "column" }}>
        <GlobalFootprintSection onContact={scrollToReachOut} />
        <FooterSection />
      </div>
    </>
  );
}

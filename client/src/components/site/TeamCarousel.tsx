/* Design: Figma Team Directory — cyan glass tabs, portrait-led profile carousel, and a reachable lower directory. */
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, Building2, ChevronLeft, ChevronRight, Instagram, Linkedin, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { TEAM_CATEGORIES, type TeamCategoryId, teamMembersForCategory } from "@/data/team";

const NOHEMI = "'Nohemi', 'Plus Jakarta Sans', sans-serif";
const TEAM_TOPOLOGY = "/assets/18-452.webp";

const CATEGORY_ICONS = {
  directors: BriefcaseBusiness,
  "principal-staffs": UsersRound,
  stakeholders: Building2,
} as const;

function SocialLinks({ socials }: { socials: ReturnType<typeof teamMembersForCategory>[number]["socials"] }) {
  if (!socials.length) return null;

  return (
    <div className="flex items-center gap-3" aria-label="Social profiles">
      {socials.map((social) => {
        const Icon = social.platform === "linkedin" ? Linkedin : Instagram;
        return (
          <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-slate-300 transition hover:border-[#04d9ff] hover:bg-[#04d9ff]/10 hover:text-[#04d9ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#04d9ff]">
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}

export default function TeamCarousel() {
  const [category, setCategory] = useState<TeamCategoryId>("directors");
  const members = useMemo(() => teamMembersForCategory(category), [category]);
  const [selectedSlug, setSelectedSlug] = useState(members[0]?.slug ?? "");
  const selectedIndex = Math.max(0, members.findIndex((member) => member.slug === selectedSlug));
  const selected = members[selectedIndex] ?? members[0]!;

  useEffect(() => {
    setSelectedSlug(members[0]?.slug ?? "");
  }, [members]);

  const shiftMember = (direction: -1 | 1) => {
    if (members.length < 2) return;
    setSelectedSlug(members[(selectedIndex + direction + members.length) % members.length]!.slug);
  };

  return (
    <section className="team-directory-page relative isolate overflow-hidden bg-[#011418] px-4 pb-0 pt-24 text-white md:px-8 md:pt-28" aria-labelledby="team-heading">
      <img src={TEAM_TOPOLOGY} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 48% 70% at 52% 46%, rgba(4,217,255,0.09), transparent 72%), linear-gradient(180deg, rgba(1,20,24,0.28), rgba(1,20,24,0.9) 86%)" }} />

      <div className="team-directory-content relative mx-auto max-w-[1280px]">
        <header className="team-directory-header mx-auto max-w-[780px] text-center">
          <h2 id="team-heading" className="team-directory-title mt-3 text-[clamp(38px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.045em]" style={{ fontFamily: NOHEMI }}>
            <span className="text-white/85">Architecturing The</span><br />
            <span className="bg-gradient-to-r from-[#04f8ff] to-[#029599] bg-clip-text text-transparent">Future Of Tech</span>
          </h2>
          <p className="team-directory-description mx-auto mt-4 max-w-[570px] text-[16px] leading-[1.45] text-slate-400 md:text-[18px]" style={{ fontFamily: NOHEMI }}>
            Choose a category, then select a person below. Their profile changes in place while the directory remains within reach.
          </p>
        </header>

        <div className="team-directory-tabs mt-9 grid overflow-hidden rounded-[21px] border border-white/25 bg-black/10 shadow-[0_0_12px_rgba(4,217,255,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:grid-cols-3" role="tablist" aria-label="Team categories">
          {TEAM_CATEGORIES.map((item) => {
            const Icon = CATEGORY_ICONS[item.id];
            const active = item.id === category;
            return (
              <button key={item.id} type="button" role="tab" aria-selected={active} onClick={() => setCategory(item.id)} className={`team-directory-tab relative flex min-h-[82px] items-center justify-center gap-3 px-5 text-[18px] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#04d9ff] ${active ? "bg-[#04d9ff]/[0.06] text-white" : "border-t border-white/15 text-white/82 hover:bg-white/[0.03] md:border-l md:border-t-0"}`} style={{ fontFamily: NOHEMI }}>
                <Icon size={20} className="text-[#04f8ff]" aria-hidden="true" />
                {item.label}
                {active ? <motion.span layoutId="active-team-category" className="absolute bottom-0 h-1 w-[120px] rounded-t-full bg-[#04d9ff] shadow-[0_0_10px_rgba(4,217,255,0.9)]" /> : null}
              </button>
            );
          })}
        </div>

        <div className="team-directory-profile relative mt-8 min-h-[490px] md:mt-10 md:min-h-[430px]">
          <button type="button" onClick={() => shiftMember(-1)} aria-label="Previous team member" disabled={members.length < 2} className="absolute left-0 top-[42%] z-20 hidden h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#04d9ff] bg-[#011418]/80 text-[#04d9ff] shadow-[0_0_16px_rgba(4,217,255,0.24)] backdrop-blur-sm transition hover:scale-110 disabled:cursor-default disabled:opacity-35 md:flex"><ChevronLeft size={30} /></button>
          <button type="button" onClick={() => shiftMember(1)} aria-label="Next team member" disabled={members.length < 2} className="absolute right-0 top-[42%] z-20 hidden h-16 w-16 translate-x-1/2 items-center justify-center rounded-full border-2 border-[#04d9ff] bg-[#011418]/80 text-[#04d9ff] shadow-[0_0_16px_rgba(4,217,255,0.24)] backdrop-blur-sm transition hover:scale-110 disabled:cursor-default disabled:opacity-35 md:flex"><ChevronRight size={30} /></button>

          <AnimatePresence mode="wait">
            <motion.article key={selected.slug} className="team-directory-article grid min-h-[490px] items-center gap-7 pb-4 md:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.95fr)] md:gap-12 md:pb-0" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.36, ease: [0.23, 1, 0.32, 1] }}>
              <div className="team-directory-bio order-2 max-w-[560px] md:order-1 md:pl-16">
                <p className="team-directory-name text-[clamp(40px,4.2vw,64px)] font-semibold leading-none tracking-[-0.05em] text-white" style={{ fontFamily: NOHEMI }}>{selected.name}</p>
                <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.04em] text-[#04d9ff]" style={{ fontFamily: NOHEMI }}>{selected.role}</p>
                <p className="team-directory-summary mt-7 text-[15px] leading-[1.52] text-slate-400 md:text-[16px]" style={{ fontFamily: NOHEMI }}>{selected.summary}</p>
                <div className="team-directory-actions mt-7 flex flex-wrap items-center gap-4">
                  <SocialLinks socials={selected.socials} />
                  <a href={`/team/${selected.slug}`} className="rounded-full bg-[#04d9ff] px-6 py-3 text-[14px] font-semibold text-black shadow-[0_0_16px_rgba(4,217,255,0.95)] transition hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" style={{ fontFamily: NOHEMI }}>About {selected.name.split(" ")[0]}</a>
                  <div className="flex items-center gap-2 md:hidden">
                    <button type="button" onClick={() => shiftMember(-1)} aria-label="Previous team member" disabled={members.length < 2} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#04d9ff] text-[#04d9ff] disabled:opacity-35"><ChevronLeft size={20} /></button>
                    <button type="button" onClick={() => shiftMember(1)} aria-label="Next team member" disabled={members.length < 2} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#04d9ff] text-[#04d9ff] disabled:opacity-35"><ChevronRight size={20} /></button>
                  </div>
                </div>
              </div>

              <div className="team-directory-portrait relative order-1 flex min-h-[280px] items-end justify-center self-stretch overflow-hidden md:order-2 md:min-h-[430px]">
                <div className="pointer-events-none absolute bottom-[-35%] h-[110%] w-[80%] rounded-full bg-[#04d9ff]/10 blur-[82px]" />
                {selected.category === "stakeholders" ? <img src={selected.image} alt="" className="team-directory-portrait-image relative z-10 h-[210px] w-[210px] object-contain opacity-85 drop-shadow-[0_0_26px_rgba(4,217,255,0.75)] md:h-[360px] md:w-[360px]" /> : <img src={selected.image} alt={selected.name} className="team-directory-portrait-image relative z-10 h-[335px] max-w-full object-contain object-bottom drop-shadow-[0_0_9px_rgba(4,217,255,0.9)] md:h-[500px]" />}
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <div className="team-directory-member-strip relative mt-2 border-y border-white/10 bg-white/[0.08] shadow-[inset_0_0_24px_rgba(255,255,255,0.12)] backdrop-blur-xl">
        <div className="team-directory-member-list mx-auto flex max-w-[1280px] gap-3 overflow-x-auto px-5 py-5 md:gap-6 md:px-14">
          {members.map((member) => {
            const active = member.slug === selected.slug;
            return <button key={member.slug} type="button" onClick={() => setSelectedSlug(member.slug)} className={`min-w-[104px] text-center transition ${active ? "opacity-100" : "opacity-55 hover:opacity-85"}`} aria-current={active ? "true" : undefined}>
              <span className={`mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-2 ${active ? "border-[#04d9ff] shadow-[0_0_16px_rgba(4,217,255,0.55)]" : "border-white/20"}`}>
                <img src={member.thumbnail} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="mt-2 block whitespace-nowrap text-[12px] font-semibold text-white/90" style={{ fontFamily: NOHEMI }}>{member.name}</span>
              <span className="mt-0.5 block whitespace-nowrap text-[9px] font-medium text-slate-400" style={{ fontFamily: NOHEMI }}>{member.role}</span>
            </button>;
          })}
        </div>
      </div>
    </section>
  );
}

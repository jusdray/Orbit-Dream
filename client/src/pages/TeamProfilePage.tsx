/* Design: Figma Team Directory — an editorial dark profile page that extends the carousel’s cyan portrait system. */
import { ArrowLeft, Instagram, Linkedin } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "wouter";
import { teamMemberBySlug } from "@/data/team";

const NOHEMI = "'Nohemi', 'Plus Jakarta Sans', sans-serif";
const TEAM_TOPOLOGY = "/assets/18-452.webp";

export default function TeamProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const person = teamMemberBySlug(slug);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const navigationEntries = window.performance?.getEntriesByType?.("navigation");
    const isReload = navigationEntries && navigationEntries.length > 0
      ? (navigationEntries[0] as PerformanceNavigationTiming).type === "reload"
      : false;

    if (isReload) {
      window.location.replace("/");
    }
  }, []);

  if (!person) {
    return <main className="min-h-screen bg-[#011418] px-6 py-24 text-white"><a href="/#section-team" className="text-[#04d9ff] underline">Return to the team</a><h1 className="mt-8 text-4xl font-semibold" style={{ fontFamily: NOHEMI }}>Profile not found</h1></main>;
  }

  return (
    <main className="relative min-h-screen isolate overflow-hidden bg-[#011418] px-5 py-8 text-white md:px-10 md:py-12">
      <img src={TEAM_TOPOLOGY} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-screen" />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 62% at 74% 46%, rgba(4,217,255,0.13), transparent 66%), linear-gradient(180deg, rgba(1,20,24,0.24), #011418 78%)" }} />

      <div className="relative mx-auto max-w-[1220px]">
        <a
          href="/#section-team"
          onClick={(event) => {
            event.preventDefault();
            window.location.assign("/#section-team");
          }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/15 px-4 py-2 text-[13px] font-semibold text-white/85 transition hover:border-[#04d9ff] hover:text-[#04d9ff]"
          style={{ fontFamily: NOHEMI }}
        >
          <ArrowLeft size={16} /> Back to Team
        </a>
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[#04d9ff]" style={{ fontFamily: NOHEMI }}>{person.role}</p>
            <h1 className="mt-4 text-[clamp(50px,7vw,92px)] font-semibold leading-[0.94] tracking-[-0.06em] text-white" style={{ fontFamily: NOHEMI }}>{person.name}</h1>
            <p className="mt-8 max-w-[600px] text-[18px] leading-[1.58] text-slate-300" style={{ fontFamily: NOHEMI }}>{person.detail}</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {person.focus.map((focus) => <div key={focus} className="rounded-2xl border border-white/15 bg-white/[0.035] px-4 py-4 text-[13px] font-semibold text-white/85" style={{ fontFamily: NOHEMI }}>{focus}</div>)}
            </div>
            {person.socials.length ? <div className="mt-10 flex items-center gap-3">{person.socials.map((social) => { const Icon = social.platform === "linkedin" ? Linkedin : Instagram; return <a key={social.href} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-slate-300 transition hover:border-[#04d9ff] hover:bg-[#04d9ff]/10 hover:text-[#04d9ff]"><Icon size={19} /></a>; })}</div> : null}
          </div>

          <div className="relative flex min-h-[420px] items-end justify-center overflow-hidden rounded-[32px] border border-[#04d9ff]/30 bg-black/15 shadow-[0_0_55px_rgba(4,217,255,0.12)] md:min-h-[620px]">
            <div className="pointer-events-none absolute bottom-[-24%] h-[94%] w-[78%] rounded-full bg-[#04d9ff]/14 blur-[96px]" />
            {person.category === "stakeholders" ? <img src={person.image} alt="" className="relative z-10 h-[250px] w-[250px] object-contain drop-shadow-[0_0_30px_rgba(4,217,255,0.85)] md:h-[390px] md:w-[390px]" /> : <img src={person.image} alt={person.name} className="relative z-10 h-[430px] max-w-full object-contain object-bottom drop-shadow-[0_0_12px_rgba(4,217,255,0.85)] md:h-[680px]" />}
          </div>
        </div>
      </div>
    </main>
  );
}

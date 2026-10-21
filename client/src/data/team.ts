/* Design: Figma Team Directory — dark topology stage, cyan active states, and honest profile destinations. */

export type TeamCategoryId = "directors" | "principal-staffs" | "stakeholders";

export type TeamSocial = {
  platform: "linkedin" | "instagram";
  href: string;
  label: string;
};

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  category: TeamCategoryId;
  summary: string;
  detail: string;
  focus: string[];
  image: string;
  thumbnail: string;
  socials: TeamSocial[];
};

export const TEAM_CATEGORIES: Array<{ id: TeamCategoryId; label: string; description: string }> = [
  { id: "directors", label: "Directors", description: "Executive leadership and organisational direction." },
  { id: "principal-staffs", label: "Principal Staffs", description: "Operational leadership and delivery stewardship." },
  { id: "stakeholders", label: "Stakeholders", description: "The partner ecosystem that helps bring the future closer." },
];

const CATEGORY_DEFAULTS: Record<TeamCategoryId, string> = {
  directors: "emmanuel-fakoya",
  "principal-staffs": "opeyemi-fakoya",
  stakeholders: "softseer-partner-network",
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slug: "emmanuel-fakoya",
    name: "Emmanuel Fakoya",
    role: "Chief Executive Officer",
    category: "directors",
    summary: "Emmanuel leads SoftSeer’s long-term direction, keeping the company’s technology, product thinking, and client outcomes aligned around practical progress.",
    detail: "As Chief Executive Officer, Emmanuel Fakoya provides the leadership direction for SoftSeer. His profile reflects a focus on turning ambitious technology ideas into reliable, useful outcomes for the people and organisations SoftSeer serves.",
    focus: ["Company direction", "Technology strategy", "Client outcomes"],
    image: "/assets/18-507.webp",
    thumbnail: "/assets/18-512.webp",
    socials: [],
  },
  {
    slug: "folu-busari",
    name: "Folu Busari",
    role: "Director of Administration",
    category: "directors",
    summary: "Folu oversees the systems that make delivery dependable: team administration, decision records, and the internal practices that keep promises visible. She brings a detail-oriented management style to the work of turning policy into everyday consistency. His profile reflects an administrator whose value is felt through clarity, rhythm, and care.",
    detail: "Folu oversees the systems that make delivery dependable: team administration, decision records, and the internal practices that keep promises visible. She brings a detail-oriented management style to the work of turning policy into everyday consistency. His profile reflects an administrator whose value is felt through clarity, rhythm, and care.",
    focus: ["Team administration", "Delivery rhythm", "Decision records"],
    image: "/assets/18-516.webp",
    thumbnail: "/assets/18-516.webp",
    socials: [],
  },
  {
    slug: "omotosin-ogunmakin",
    name: "Omotosin Ogunmakin",
    role: "Director of Strategy",
    category: "directors",
    summary: "Omotosin shapes strategy with a focus on clear priorities, purposeful growth, and practical plans that keep enterprise delivery moving forward.",
    detail: "As Director of Strategy, Omotosin Ogunmakin helps connect SoftSeer’s ambition with its operational focus. His work centres on setting direction, creating alignment, and making room for sustained progress across the organisation.",
    focus: ["Business strategy", "Growth planning", "Operational alignment"],
    image: "/assets/18-520.webp",
    thumbnail: "/assets/18-520.webp",
    socials: [
      { platform: "linkedin", href: "https://ng.linkedin.com/in/omotosin-ogunmakin-56833a52", label: "Omotosin Ogunmakin on LinkedIn" },
    ],
  },
  {
    slug: "opeyemi-fakoya",
    name: "Opeyemi Fakoya",
    role: "General Manager",
    category: "principal-staffs",
    summary: "Opeyemi supports the operational rhythm of SoftSeer, helping teams stay connected to priorities, clients, and the everyday work that turns plans into progress.",
    detail: "As General Manager, Opeyemi Fakoya supports the day-to-day coordination that keeps SoftSeer responsive. Her profile reflects an emphasis on dependable delivery, clear communication, and the practical momentum behind the company’s work.",
    focus: ["Operational delivery", "Team coordination", "Client responsiveness"],
    image: "/assets/18-524.webp",
    thumbnail: "/assets/18-524.webp",
    socials: [
      { platform: "linkedin", href: "https://ng.linkedin.com/in/opeyemi-fakoya-902b06128", label: "Opeyemi Fakoya on LinkedIn" },
    ],
  },
  {
    slug: "softseer-partner-network",
    name: "SoftSeer Partner Network",
    role: "Stakeholder Ecosystem",
    category: "stakeholders",
    summary: "Our stakeholder ecosystem brings together clients, institutions, and delivery partners who help turn complex operational challenges into connected technology outcomes.",
    detail: "SoftSeer works alongside a growing network of institutional, technical, and client stakeholders. Their partnership makes it possible to connect expertise, context, and technology around the outcomes that matter most.",
    focus: ["Institutional partnerships", "Co-delivery", "Shared outcomes"],
    image: "/assets/softseer-logo.png",
    thumbnail: "/assets/softseer-logo.png",
    socials: [],
  },
];

export function teamMembersForCategory(category: TeamCategoryId) {
  const defaultSlug = CATEGORY_DEFAULTS[category];
  return TEAM_MEMBERS.filter((member) => member.category === category).sort((a, b) => {
    if (a.slug === defaultSlug) return -1;
    if (b.slug === defaultSlug) return 1;
    return 0;
  });
}

export function teamMemberBySlug(slug?: string) {
  return TEAM_MEMBERS.find((member) => member.slug === slug);
}

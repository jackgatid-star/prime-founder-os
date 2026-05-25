export type TeamId = "marketing" | "branding" | "product" | "sales" | "research";

export interface Team {
  id: TeamId;
  name: string;
  lead: string;
  mandate: string;
  accentVar: string;
}

export const teams: Team[] = [
  {
    id: "marketing",
    name: "Marketing",
    lead: "Atlas",
    mandate: "Demand, narrative, and launch motion.",
    accentVar: "var(--team-marketing)",
  },
  {
    id: "branding",
    name: "Branding",
    lead: "Iris",
    mandate: "Identity, voice, and visual conviction.",
    accentVar: "var(--team-branding)",
  },
  {
    id: "product",
    name: "Product",
    lead: "Helios",
    mandate: "Find the product. Sharpen the wedge.",
    accentVar: "var(--team-product)",
  },
  {
    id: "sales",
    name: "Sales",
    lead: "Nyx",
    mandate: "Pipeline, pricing, and first revenue.",
    accentVar: "var(--team-sales)",
  },
  {
    id: "research",
    name: "Research",
    lead: "Orion",
    mandate: "Market truth. Competitor maps. Signals.",
    accentVar: "var(--team-research)",
  },
];

export interface Plan {
  id: string;
  team: TeamId;
  name: string;
  phase: string;
  progress: number;
  steps: { title: string; status: "done" | "active" | "todo"; output?: string }[];
}

export const plans: Plan[] = [
  {
    id: "marketing-launch",
    team: "marketing",
    name: "Marketing Launch",
    phase: "Pre-launch",
    progress: 62,
    steps: [
      { title: "Positioning brief", status: "done", output: "positioning-v3.pdf" },
      { title: "Launch narrative", status: "done", output: "narrative.md" },
      { title: "Campaign structure", status: "active" },
      { title: "Asset production", status: "active" },
      { title: "Launch review", status: "todo" },
    ],
  },
  {
    id: "brand-identity",
    team: "branding",
    name: "Brand Identity Build",
    phase: "Foundation",
    progress: 80,
    steps: [
      { title: "Voice & tone", status: "done", output: "voice.md" },
      { title: "Visual system", status: "done", output: "system.pdf" },
      { title: "Mark exploration", status: "done" },
      { title: "Application guidelines", status: "active" },
    ],
  },
  {
    id: "sales-foundation",
    team: "sales",
    name: "Sales Foundation",
    phase: "Build",
    progress: 35,
    steps: [
      { title: "ICP definition", status: "done" },
      { title: "Pricing architecture", status: "active" },
      { title: "Outbound sequence", status: "todo" },
      { title: "Pipeline review", status: "todo" },
    ],
  },
  {
    id: "research-sprint",
    team: "research",
    name: "Research Sprint",
    phase: "Active",
    progress: 50,
    steps: [
      { title: "Competitor map", status: "done", output: "map.pdf" },
      { title: "Customer interviews", status: "active" },
      { title: "Signal synthesis", status: "todo" },
    ],
  },
  {
    id: "product-wedge",
    team: "product",
    name: "Product Wedge",
    phase: "Sharpening",
    progress: 45,
    steps: [
      { title: "Problem statement", status: "done" },
      { title: "Wedge hypothesis", status: "done" },
      { title: "Prototype loop", status: "active" },
      { title: "Validation cohort", status: "todo" },
    ],
  },
];

export interface Resource {
  id: string;
  title: string;
  type: "Document" | "Video" | "Image" | "Brand" | "Strategy" | "Generated";
  team?: TeamId;
  updated: string;
}

export const resources: Resource[] = [
  { id: "1", title: "Positioning brief — v3", type: "Strategy", team: "marketing", updated: "2d ago" },
  { id: "2", title: "Brand voice guide", type: "Brand", team: "branding", updated: "4d ago" },
  { id: "3", title: "Launch narrative", type: "Document", team: "marketing", updated: "1d ago" },
  { id: "4", title: "Competitor landscape", type: "Strategy", team: "research", updated: "6h ago" },
  { id: "5", title: "Hero film — cut 02", type: "Video", team: "marketing", updated: "12h ago" },
  { id: "6", title: "Identity system PDF", type: "Brand", team: "branding", updated: "3d ago" },
  { id: "7", title: "ICP one-pager", type: "Document", team: "sales", updated: "5d ago" },
  { id: "8", title: "Product wedge map", type: "Generated", team: "product", updated: "9h ago" },
  { id: "9", title: "Cover stills", type: "Image", team: "branding", updated: "1w ago" },
  { id: "10", title: "Pricing architecture", type: "Strategy", team: "sales", updated: "2d ago" },
];

export interface Task {
  id: string;
  title: string;
  team: TeamId;
  plan: string;
  status: "active" | "in_progress" | "waiting" | "done";
}

export const tasks: Task[] = [
  { id: "t1", title: "Approve launch narrative v2", team: "marketing", plan: "Marketing Launch", status: "waiting" },
  { id: "t2", title: "Review brand application guide", team: "branding", plan: "Brand Identity Build", status: "waiting" },
  { id: "t3", title: "Finalize pricing tiers", team: "sales", plan: "Sales Foundation", status: "in_progress" },
  { id: "t4", title: "Interview customer cohort #2", team: "research", plan: "Research Sprint", status: "in_progress" },
  { id: "t5", title: "Draft campaign structure", team: "marketing", plan: "Marketing Launch", status: "active" },
  { id: "t6", title: "Prototype loop iteration 3", team: "product", plan: "Product Wedge", status: "active" },
  { id: "t7", title: "Voice & tone document", team: "branding", plan: "Brand Identity Build", status: "done" },
  { id: "t8", title: "Competitor map publish", team: "research", plan: "Research Sprint", status: "done" },
  { id: "t9", title: "ICP definition", team: "sales", plan: "Sales Foundation", status: "done" },
];

export const teamById = (id: string) => teams.find((t) => t.id === id);
export const planById = (id: string) => plans.find((p) => p.id === id);

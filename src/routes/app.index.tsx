import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUp,
  Paperclip,
  Users,
  Library,
  LayoutDashboard,
  CheckSquare,
  ArrowUpRight,
  CircleDot,
} from "lucide-react";
import { Orb } from "@/components/orb";
import { teams, tasks, resources } from "@/lib/mock/data";

export const Route = createFileRoute("/app/")({
  component: Home,
});

const suggestions = [
  "Where should I focus this week?",
  "Draft a launch narrative",
  "Map the competitive landscape",
  "Sharpen the product wedge",
];

function Home() {
  const [input, setInput] = useState("");

  const activeTasks = tasks.filter((t) => t.status === "active" || t.status === "in_progress").length;
  const reviewTasks = tasks.filter((t) => t.status === "waiting").length;
  const recentOutputs = resources.length;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="relative mx-auto max-w-6xl px-6 md:px-10 pt-12 pb-20">
        {/* Greeting */}
        <div className="text-center mb-10 animate-fade-up">
          <p className="text-eyebrow mb-3">Founder OS — Active Chamber</p>
          <h1 className="text-display text-3xl md:text-4xl text-foreground/95 text-balance">
            Welcome back, Eli.
          </h1>
          <p className="mt-2 text-[14px] text-muted-foreground">
            The Orb is listening. Move from idea to market in one place.
          </p>
        </div>

        {/* Central Orb chamber */}
        <div className="relative">
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--orb-glow), transparent)",
              filter: "blur(0.5px)",
              opacity: 0.5,
            }}
          />
          <div className="relative grid place-items-center py-6 animate-fade-in">
            <Orb size={220} intensity="strong" />
          </div>
        </div>

        {/* Command layer */}
        <div className="mx-auto max-w-2xl -mt-2 animate-fade-up">
          <div
            className="glass rounded-2xl p-2.5 flex items-end gap-2 focus-within:ring-1 transition-shadow shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]"
            style={{ ["--tw-ring-color" as never]: "var(--orb)" }}
          >
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Attach"
              type="button"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the Orb what to build next…"
              rows={1}
              className="flex-1 bg-transparent outline-none resize-none py-2 text-[15px] placeholder:text-muted-foreground/60 max-h-40"
            />
            <button
              disabled={!input.trim()}
              className="p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: input.trim() ? "var(--orb)" : "transparent",
                color: input.trim() ? "var(--background)" : "var(--muted-foreground)",
              }}
              aria-label="Execute"
              type="button"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setInput(s)}
                className="px-3 py-1.5 rounded-full text-[12px] border border-border text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quick access modules */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          <ModuleTile
            to="/app/teams"
            icon={Users}
            label="AI Teams"
            meta={`${teams.length} active`}
          />
          <ModuleTile
            to="/app/dashboard"
            icon={LayoutDashboard}
            label="Dashboard"
            meta="Pre-launch phase"
          />
          <ModuleTile
            to="/app/tasks"
            icon={CheckSquare}
            label="Tasks"
            meta={`${activeTasks} active · ${reviewTasks} review`}
          />
          <ModuleTile
            to="/app/resources"
            icon={Library}
            label="Resources"
            meta={`${recentOutputs} outputs`}
          />
        </div>

        {/* Teams ribbon */}
        <div className="mt-12">
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <p className="text-eyebrow mb-1">AI Teams</p>
              <h2 className="text-display text-xl">Your operating units</h2>
            </div>
            <Link
              to="/app/teams"
              className="text-[12px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              Open all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {teams.map((t) => (
              <Link
                key={t.id}
                to="/app/teams/$teamId"
                params={{ teamId: t.id }}
                className="group relative rounded-xl p-4 overflow-hidden transition-colors hover:bg-surface-elevated"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--hairline)",
                }}
              >
                <div
                  className="absolute inset-x-0 top-0 h-px opacity-80"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${t.accentVar}, transparent)`,
                  }}
                />
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: t.accentVar,
                      boxShadow: `0 0 10px -1px ${t.accentVar}`,
                    }}
                  />
                  <p className="text-[13px] text-foreground/90">{t.name}</p>
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground uppercase tracking-widest">
                  Lead
                </p>
                <p className="text-[14px] text-foreground/95">{t.lead}</p>
                <p className="mt-3 text-[12px] text-muted-foreground leading-snug line-clamp-2">
                  {t.mandate}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Signal row */}
        <div className="mt-12 grid md:grid-cols-2 gap-3">
          <div
            className="rounded-xl p-5"
            style={{ background: "var(--surface)", border: "1px solid var(--hairline)" }}
          >
            <p className="text-eyebrow mb-3">Next action</p>
            <p className="text-[15px] text-foreground/95">
              Approve the launch narrative v2 from Atlas.
            </p>
            <Link
              to="/app/tasks"
              className="mt-4 inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground"
            >
              Open tasks <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div
            className="rounded-xl p-5"
            style={{ background: "var(--surface)", border: "1px solid var(--hairline)" }}
          >
            <p className="text-eyebrow mb-3">Recent signal</p>
            <ul className="space-y-2.5">
              <SignalRow color="var(--team-research)" text="Competitor map published" />
              <SignalRow color="var(--team-marketing)" text="Launch narrative draft ready" />
              <SignalRow color="var(--team-branding)" text="Voice & tone finalized" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleTile({
  to,
  icon: Icon,
  label,
  meta,
}: {
  to: string;
  icon: typeof Users;
  label: string;
  meta: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl p-4 transition-all hover:bg-surface-elevated"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--hairline)",
      }}
    >
      <div className="flex items-center justify-between">
        <div
          className="h-8 w-8 rounded-lg grid place-items-center"
          style={{ background: "var(--surface-elevated)" }}
        >
          <Icon className="h-4 w-4 text-foreground/80" />
        </div>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-foreground transition-colors" />
      </div>
      <p className="mt-4 text-[14px] text-foreground/95">{label}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{meta}</p>
    </Link>
  );
}

function SignalRow({ color, text }: { color: string; text: string }) {
  return (
    <li className="flex items-center gap-2.5 text-[13px] text-foreground/85">
      <CircleDot className="h-3 w-3 shrink-0" style={{ color }} />
      <span className="flex-1 truncate">{text}</span>
    </li>
  );
}

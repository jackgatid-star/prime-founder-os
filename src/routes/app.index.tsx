import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUp,
  Paperclip,
  Users,
  Library,
  LayoutDashboard,
  CheckSquare,
  ArrowUpRight,
} from "lucide-react";
import { Orb } from "@/components/orb";
import { teams, tasks, resources, plans } from "@/lib/mock/data";

export const Route = createFileRoute("/app/")({
  component: Home,
});

const suggestions = [
  "Where should I focus this week?",
  "Draft the launch narrative",
  "Sharpen the product wedge",
];

function Home() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const activeTasks = tasks.filter((t) => t.status === "active" || t.status === "in_progress").length;
  const reviewTasks = tasks.filter((t) => t.status === "waiting").length;
  const activePlan = plans.find((p) => p.id === "marketing-launch")!;

  return (
    <div className="flex-1 min-h-0 relative overflow-hidden">
      {/* ===== CHAMBER ENVIRONMENT ===== */}
      <Chamber />

      {/* ===== SPATIAL UI ===== */}
      <div className="relative h-full w-full grid grid-cols-12 gap-4 px-4 md:px-6 pt-6 pb-4">
        {/* LEFT — Mentor / Active Working Layer */}
        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <Panel className="flex-1 min-h-0 flex flex-col animate-fade-up">
            <PanelHeader eyebrow="Mentor Layer" title="Orb — primary mentor" />
            <div className="flex-1 min-h-0 px-5 pt-2 pb-4 flex flex-col gap-3 overflow-hidden">
              <Whisper from="orb" text="Welcome back, Eli. Atlas left a launch narrative for your review — it's the highest-leverage move today." />
              <Whisper from="you" text="Open it." />
              <Whisper from="orb" text="Opening narrative-v2 in the Marketing chamber." muted />
            </div>
            <div className="px-3 pb-3">
              <button
                onClick={() => navigate({ to: "/app/teams/$teamId", params: { teamId: "marketing" } })}
                className="w-full text-left px-3 py-2.5 rounded-lg text-[12px] text-foreground/85 hover:bg-surface-elevated transition-colors flex items-center justify-between"
                style={{ border: "1px solid var(--hairline)" }}
              >
                <span>Enter Marketing chamber</span>
                <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
              </button>
            </div>
          </Panel>
        </div>

        {/* CENTER — The Orb */}
        <div className="col-span-12 lg:col-span-4 relative flex flex-col items-center justify-start pt-2">
          <div className="text-center animate-fade-in">
            <p className="text-eyebrow">Founder OS — Chamber</p>
            <h1 className="text-display text-[22px] mt-1 text-foreground/95">
              The Orb is listening.
            </h1>
          </div>

          {/* Orb floating */}
          <div className="relative mt-4 grid place-items-center">
            <Orb size={230} intensity="strong" />
            {/* Floor opening / well — sits under the orb */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: -90,
                width: 320,
                height: 110,
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse at center, oklch(0 0 0) 0%, oklch(0 0 0 / 0.6) 55%, transparent 75%)",
                boxShadow:
                  "inset 0 12px 30px oklch(0 0 0 / 0.9), 0 0 60px -10px var(--orb-glow)",
              }}
            />
          </div>

          {/* Command input — floats above the well */}
          <div className="relative w-full max-w-md mt-24 animate-fade-up">
            <div
              className="glass rounded-2xl p-2 flex items-end gap-1.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
              style={{
                boxShadow:
                  "0 0 0 1px var(--hairline), 0 30px 80px -30px rgba(0,0,0,0.9), 0 0 60px -20px var(--orb-glow)",
              }}
            >
              <button
                className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Attach"
                type="button"
              >
                <Paperclip className="h-3.5 w-3.5" />
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Speak to the Orb…"
                rows={1}
                className="flex-1 bg-transparent outline-none resize-none py-1.5 text-[13px] placeholder:text-muted-foreground/60 max-h-24"
              />
              <button
                disabled={!input.trim()}
                className="p-1.5 rounded-md transition-all disabled:opacity-30"
                style={{
                  background: input.trim() ? "var(--orb)" : "transparent",
                  color: input.trim() ? "var(--background)" : "var(--muted-foreground)",
                }}
                aria-label="Execute"
                type="button"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap justify-center gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="px-2.5 py-1 rounded-full text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                  style={{ border: "1px solid var(--hairline)" }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Stacked operational panels */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
          {/* AI Teams */}
          <Panel to="/app/teams" className="animate-fade-up" delay={60}>
            <PanelHeader eyebrow="Operating Units" title="AI Teams" icon={Users} count={`${teams.length}`} />
            <div className="px-4 pb-4 pt-1">
              <ul className="space-y-1.5">
                {teams.slice(0, 5).map((t) => (
                  <li key={t.id} className="flex items-center gap-2.5 text-[12px]">
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: t.accentVar, boxShadow: `0 0 8px ${t.accentVar}` }}
                    />
                    <span className="text-foreground/85 w-20 shrink-0">{t.name}</span>
                    <span className="text-muted-foreground/70 truncate flex-1">{t.lead}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>

          {/* Resources */}
          <Panel to="/app/resources" className="animate-fade-up" delay={120}>
            <PanelHeader eyebrow="Library" title="Resources" icon={Library} count={`${resources.length}`} />
            <div className="px-4 pb-4 pt-1 grid grid-cols-5 gap-1.5">
              {teams.map((t) => (
                <div
                  key={t.id}
                  className="aspect-square rounded-md grid place-items-end p-1.5"
                  style={{
                    background: `radial-gradient(ellipse at 50% 120%, ${t.accentVar}, transparent 70%), var(--surface-elevated)`,
                    border: "1px solid var(--hairline)",
                  }}
                >
                  <span className="text-[9px] text-foreground/70 uppercase tracking-wider">
                    {t.name.slice(0, 3)}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Dashboard + Tasks split */}
          <div className="grid grid-cols-2 gap-3">
            <Panel to="/app/dashboard" className="animate-fade-up" delay={180}>
              <PanelHeader eyebrow="Phase" title="Pre-launch" icon={LayoutDashboard} compact />
              <div className="px-4 pb-3">
                <ProgressBar value={activePlan.progress} />
                <p className="mt-2 text-[11px] text-muted-foreground">{activePlan.name}</p>
              </div>
            </Panel>
            <Panel to="/app/tasks" className="animate-fade-up" delay={220}>
              <PanelHeader eyebrow="Mission" title="Tasks" icon={CheckSquare} compact />
              <div className="px-4 pb-3 flex items-baseline gap-3">
                <div>
                  <p className="text-display text-xl text-foreground/95 tabular-nums">{activeTasks}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active</p>
                </div>
                <div>
                  <p className="text-display text-xl text-foreground/95 tabular-nums">{reviewTasks}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Review</p>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>

      {/* ===== HORIZON STATUS STRIP ===== */}
      <div className="absolute bottom-0 inset-x-0 h-10 flex items-center justify-between px-6 text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60 pointer-events-none">
        <span>Founder OS · Chamber online</span>
        <span className="flex items-center gap-2">
          <span className="h-1 w-1 rounded-full" style={{ background: "var(--orb)", boxShadow: "0 0 6px var(--orb)" }} />
          All systems calm
        </span>
        <span>Phase · Pre-launch</span>
      </div>
    </div>
  );
}

/* ============= Chamber environment ============= */
function Chamber() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Overhead light */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-40"
        style={{
          width: 900,
          height: 500,
          background: "radial-gradient(ellipse at 50% 100%, oklch(0.5 0.05 230 / 0.18), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      {/* Horizon line */}
      <div
        className="absolute inset-x-0"
        style={{
          bottom: "32%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--orb), transparent)",
          opacity: 0.55,
          filter: "blur(0.5px) drop-shadow(0 0 12px var(--orb))",
        }}
      />
      {/* Reflective floor */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "32%",
          background:
            "linear-gradient(180deg, oklch(0.09 0.005 240) 0%, oklch(0.06 0.005 240) 40%, oklch(0.04 0.003 240) 100%)",
          boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.04)",
        }}
      />
      {/* Floor reflection of orb */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: "10%",
          width: 240,
          height: 80,
          background:
            "radial-gradient(ellipse at center, var(--orb-glow), transparent 70%)",
          filter: "blur(20px)",
          opacity: 0.5,
        }}
      />
      {/* Edge floor light strips */}
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "31.5%",
          height: 2,
          background:
            "linear-gradient(90deg, var(--orb-glow) 0%, transparent 18%, transparent 82%, var(--orb-glow) 100%)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
}

/* ============= Panel primitives ============= */
function Panel({
  children,
  className = "",
  to,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  to?: string;
  delay?: number;
}) {
  const style: React.CSSProperties = {
    background:
      "linear-gradient(180deg, oklch(0.16 0.006 240 / 0.8) 0%, oklch(0.12 0.005 240 / 0.7) 100%)",
    border: "1px solid var(--hairline)",
    backdropFilter: "blur(20px) saturate(140%)",
    WebkitBackdropFilter: "blur(20px) saturate(140%)",
    boxShadow:
      "inset 0 1px 0 oklch(1 0 0 / 0.04), 0 30px 60px -30px oklch(0 0 0 / 0.8)",
    animationDelay: `${delay}ms`,
  };

  const inner = (
    <div className="relative h-full rounded-2xl overflow-hidden">
      {/* Luminous top edge */}
      <div
        className="absolute inset-x-6 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.25), transparent)",
        }}
      />
      {/* Cyan side-glow */}
      <div
        className="absolute left-0 top-1/3 bottom-1/3 w-px"
        style={{ background: "var(--orb)", filter: "blur(0.5px) drop-shadow(0 0 6px var(--orb))", opacity: 0.4 }}
      />
      {children}
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`group block rounded-2xl transition-transform hover:-translate-y-px ${className}`}
        style={style}
      >
        {inner}
      </Link>
    );
  }
  return (
    <div className={`rounded-2xl ${className}`} style={style}>
      {inner}
    </div>
  );
}

function PanelHeader({
  eyebrow,
  title,
  icon: Icon,
  count,
  compact,
}: {
  eyebrow: string;
  title: string;
  icon?: typeof Users;
  count?: string;
  compact?: boolean;
}) {
  return (
    <div className={`flex items-center justify-between ${compact ? "px-4 pt-3 pb-1" : "px-5 pt-4 pb-2"}`}>
      <div className="min-w-0">
        <p className="text-eyebrow" style={{ fontSize: "0.62rem" }}>{eyebrow}</p>
        <p className="text-[13px] text-foreground/95 mt-0.5 truncate">{title}</p>
      </div>
      <div className="flex items-center gap-2">
        {count && (
          <span className="text-[11px] text-muted-foreground tabular-nums">{count}</span>
        )}
        {Icon && (
          <div
            className="h-7 w-7 rounded-md grid place-items-center"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--hairline)" }}
          >
            <Icon className="h-3.5 w-3.5 text-foreground/75" />
          </div>
        )}
      </div>
    </div>
  );
}

function Whisper({ from, text, muted }: { from: "orb" | "you"; text: string; muted?: boolean }) {
  const isOrb = from === "orb";
  return (
    <div className={`flex gap-2.5 ${isOrb ? "" : "flex-row-reverse"}`}>
      {isOrb && (
        <div
          className="h-5 w-5 rounded-full shrink-0 mt-0.5"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, oklch(0.55 0.15 230), oklch(0.1 0.005 240) 70%)",
            boxShadow: "0 0 12px var(--orb-glow)",
          }}
        />
      )}
      <p
        className={`text-[12.5px] leading-relaxed max-w-[85%] ${
          muted ? "text-muted-foreground/70 italic" : "text-foreground/85"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="h-1 w-full rounded-full overflow-hidden"
      style={{ background: "var(--surface-elevated)" }}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${value}%`,
          background: "linear-gradient(90deg, var(--orb), oklch(0.88 0.08 220))",
          boxShadow: "0 0 8px var(--orb-glow)",
        }}
      />
    </div>
  );
}

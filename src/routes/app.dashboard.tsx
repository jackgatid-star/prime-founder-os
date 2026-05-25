import { createFileRoute, Link } from "@tanstack/react-router";
import { teams, plans, tasks, resources, teamById } from "@/lib/mock/data";
import { ArrowUpRight, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const active = tasks.filter((t) => t.status !== "done").length;
  const completed = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12">
        <div className="mb-12">
          <p className="text-eyebrow mb-3">Dashboard</p>
          <h1 className="text-display text-4xl">Calm visibility into the build.</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mb-8">
          <div className="glass rounded-2xl p-6">
            <p className="text-eyebrow mb-3">Current phase</p>
            <p className="text-display text-2xl">Pre-launch</p>
            <p className="mt-2 text-sm text-muted-foreground">Marketing & brand converging.</p>
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-eyebrow mb-3">Momentum</p>
            <div className="flex items-end gap-3">
              <p className="text-display text-2xl">+18%</p>
              <TrendingUp className="h-4 w-4 mb-1.5" style={{ color: "var(--orb)" }} />
            </div>
            <Sparkline className="mt-3" />
          </div>
          <div className="glass rounded-2xl p-6">
            <p className="text-eyebrow mb-3">Tasks</p>
            <p className="text-display text-2xl">
              {active} <span className="text-muted-foreground/60">/ {active + completed}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{completed} completed this cycle.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_380px] gap-3">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-eyebrow">Team activity</p>
              <Link to="/app/teams" className="text-[12px] text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                All teams <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {teams.map((t) => {
                const tp = plans.filter((p) => p.team === t.id);
                const avg = tp.length ? Math.round(tp.reduce((a, b) => a + b.progress, 0) / tp.length) : 0;
                return (
                  <Link
                    key={t.id}
                    to="/app/teams/$teamId"
                    params={{ teamId: t.id }}
                    className="flex items-center gap-4 py-2 group"
                  >
                    <span
                      className="h-2 w-2 rounded-full shrink-0"
                      style={{ background: t.accentVar }}
                    />
                    <div className="w-28 text-[13px] text-foreground">{t.name}</div>
                    <div className="flex-1 h-1 rounded-full bg-hairline overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${avg}%`, background: t.accentVar }}
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground w-10 text-right">{avg}%</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <div className="glass rounded-2xl p-6">
              <p className="text-eyebrow mb-4">Next action</p>
              <p className="text-[14px] text-foreground leading-snug">
                Approve the launch narrative v2 from Atlas.
              </p>
              <Link
                to="/app/tasks"
                className="mt-5 inline-flex items-center gap-1.5 text-[12px] text-foreground hover:opacity-80"
                style={{ color: "var(--orb)" }}
              >
                Open tasks <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="text-eyebrow mb-4">Recent outputs</p>
              <ul className="space-y-3">
                {resources.slice(0, 4).map((r) => {
                  const team = r.team ? teamById(r.team) : undefined;
                  return (
                    <li key={r.id} className="flex items-center gap-2.5 text-[13px]">
                      <span
                        className="h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: team?.accentVar ?? "var(--muted-foreground)" }}
                      />
                      <span className="flex-1 truncate text-foreground/90">{r.title}</span>
                      <span className="text-[11px] text-muted-foreground">{r.updated}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkline({ className }: { className?: string }) {
  const pts = [8, 10, 9, 13, 12, 16, 15, 18, 22, 20, 26, 28];
  const max = Math.max(...pts);
  const w = 200;
  const h = 36;
  const step = w / (pts.length - 1);
  const path = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step} ${h - (p / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" width="100%" height={h}>
      <path d={path} fill="none" stroke="var(--orb)" strokeWidth="1.5" />
    </svg>
  );
}

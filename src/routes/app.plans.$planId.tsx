import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { planById, teamById } from "@/lib/mock/data";
import { Check, Circle, Loader2, FileText, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/app/plans/$planId")({
  loader: ({ params }) => {
    const plan = planById(params.planId);
    if (!plan) throw notFound();
    return { plan, team: teamById(plan.team)! };
  },
  component: PlanDetail,
  notFoundComponent: () => <div className="p-10 text-muted-foreground">Plan not found.</div>,
});

function PlanDetail() {
  const { plan, team } = Route.useLoaderData();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-4xl px-6 md:px-10 py-12">
        <Link
          to="/app/plans"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All plans
        </Link>

        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <p className="text-eyebrow mb-2" style={{ color: team.accentVar }}>
              {team.name} · {plan.phase}
            </p>
            <h1 className="text-display text-4xl">{plan.name}</h1>
          </div>
          <div className="text-right">
            <p className="text-display text-3xl">{plan.progress}%</p>
            <p className="text-[11px] text-muted-foreground">complete</p>
          </div>
        </div>

        <div className="h-1 rounded-full bg-hairline overflow-hidden mb-12">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${plan.progress}%`, background: team.accentVar }}
          />
        </div>

        <div className="grid md:grid-cols-[1fr_240px] gap-8">
          <div className="space-y-2">
            <p className="text-eyebrow mb-4">Steps</p>
            {plan.steps.map((s, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 flex items-start gap-4"
              >
                <div className="mt-0.5">
                  {s.status === "done" && (
                    <div
                      className="h-5 w-5 rounded-full grid place-items-center"
                      style={{ background: team.accentVar }}
                    >
                      <Check className="h-3 w-3 text-background" />
                    </div>
                  )}
                  {s.status === "active" && (
                    <Loader2
                      className="h-5 w-5 animate-spin"
                      style={{ color: team.accentVar }}
                    />
                  )}
                  {s.status === "todo" && <Circle className="h-5 w-5 text-muted-foreground/50" />}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] text-foreground">{s.title}</p>
                  {s.output && (
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <FileText className="h-3 w-3" />
                      {s.output}
                    </div>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest">
                  {s.status}
                </p>
              </div>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="glass rounded-xl p-4">
              <p className="text-eyebrow mb-3">Checkpoints</p>
              <ul className="space-y-2 text-[13px]">
                <li className="flex justify-between"><span>Strategy</span><span className="text-muted-foreground">Approved</span></li>
                <li className="flex justify-between"><span>Assets</span><span className="text-muted-foreground">In review</span></li>
                <li className="flex justify-between"><span>Launch</span><span className="text-muted-foreground">Pending</span></li>
              </ul>
            </div>
            <Link
              to="/app/teams/$teamId"
              params={{ teamId: team.id }}
              className="block glass rounded-xl p-4 hover:bg-surface-elevated transition-colors"
            >
              <p className="text-eyebrow mb-1.5" style={{ color: team.accentVar }}>Led by</p>
              <p className="text-[14px]">{team.lead}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{team.name} Team</p>
            </Link>
          </aside>
        </div>
      </div>
    </div>
  );
}

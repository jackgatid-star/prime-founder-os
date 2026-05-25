import { createFileRoute, Link } from "@tanstack/react-router";
import { plans, teams, teamById } from "@/lib/mock/data";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/app/plans/")({
  component: PlansIndex,
});

function PlansIndex() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-5xl px-6 md:px-10 py-12">
        <div className="mb-10">
          <p className="text-eyebrow mb-3">Plans</p>
          <h1 className="text-display text-4xl">Structured execution across every team.</h1>
        </div>

        <div className="space-y-10">
          {teams.map((team) => {
            const teamPlans = plans.filter((p) => p.team === team.id);
            if (teamPlans.length === 0) return null;
            return (
              <section key={team.id}>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: team.accentVar }}
                  />
                  <p className="text-eyebrow" style={{ color: team.accentVar }}>
                    {team.name}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {teamPlans.map((p) => (
                    <Link
                      key={p.id}
                      to="/app/plans/$planId"
                      params={{ planId: p.id }}
                      className="group glass rounded-xl p-5 hover:bg-surface-elevated transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[15px] text-foreground">{p.name}</h3>
                          <p className="text-[12px] text-muted-foreground mt-0.5">{p.phase}</p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
                      </div>
                      <div className="mt-5 h-1 rounded-full bg-hairline overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${p.progress}%`, background: teamById(p.team)!.accentVar }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
                        <span>{p.steps.filter((s) => s.status === "done").length}/{p.steps.length} steps</span>
                        <span>{p.progress}%</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { teams } from "@/lib/mock/data";

export const Route = createFileRoute("/app/teams/")({
  component: TeamsIndex,
});

function TeamsIndex() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12">
        <div className="mb-12">
          <p className="text-eyebrow mb-3">AI Teams</p>
          <h1 className="text-display text-4xl text-balance">
            Functional teams that build the company with you.
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Each team is led by a dedicated operator. They guide you through structured plans —
            not random chatting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {teams.map((team) => (
            <Link
              key={team.id}
              to="/app/teams/$teamId"
              params={{ teamId: team.id }}
              className="group relative glass rounded-2xl p-6 hover:bg-surface-elevated transition-colors"
            >
              <div
                className="absolute top-6 right-6 h-2 w-2 rounded-full"
                style={{ background: team.accentVar, boxShadow: `0 0 16px ${team.accentVar}` }}
              />
              <p
                className="text-eyebrow mb-3"
                style={{ color: team.accentVar }}
              >
                {team.name} Team
              </p>
              <h3 className="text-display text-2xl">{team.lead}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{team.mandate}</p>
              <div className="mt-8 flex items-center justify-between text-[12px] text-muted-foreground">
                <span>Enter team</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

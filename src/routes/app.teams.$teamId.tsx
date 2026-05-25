import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChatPanel } from "@/components/chat-panel";
import { teamById, plans } from "@/lib/mock/data";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/teams/$teamId")({
  loader: ({ params }) => {
    const team = teamById(params.teamId);
    if (!team) throw notFound();
    return { team };
  },
  component: TeamDetail,
  notFoundComponent: () => (
    <div className="p-10 text-muted-foreground">Team not found.</div>
  ),
});

function TeamDetail() {
  const { team } = Route.useLoaderData();
  const teamPlans = plans.filter((p) => p.team === team.id);

  return (
    <div className="flex-1 grid lg:grid-cols-[1fr_360px] min-h-0">
      <div className="flex flex-col min-h-0 border-r border-hairline">
        <div className="px-6 md:px-10 pt-10">
          <p className="text-eyebrow mb-2" style={{ color: team.accentVar }}>
            {team.name} Team
          </p>
          <h1 className="text-display text-3xl">{team.lead}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{team.mandate}</p>
        </div>
        <div className="flex-1 min-h-0 mt-4">
          <ChatPanel
            agentName={team.lead}
            accent={team.accentVar}
            placeholder={`Brief ${team.lead} on the next move…`}
            initialMessages={[
              {
                id: "w",
                role: "agent",
                content: `I lead the ${team.name.toLowerCase()} function inside Founder OS. Share where we are, and I'll align the plan and outputs.`,
              },
            ]}
          />
        </div>
      </div>

      <aside className="overflow-y-auto p-6 md:p-8 space-y-3 bg-sidebar/40">
        <p className="text-eyebrow mb-2">Active plans</p>
        {teamPlans.length === 0 && (
          <p className="text-sm text-muted-foreground">No plans yet for this team.</p>
        )}
        {teamPlans.map((p) => (
          <Link
            key={p.id}
            to="/app/plans/$planId"
            params={{ planId: p.id }}
            className="group block glass rounded-xl p-4 hover:bg-surface-elevated transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[14px] text-foreground">{p.name}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">{p.phase}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
            <div className="mt-4 h-1 rounded-full bg-hairline overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${p.progress}%`, background: team.accentVar }}
              />
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">{p.progress}% complete</p>
          </Link>
        ))}
      </aside>
    </div>
  );
}

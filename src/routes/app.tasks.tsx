import { createFileRoute } from "@tanstack/react-router";
import { tasks, teamById } from "@/lib/mock/data";

export const Route = createFileRoute("/app/tasks")({
  component: TasksPage,
});

const columns = [
  { id: "active", title: "Active" },
  { id: "in_progress", title: "In Progress" },
  { id: "waiting", title: "Waiting Review" },
  { id: "done", title: "Completed" },
] as const;

function TasksPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-12">
        <div className="mb-10">
          <p className="text-eyebrow mb-3">Tasks</p>
          <h1 className="text-display text-4xl">Know exactly what's next.</h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          {columns.map((col) => {
            const items = tasks.filter((t) => t.status === col.id);
            return (
              <div key={col.id} className="glass rounded-2xl p-4 flex flex-col">
                <div className="flex items-center justify-between mb-4 px-1">
                  <p className="text-eyebrow">{col.title}</p>
                  <span className="text-[11px] text-muted-foreground">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((t) => {
                    const team = teamById(t.team)!;
                    return (
                      <div
                        key={t.id}
                        className="rounded-xl p-3.5 border border-hairline bg-surface/40 hover:bg-surface-elevated/60 transition-colors cursor-pointer"
                      >
                        <p className="text-[13px] text-foreground leading-snug">{t.title}</p>
                        <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: team.accentVar }}
                            />
                            {team.name}
                          </span>
                          <span className="truncate ml-2">{t.plan}</span>
                        </div>
                      </div>
                    );
                  })}
                  {items.length === 0 && (
                    <p className="text-center text-[12px] text-muted-foreground py-8">Nothing here.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

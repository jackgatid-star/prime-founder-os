import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resources, teamById, teams, type TeamId } from "@/lib/mock/data";
import { Search, FileText, Video, ImageIcon, Palette, Target, Sparkles, Folder } from "lucide-react";

export const Route = createFileRoute("/app/resources")({
  component: Resources,
});

const filters = ["All", "Document", "Video", "Image", "Brand", "Strategy", "Generated"] as const;

const typeIcon = {
  Document: FileText,
  Video: Video,
  Image: ImageIcon,
  Brand: Palette,
  Strategy: Target,
  Generated: Sparkles,
} as const;

function Resources() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [q, setQ] = useState("");
  const [teamFilter, setTeamFilter] = useState<TeamId | "all">("all");

  const filtered = resources.filter(
    (r) =>
      (filter === "All" || r.type === filter) &&
      (teamFilter === "all" || r.team === teamFilter) &&
      r.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12">
        <div className="mb-10">
          <p className="text-eyebrow mb-3">Resources</p>
          <h1 className="text-display text-4xl">Every output, organized.</h1>
          <p className="mt-2 text-[13px] text-muted-foreground">
            Folders carry each team's color so the system stays legible at a glance.
          </p>
        </div>

        {/* Team folders */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          <button
            onClick={() => setTeamFilter("all")}
            className="group rounded-xl p-4 text-left transition-colors hover:bg-surface-elevated"
            style={{
              background: teamFilter === "all" ? "var(--surface-elevated)" : "var(--surface)",
              border: "1px solid var(--hairline)",
            }}
          >
            <Folder className="h-5 w-5 text-muted-foreground" />
            <p className="mt-3 text-[13px] text-foreground/95">All</p>
            <p className="text-[11px] text-muted-foreground">{resources.length} items</p>
          </button>
          {teams.map((t) => {
            const count = resources.filter((r) => r.team === t.id).length;
            const active = teamFilter === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTeamFilter(t.id)}
                className="group relative rounded-xl p-4 text-left transition-colors overflow-hidden hover:bg-surface-elevated"
                style={{
                  background: active ? "var(--surface-elevated)" : "var(--surface)",
                  border: "1px solid var(--hairline)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.08] group-hover:opacity-[0.14] transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 20% 0%, ${t.accentVar}, transparent 60%)`,
                  }}
                />
                <Folder
                  className="h-5 w-5"
                  style={{ color: t.accentVar, filter: `drop-shadow(0 0 6px ${t.accentVar})` }}
                />
                <p className="mt-3 text-[13px] text-foreground/95">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{count} items</p>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-8">
          <div className="glass rounded-lg px-3 py-2 flex items-center gap-2 md:w-80">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search resources"
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-muted-foreground/60"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-[12px] border transition-colors ${
                  filter === f
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:text-foreground hover:bg-surface"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((r) => {
            const Icon = typeIcon[r.type];
            const team = r.team ? teamById(r.team) : undefined;
            return (
              <div
                key={r.id}
                className="glass rounded-xl p-5 hover:bg-surface-elevated transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div
                    className="h-9 w-9 rounded-lg grid place-items-center"
                    style={{ background: "var(--surface-elevated)" }}
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-[11px] text-muted-foreground uppercase tracking-widest">
                    {r.type}
                  </span>
                </div>
                <h3 className="mt-5 text-[14px] text-foreground leading-snug">{r.title}</h3>
                <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    {team && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: team.accentVar }}
                      />
                    )}
                    {team?.name ?? "—"}
                  </span>
                  <span>{r.updated}</span>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground text-sm py-20">No resources match.</p>
        )}
      </div>
    </div>
  );
}

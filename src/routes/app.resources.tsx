import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { resources, teamById } from "@/lib/mock/data";
import { Search, FileText, Video, ImageIcon, Palette, Target, Sparkles } from "lucide-react";

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

  const filtered = resources.filter(
    (r) =>
      (filter === "All" || r.type === filter) &&
      r.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-12">
        <div className="mb-10">
          <p className="text-eyebrow mb-3">Resources</p>
          <h1 className="text-display text-4xl">Every output, organized.</h1>
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

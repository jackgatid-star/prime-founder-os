
# Founder OS — Build Plan

A premium, dark-cinematic operating system for founders. Two surfaces: an ultra-minimal public landing, and an internal OS shell entered through the Orb.

## Design system

- **Type:** Inter Tight (display + body), tight tracking on headlines, generous line-height on body.
- **Palette (oklch):** near-black background, charcoal surfaces, silver foreground, restrained white-cyan accent (`#9EE7FF`-range) reserved for the Orb, focus, and active states.
- **Surfaces:** subtle glass panels (low-opacity white over noise), hairline borders, deep shadow + cyan glow only on the Orb.
- **Motion:** slow, controlled — fades, 200–400ms easings, no bounces. Orb pulse is the only ambient motion.
- **Logo:** use uploaded Founder OS mark in nav + landing.
- **Imagery:** uploaded blue-light cinematic stills as hero/section backdrops (subtly dimmed).

Tokens go into `src/styles.css` as semantic variables (`--bg`, `--surface`, `--surface-glass`, `--border-hairline`, `--foreground`, `--muted`, `--accent`, `--accent-glow`, gradients, shadows). Components use tokens only.

## Routes (TanStack file-based)

```
src/routes/
  __root.tsx                 (shell + meta)
  index.tsx                  Landing
  enter.tsx                  Orb threshold (transition)
  app.tsx                    Internal OS layout (sidebar + outlet)
  app.index.tsx              Main Chat (default)
  app.teams.tsx              AI Teams grid
  app.teams.$teamId.tsx      Team chat + plans for that team
  app.plans.tsx              All plans (cross-team)
  app.plans.$planId.tsx      Plan detail (steps, outputs, checkpoints)
  app.resources.tsx          Resource library
  app.dashboard.tsx          Founder dashboard
  app.tasks.tsx              Tasks
```

Each route gets its own `head()` metadata.

## 1. Landing (`/`)

Minimal, four blocks only:
1. **Hero** — logo mark top-left, nav minimal (See the System · Enter). Centered: "Founder OS" headline, "From idea to market." sub, "Find the product. Build the system. Launch with conviction." support line, primary CTA `Enter Founder OS` → `/enter`, secondary `See the System` (scrolls).
2. **Value strip** — three short lines (Strategy · Systems · Execution), hairline-separated, no icons.
3. **Positioning block** — one short paragraph + cinematic still backdrop.
4. **Final CTA** — "Build the business. Own the market." + `Enter Founder OS` button.

No testimonials, no logos row, no feature grid.

## 2. Orb Entry (`/enter`)

Full-bleed black. Centered Orb (CSS/SVG: dark disc, cyan rim glow, soft ground reflection — matches uploaded reference). Single line: "Enter Founder OS." Click → ~1.2s transition (Orb scales, cyan bloom expands, fade to white-cyan, fade to app shell) → navigates to `/app`.

## 3. Internal OS shell (`/app/*`)

**Layout:** Shadcn Sidebar (collapsible to icon rail). Sidebar sections:
- Workspace: Main Chat, Dashboard, Tasks
- Build: AI Teams, Plans, Resources
- Footer: small Orb avatar + founder identity

Top bar: breadcrumb + global command input (⌘K placeholder, non-functional v1) + sidebar trigger.

### A. Main Chat (`/app`)
Center-stage conversation with the blue Orb mentor. Large input at bottom with placeholder "Ask the Orb what to build next…", attachment + execute affordances, message bubbles in muted glass. Seeded with a welcome from the Orb. UI only (no LLM wired yet — stub send adds local messages).

### B. AI Teams (`/app/teams`)
Grid of team cards: Marketing, Branding, Product, Sales, Research. Each card has a distinct accent hue (kept muted/desaturated to stay premium), a one-line mandate, and the team lead's name. Click → team route.

### C. Team detail (`/app/teams/$teamId`)
Two-pane: left = team lead chat (same chat primitive, recolored to team accent), right = that team's plans list with progress.

### D. Plans (`/app/plans` + detail)
List view grouped by team. Detail shows ordered steps (strategy → assets → launch → review), each step with outputs and status, plus a checkpoint panel.

### E. Resources (`/app/resources`)
Premium library: filter rail (Documents · Videos · Images · Brand · Strategy · Generated), grid of cards with type badges, search field. Categorized, calm — not a file manager.

### F. Dashboard (`/app/dashboard`)
Focused, not noisy. Blocks: Current Phase, Momentum (single sparkline), Recent Outputs (list), Team Activity (compact), Next Action (single card). No KPI overload.

### G. Tasks (`/app/tasks`)
Columns: Active · In Progress · Waiting Review · Completed. Each task links back to its team + plan. Subtle, no kanban-toy feel.

## Data

All v1 content is in-file mock data (`src/lib/mock/*`) — teams, plans, tasks, resources. No backend yet. Structure is shaped so Lovable Cloud can drop in later without refactor.

## Technical notes

- Reusable `<Orb size>` component (SVG + CSS glow) used on landing, /enter, sidebar footer, chat avatar.
- Reusable `<ChatPanel accent>` used by Main Chat and each Team chat.
- Reusable `<GlassPanel>` and `<HairlineDivider>` primitives.
- Copy uploaded images to `src/assets/` and the logo where appropriate; import as ES6.
- All colors via tokens; no inline hex in components.
- `og:image` on landing only (using a cinematic still); other routes get text meta.

## Out of scope (v1)

- Real AI/LLM wiring (chat is UI shell with mock responses)
- Auth / persistence (no Lovable Cloud yet — easy to add later)
- Real file upload in Resources
- Notifications, settings, billing

After approval I'll build landing + Orb entry + full internal shell in one pass.

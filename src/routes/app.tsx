import { createFileRoute, Outlet, Link, useRouterState } from "@tanstack/react-router";
import {
  MessageSquare,
  Users,
  ListTodo,
  Library,
  LayoutDashboard,
  CheckSquare,
  Search,
  Command,
  Bell,
  Settings,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Wordmark } from "@/components/wordmark";
import { teams } from "@/lib/mock/data";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Founder OS — Operating System" },
      { name: "description", content: "The Founder OS operating environment." },
    ],
  }),
  component: AppLayout,
});

type NavItem = { title: string; to: string; icon: typeof MessageSquare; exact?: boolean };

const workspace: NavItem[] = [
  { title: "Main Chat", to: "/app", icon: MessageSquare, exact: true },
  { title: "Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
  { title: "Tasks", to: "/app/tasks", icon: CheckSquare },
];

const build: NavItem[] = [
  { title: "AI Teams", to: "/app/teams", icon: Users },
  { title: "Plans", to: "/app/plans", icon: ListTodo },
  { title: "Resources", to: "/app/resources", icon: Library },
];

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background text-foreground relative overflow-hidden">
        {/* Ambient chamber backdrop */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 100%, var(--orb-glow), transparent 60%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--hairline), transparent)" }}
          />
        </div>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopConsole />
          <main className="flex-1 min-h-0 flex flex-col">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <Wordmark />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-eyebrow">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workspace.map((i) => (
                <SidebarMenuItem key={i.to}>
                  <SidebarMenuButton asChild isActive={isActive(i.to, i.exact)} tooltip={i.title}>
                    <Link to={i.to} className="flex items-center gap-2.5">
                      <i.icon className="h-4 w-4" />
                      <span>{i.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-eyebrow">Build</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {build.map((i) => (
                <SidebarMenuItem key={i.to}>
                  <SidebarMenuButton asChild isActive={isActive(i.to)} tooltip={i.title}>
                    <Link to={i.to} className="flex items-center gap-2.5">
                      <i.icon className="h-4 w-4" />
                      <span>{i.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-eyebrow">Teams</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teams.map((t) => (
                <SidebarMenuItem key={t.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/app/teams/${t.id}`}
                    tooltip={t.name}
                  >
                    <Link
                      to="/app/teams/$teamId"
                      params={{ teamId: t.id }}
                      className="flex items-center gap-2.5"
                    >
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{
                          background: t.accentVar,
                          boxShadow: `0 0 8px -1px ${t.accentVar}`,
                        }}
                      />
                      <span className="truncate">{t.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-3 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div
            className="h-7 w-7 rounded-full grid place-items-center text-[10px] font-medium shrink-0"
            style={{
              background: "linear-gradient(135deg, oklch(0.3 0.02 230), oklch(0.12 0.005 240))",
              boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.1), 0 0 0 1px var(--hairline)",
              color: "var(--orb)",
            }}
          >
            EM
          </div>
          <div className="min-w-0">
            <p className="text-[12px] text-foreground truncate">Eli Maren</p>
            <p className="text-[11px] text-muted-foreground truncate">Founder</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function TopConsole() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumb = (() => {
    if (pathname === "/app") return "Home";
    if (pathname.startsWith("/app/teams")) return "AI Teams";
    if (pathname.startsWith("/app/plans")) return "Plans";
    if (pathname.startsWith("/app/resources")) return "Resources";
    if (pathname.startsWith("/app/dashboard")) return "Dashboard";
    if (pathname.startsWith("/app/tasks")) return "Tasks";
    return "Founder OS";
  })();

  return (
    <header className="h-14 border-b border-hairline flex items-center px-4 gap-3 shrink-0 bg-background/60 backdrop-blur-xl">
      <SidebarTrigger className="h-8 w-8" />
      <div className="h-4 w-px bg-hairline" />
      <p className="text-[13px] text-foreground/90">{crumb}</p>

      <div className="ml-auto flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 glass rounded-lg px-3 py-1.5 text-[12px] text-muted-foreground w-80">
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1">Search teams, plans, resources…</span>
          <kbd className="flex items-center gap-0.5 text-[10px] opacity-60">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>

        {/* Tokens */}
        <div
          className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px]"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--hairline)",
          }}
        >
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--orb)" }} />
          <span className="text-foreground/90 tabular-nums">12,480</span>
          <span className="text-muted-foreground/70">tokens</span>
        </div>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span
            className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--orb)", boxShadow: "0 0 6px var(--orb)" }}
          />
        </button>

        {/* Settings */}
        <button
          aria-label="Settings"
          className="h-8 w-8 grid place-items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
        >
          <Settings className="h-4 w-4" />
        </button>

        {/* Profile */}
        <div className="h-px w-px" />
        <div
          className="h-8 w-8 rounded-full grid place-items-center text-[10px] font-medium ml-1"
          style={{
            background: "linear-gradient(135deg, oklch(0.3 0.02 230), oklch(0.12 0.005 240))",
            boxShadow: "inset 0 1px 0 oklch(1 0 0 / 0.1), 0 0 0 1px var(--hairline)",
            color: "var(--orb)",
          }}
        >
          EM
        </div>
      </div>
    </header>
  );
}

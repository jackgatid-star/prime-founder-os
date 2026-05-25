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
import { OrbMini } from "@/components/orb";

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
      <div className="min-h-screen flex w-full bg-background text-foreground">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
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
      </SidebarContent>
      <SidebarFooter className="px-3 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <OrbMini size={28} />
          <div className="min-w-0">
            <p className="text-[12px] text-foreground truncate">Founder</p>
            <p className="text-[11px] text-muted-foreground truncate">Operating System</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

function TopBar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const crumb = (() => {
    if (pathname === "/app") return "Main Chat";
    if (pathname.startsWith("/app/teams")) return "AI Teams";
    if (pathname.startsWith("/app/plans")) return "Plans";
    if (pathname.startsWith("/app/resources")) return "Resources";
    if (pathname.startsWith("/app/dashboard")) return "Dashboard";
    if (pathname.startsWith("/app/tasks")) return "Tasks";
    return "Founder OS";
  })();

  return (
    <header className="h-14 border-b border-hairline flex items-center px-4 gap-3 shrink-0">
      <SidebarTrigger className="h-8 w-8" />
      <div className="h-4 w-px bg-hairline" />
      <p className="text-[13px] text-foreground/90">{crumb}</p>
      <div className="ml-auto flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 glass rounded-lg px-3 py-1.5 text-[12px] text-muted-foreground w-72">
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1">Search Founder OS</span>
          <kbd className="flex items-center gap-1 text-[10px] opacity-60">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>
      </div>
    </header>
  );
}

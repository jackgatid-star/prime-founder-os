import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-eyebrow mb-6">404</p>
        <h1 className="text-display text-3xl text-foreground">Off the map.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          This route does not exist inside Founder OS.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-display text-2xl text-foreground">This view didn't load.</h1>
        <p className="mt-3 text-sm text-muted-foreground">Try again, or return to the entry.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            Try again
          </button>
          <a href="/" className="rounded-md border border-border bg-surface px-4 py-2 text-sm text-foreground">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Founder OS — From idea to market." },
      { name: "description", content: "Founder OS is the operating system for founders. Find the product. Build the system. Launch with conviction." },
      { name: "author", content: "Founder OS" },
      { property: "og:title", content: "Founder OS — From idea to market." },
      { property: "og:description", content: "Founder OS is the operating system for founders. Find the product. Build the system. Launch with conviction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a0a0c" },
      { name: "twitter:title", content: "Founder OS — From idea to market." },
      { name: "twitter:description", content: "Founder OS is the operating system for founders. Find the product. Build the system. Launch with conviction." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3afe2075-7750-4566-843a-b0fbb71a6380/id-preview-96a27c05--27f98336-5f18-43dc-a122-4059a947108b.lovable.app-1779671783029.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3afe2075-7750-4566-843a-b0fbb71a6380/id-preview-96a27c05--27f98336-5f18-43dc-a122-4059a947108b.lovable.app-1779671783029.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

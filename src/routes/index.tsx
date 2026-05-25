import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Wordmark } from "@/components/wordmark";
import { Orb } from "@/components/orb";
import cinematic from "@/assets/cinematic-stage.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Founder OS — From idea to market." },
      { name: "description", content: "Find the product. Build the system. Launch with conviction. Founder OS is the operating system for founders." },
      { property: "og:title", content: "Founder OS" },
      { property: "og:description", content: "From idea to market. The operating system for founders." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto max-w-7xl px-6 md:px-10 h-20 flex items-center justify-between">
          <Wordmark />
          <nav className="flex items-center gap-8 text-[13px] text-muted-foreground">
            <a href="#system" className="hover:text-foreground transition-colors">See the System</a>
            <Link
              to="/enter"
              className="inline-flex items-center gap-1.5 text-foreground hover:opacity-80 transition-opacity"
            >
              Enter <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        {/* Subtle vignette + orb glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 70%, var(--orb-glow), transparent 70%)",
            opacity: 0.5,
          }}
        />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto pt-20">
          <div className="flex justify-center mb-10 animate-fade-in">
            <Orb size={260} />
          </div>
          <p className="text-eyebrow mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Founder OS
          </p>
          <h1
            className="text-display text-5xl md:text-7xl text-balance text-foreground animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            From idea to market.
          </h1>
          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground text-balance animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Find the product. Build the system. Launch with conviction.
          </p>
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
            style={{ animationDelay: "0.45s" }}
          >
            <Link
              to="/enter"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-[14px] font-medium transition-all hover:shadow-[0_0_40px_-8px_var(--orb-glow)]"
            >
              Enter Founder OS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#system"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 text-[14px] text-foreground/90 hover:bg-surface transition-colors"
            >
              See the System
            </a>
          </div>
        </div>
      </section>

      {/* Value strip */}
      <section id="system" className="relative border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-24">
          <div className="grid md:grid-cols-3 gap-px bg-hairline rounded-2xl overflow-hidden border border-hairline">
            {[
              { k: "01", t: "Strategy", d: "Position the company. Sharpen the wedge." },
              { k: "02", t: "Systems", d: "Operating fabric. AI teams. Plans. Outputs." },
              { k: "03", t: "Execution", d: "Tasks, reviews, and momentum toward launch." },
            ].map((b) => (
              <div key={b.k} className="bg-background p-10">
                <p className="text-eyebrow">{b.k}</p>
                <h3 className="text-display text-2xl mt-4">{b.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning block with cinematic backdrop */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={cinematic} alt="" className="w-full h-full object-cover opacity-50" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, var(--background) 0%, transparent 30%, transparent 70%, var(--background) 100%)",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 md:px-10 py-40 text-center">
          <p className="text-eyebrow mb-6">The premise</p>
          <p className="text-display text-3xl md:text-4xl text-balance text-foreground/95 leading-tight">
            Most founders don't fail at vision. They fail at the operating system around it.
            Founder OS is where strategy, brand, systems, and execution converge into one
            calm, premium environment.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative border-t border-hairline">
        <div className="mx-auto max-w-3xl px-6 py-32 text-center">
          <h2 className="text-display text-4xl md:text-5xl text-balance">
            Build the business. Own the market.
          </h2>
          <div className="mt-10">
            <Link
              to="/enter"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-[14px] font-medium transition-all hover:shadow-[0_0_50px_-8px_var(--orb-glow)]"
            >
              Enter Founder OS
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline">
        <div className="mx-auto max-w-7xl px-6 md:px-10 h-16 flex items-center justify-between text-[12px] text-muted-foreground">
          <Wordmark />
          <span>© Founder OS</span>
        </div>
      </footer>
    </div>
  );
}

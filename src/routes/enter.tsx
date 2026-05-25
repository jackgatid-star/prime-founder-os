import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Orb } from "@/components/orb";

export const Route = createFileRoute("/enter")({
  head: () => ({
    meta: [
      { title: "Enter Founder OS" },
      { name: "description", content: "Step through the Orb. Enter the operating system." },
    ],
  }),
  component: EnterPage,
});

function EnterPage() {
  const navigate = useNavigate();
  const [entering, setEntering] = useState(false);

  const enter = () => {
    if (entering) return;
    setEntering(true);
    setTimeout(() => navigate({ to: "/app" }), 1100);
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Cyan bloom transition */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: "radial-gradient(circle at 50% 50%, var(--orb-glow), transparent 70%)",
          opacity: entering ? 1 : 0.3,
        }}
      />

      <button
        type="button"
        onClick={enter}
        className="group relative z-10 flex flex-col items-center gap-12 outline-none"
        aria-label="Enter Founder OS"
      >
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            transform: entering ? "scale(3.5)" : "scale(1)",
            opacity: entering ? 0 : 1,
          }}
        >
          <Orb size={320} intensity="strong" />
        </div>
        <div
          className="transition-opacity duration-500"
          style={{ opacity: entering ? 0 : 1 }}
        >
          <p className="text-eyebrow mb-3">Threshold</p>
          <p className="text-display text-2xl text-foreground/90">Enter Founder OS</p>
          <p className="mt-2 text-sm text-muted-foreground">Click the Orb</p>
        </div>
      </button>

      {/* Whiteout */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: "var(--background)",
          opacity: entering ? 1 : 0,
          transitionDelay: entering ? "600ms" : "0ms",
        }}
      />
    </div>
  );
}

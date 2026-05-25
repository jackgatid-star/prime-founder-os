import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className="relative h-6 w-6 rounded-[6px]"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.85 0.05 230), oklch(0.45 0.08 240))",
          boxShadow:
            "inset 0 1px 0 oklch(1 0 0 / 0.3), 0 0 0 1px oklch(0 0 0 / 0.3), 0 0 18px -4px var(--orb-glow)",
        }}
      >
        <div
          className="absolute inset-[3px] rounded-[4px]"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.2 0.02 240), oklch(0.08 0.005 240))",
          }}
        />
        <div
          className="absolute inset-0 grid place-items-center text-[10px] font-semibold tracking-tight"
          style={{ color: "var(--orb)" }}
        >
          F
        </div>
      </div>
      <span className="text-[14px] font-medium tracking-tight text-foreground">
        Founder<span className="text-muted-foreground"> OS</span>
      </span>
    </div>
  );
}

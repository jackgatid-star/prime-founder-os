import { cn } from "@/lib/utils";

interface OrbProps {
  size?: number;
  className?: string;
  interactive?: boolean;
  intensity?: "soft" | "normal" | "strong";
}

export function Orb({ size = 240, className, interactive, intensity = "normal" }: OrbProps) {
  const glowBlur = intensity === "strong" ? 140 : intensity === "soft" ? 50 : 90;
  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient glow */}
      <div
        className="absolute inset-0 rounded-full animate-orb-breathe"
        style={{
          background: `radial-gradient(circle at 50% 55%, var(--orb-glow), transparent 65%)`,
          filter: `blur(${glowBlur * 0.5}px)`,
        }}
      />
      {/* Disc */}
      <div
        className={cn(
          "relative rounded-full transition-transform duration-700",
          interactive && "group-hover:scale-[1.03]"
        )}
        style={{
          width: size * 0.78,
          height: size * 0.78,
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.22 0.01 240) 0%, oklch(0.1 0.005 240) 60%, oklch(0.06 0.005 240) 100%)",
          boxShadow:
            "inset 0 1px 0 oklch(1 0 0 / 0.08), inset 0 -20px 40px oklch(0 0 0 / 0.6), 0 30px 80px -20px oklch(0 0 0 / 0.8)",
        }}
      >
        {/* Cyan rim */}
        <div
          className="absolute inset-x-0 bottom-[-1px] h-[2px] rounded-full animate-orb-rim"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--orb), transparent)",
            filter: `blur(1px) drop-shadow(0 0 ${glowBlur * 0.2}px var(--orb))`,
          }}
        />
        {/* Top sheen */}
        <div
          className="absolute inset-x-[15%] top-[6%] h-[20%] rounded-[50%] opacity-30"
          style={{
            background:
              "linear-gradient(180deg, oklch(1 0 0 / 0.25), transparent)",
            filter: "blur(8px)",
          }}
        />
      </div>
      {/* Ground reflection */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          width: size * 0.5,
          height: size * 0.08,
          top: `calc(50% + ${size * 0.38}px)`,
          background:
            "radial-gradient(ellipse at center, var(--orb-glow), transparent 70%)",
          filter: "blur(6px)",
          opacity: 0.7,
        }}
      />
    </div>
  );
}

export function OrbMini({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <div
      className={cn("relative rounded-full shrink-0", className)}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 50% 35%, oklch(0.3 0.02 230), oklch(0.1 0.005 240) 70%)",
        boxShadow:
          "inset 0 1px 0 oklch(1 0 0 / 0.15), 0 0 0 1px var(--hairline), 0 0 20px -2px var(--orb-glow)",
      }}
    >
      <div
        className="absolute inset-x-[20%] bottom-[18%] h-[1px] rounded-full"
        style={{
          background: "var(--orb)",
          filter: "blur(0.5px) drop-shadow(0 0 4px var(--orb))",
        }}
      />
    </div>
  );
}

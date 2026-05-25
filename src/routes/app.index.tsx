import { createFileRoute } from "@tanstack/react-router";
import { ChatPanel } from "@/components/chat-panel";

export const Route = createFileRoute("/app/")({
  component: MainChat,
});

function MainChat() {
  return (
    <ChatPanel
      agentName="Orb"
      accent="var(--orb)"
      placeholder="Ask the Orb what to build next…"
      initialMessages={[
        {
          id: "welcome",
          role: "agent",
          content:
            "Welcome inside Founder OS. I'm the Orb — your primary guide. We'll move from idea to market across strategy, brand, systems, and execution. Tell me where you are, and I'll route you to the right team.",
        },
      ]}
    />
  );
}

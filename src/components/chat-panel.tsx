import { useState, useRef, useEffect } from "react";
import { ArrowUp, Paperclip, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrbMini } from "./orb";

export interface ChatMessage {
  id: string;
  role: "user" | "agent";
  content: string;
}

interface ChatPanelProps {
  agentName: string;
  accent?: string; // CSS color value
  initialMessages?: ChatMessage[];
  placeholder?: string;
  className?: string;
}

export function ChatPanel({
  agentName,
  accent = "var(--orb)",
  initialMessages = [],
  placeholder = "Ask what to build next…",
  className,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: text };
    const agentMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "agent",
      content: `Acknowledged. ${agentName} is preparing the next step on this.`,
    };
    setMessages((m) => [...m, userMsg, agentMsg]);
    setInput("");
  };

  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-10 py-10">
        <div className="mx-auto max-w-2xl space-y-8">
          {messages.length === 0 && (
            <div className="text-center pt-20 animate-fade-up">
              <div className="inline-flex flex-col items-center gap-4">
                <OrbMini size={44} />
                <p className="text-eyebrow">{agentName}</p>
                <p className="text-display text-2xl text-foreground/90 text-balance">
                  What are we building today?
                </p>
              </div>
            </div>
          )}
          {messages.map((m) => (
            <div key={m.id} className="animate-fade-up">
              {m.role === "agent" ? (
                <div className="flex gap-3">
                  <OrbMini size={28} className="mt-1" />
                  <div className="flex-1">
                    <p className="text-eyebrow mb-1.5" style={{ color: accent }}>
                      {agentName}
                    </p>
                    <p className="text-[15px] leading-relaxed text-foreground/90">{m.content}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="glass rounded-2xl px-4 py-2.5 max-w-[80%] text-[15px] leading-relaxed">
                    {m.content}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-10 pb-8">
        <div className="mx-auto max-w-2xl">
          <div
            className="glass rounded-2xl p-2.5 flex items-end gap-2 focus-within:ring-1 transition-shadow"
            style={{ ["--tw-ring-color" as never]: accent }}
          >
            <button
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Attach"
              type="button"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={placeholder}
              rows={1}
              className="flex-1 bg-transparent outline-none resize-none py-2 text-[15px] placeholder:text-muted-foreground/60 max-h-40"
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="p-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: input.trim() ? accent : "transparent",
                color: input.trim() ? "var(--background)" : "var(--muted-foreground)",
              }}
              aria-label="Send"
              type="button"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-muted-foreground/60">
            <Sparkles className="h-3 w-3" />
            <span>{agentName} guides you through structured execution.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

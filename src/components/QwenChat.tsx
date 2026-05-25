import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "qwen";
  text: string;
}

interface Props {
  initialMessages?: Message[];
  placeholder?: string;
  onUserSend?: (text: string) => void;
  showInput?: boolean;
  maxHeight?: string;
  respondTrigger?: number;
  respondText?: string;
}

export default function QwenChat({
  initialMessages = [],
  placeholder = "输入你想问千问的任何问题...",
  onUserSend,
  showInput = true,
  maxHeight = "50vh",
  respondTrigger = 0,
  respondText = "",
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastTriggerRef = useRef(0);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typingText]);

  useEffect(() => {
    if (respondTrigger > lastTriggerRef.current && respondText) {
      lastTriggerRef.current = respondTrigger;
      setIsTyping(true);
      setTypingText("");
      let i = 0;
      const text = respondText;
      timerRef.current = setInterval(() => {
        i++;
        setTypingText(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timerRef.current!);
          setIsTyping(false);
          setMessages((prev) => [...prev, { role: "qwen", text }]);
          setTypingText("");
        }
      }, 25);
    }
  }, [respondTrigger, respondText]);

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { role: "user", text }]);
    onUserSend?.(text);
    setInput("");
  }, [input, onUserSend]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const display = [...messages];
  if (isTyping && typingText) {
    display.push({ role: "qwen", text: typingText });
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      <div ref={scrollRef} style={{ maxHeight, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, paddingRight: 4 }}>
        {display.map((msg, i) => (
          <div
            key={i}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "82%",
              padding: "10px 14px",
              borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
              background: msg.role === "user"
                ? "linear-gradient(135deg, rgba(255,179,71,0.25), rgba(255,179,71,0.1))"
                : "var(--bg-secondary)",
              border: msg.role === "qwen" ? "1px solid var(--border-subtle)" : "none",
              fontSize: "var(--text-body)",
              lineHeight: "var(--leading-body)",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              animation: "fadeInUp 300ms var(--ease-out) both",
            }}
          >
            {msg.role === "qwen" && (
              <div style={{ fontSize: 10, color: "var(--accent-cyan)", marginBottom: 4, fontWeight: 600, letterSpacing: 1 }}>
                千问
              </div>
            )}
            {msg.text}
          </div>
        ))}
      </div>
      {showInput && (
        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            style={{
              flex: 1, padding: "12px 16px", borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-subtle)", background: "var(--bg-secondary)",
              color: "var(--text-primary)", fontSize: "var(--text-body)", outline: "none",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "12px 20px", borderRadius: "var(--radius-full)",
              background: "var(--accent-gold)", color: "#000", fontWeight: 600,
              fontSize: "var(--text-body)", whiteSpace: "nowrap",
            }}
          >
            发送
          </button>
        </div>
      )}
    </div>
  );
}

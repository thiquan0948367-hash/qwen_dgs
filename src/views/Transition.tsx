import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import QwenChat from "../components/QwenChat";
import AICreditTag from "../components/AICreditTag";

export default function Transition() {
  const navigate = useNavigate();
  const { name, setFutureMessage } = useUserStore();
  const [input, setInput] = useState("");
  const [sent, setSent] = useState(false);
  const [respondCount, setRespondCount] = useState(0);
  const [respondText, setRespondText] = useState("");

  const triggerRespond = useCallback((text: string) => {
    setRespondText(text);
    setRespondCount((c) => c + 1);
  }, []);

  const handleSend = () => {
    if (!input.trim() || sent) return;
    const msg = input.trim();
    setFutureMessage(msg);
    setSent(true);
    triggerRespond(`"${msg}"\n\n好的，${name}。我把这句话放进你的千问OS能力图谱里——`);
    setTimeout(() => {
      triggerRespond(`从今天的一日三餐，到未来的万物互联。\n\n千问OS正在为每一个像你一样的人构建AI时代的操作系统。\n\n天地与我并生，万物与我为一。\n\nAll Things Run on One.`);
    }, 2000);
  };

  return (
    <div className="screen">
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>写给明天</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 16 }}>归 · 齐物归一</p>

        {!sent && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 12 }}>
            <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-body)", textAlign: "center" }}>你想对未来的千问OS说什么？</p>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="写下你的期待与想象..." rows={3}
              style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: "var(--text-body)", outline: "none", resize: "none" }} />
            <button onClick={handleSend} disabled={!input.trim()}
              style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: input.trim() ? "var(--accent-cyan)" : "var(--border-subtle)", color: input.trim() ? "#000" : "var(--text-tertiary)", fontWeight: 600, fontSize: "var(--text-body-lg)", cursor: input.trim() ? "pointer" : "default" }}>
              发送
            </button>
          </div>
        )}

        <QwenChat showInput={false} maxHeight="35vh" respondTrigger={respondCount} respondText={respondText} />

        {sent && (
          <button onClick={() => navigate("/report")}
            style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
            生成我的能力图谱 →
          </button>
        )}
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}

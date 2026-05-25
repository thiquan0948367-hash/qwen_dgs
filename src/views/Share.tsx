import { useUserStore } from "../stores/userStore";
import AICreditTag from "../components/AICreditTag";

export default function Share() {
  const { name } = useUserStore();
  return (
    <div className="screen">
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%", maxWidth: 360 }}>
        <div style={{ fontSize: 13, letterSpacing: 6, color: "var(--accent-cyan)", marginBottom: 16, fontWeight: 500 }}>Qwen OS</div>
        <h1 style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1.3, fontFamily: "var(--font-heading)", background: "linear-gradient(135deg, var(--text-primary), var(--accent-cyan))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>All Things<br />Run on One</h1>
        <p style={{ fontSize: "var(--text-body)", color: "var(--text-secondary)", letterSpacing: 2, marginBottom: 24 }}>千问OS · 万物归一</p>
        <div style={{ padding: "16px", borderRadius: "var(--radius-md)", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", marginBottom: 20 }}>
          <p style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", marginBottom: 12 }}>{name}，感谢你与千问OS共度的一天</p>
          <div style={{ width: 120, height: 120, margin: "0 auto 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-primary)", border: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-tertiary)", fontSize: "var(--text-caption)" }}>[ ▢ 二维码占位 ]</div>
          <p style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)" }}>扫码体验千问</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>📤 分享到微信</button>
          <button style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: "transparent", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontWeight: 600, fontSize: "var(--text-body)" }}>🔗 复制链接</button>
          <button onClick={() => window.open("https://www.aliyun.com/product/tongyi", "_blank")} style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: "transparent", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", fontWeight: 500, fontSize: "var(--text-body)" }}>🌐 访问千问官网</button>
        </div>
        <p style={{ marginTop: 24, fontSize: "var(--text-caption)", color: "var(--text-tertiary)", fontStyle: "italic", lineHeight: 1.6 }}>天地与我并生，万物与我为一<br />千问大模型 · AI时代的操作系统</p>
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}

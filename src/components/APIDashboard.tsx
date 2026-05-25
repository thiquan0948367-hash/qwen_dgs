import { useState, useEffect } from "react";
import { apiDemoKey, bailianModels, bailianLogs } from "../data/responses";

export default function APIDashboard() {
  const [callCount, setCallCount] = useState(1289347);
  const [logs, setLogs] = useState(bailianLogs.slice(0, 4));

  useEffect(() => {
    const interval = setInterval(() => {
      setCallCount((c) => c + Math.floor(Math.random() * 50 + 10));
      setLogs((prev) => {
        const newLog = { ...bailianLogs[Math.floor(Math.random() * bailianLogs.length)], time: new Date().toISOString().slice(11, 23) };
        return [newLog, ...prev].slice(0, 8);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* API Key display */}
      <div style={{
        padding: "12px 16px", borderRadius: "var(--radius-sm)",
        background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>API Key</span>
        <code style={{
          flex: 1, fontSize: "var(--text-caption)", color: "var(--accent-cyan)",
          background: "rgba(255,179,71,0.08)", padding: "4px 10px", borderRadius: "var(--radius-xs)",
          fontFamily: "monospace", letterSpacing: 1,
        }}>
          {apiDemoKey}
        </code>
        <span style={{ fontSize: "var(--text-caption)", color: "var(--success)" }}>● Active</span>
      </div>

      {/* Call counter */}
      <div style={{
        padding: "14px 16px", borderRadius: "var(--radius-sm)",
        background: "linear-gradient(135deg, var(--accent-cyan-dim), rgba(124,58,237,0.12))",
        border: "1px solid var(--border-glow)", textAlign: "center",
      }}>
        <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", marginBottom: 4 }}>实时API调用次数</div>
        <div style={{ fontSize: "28px", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--accent-cyan)", letterSpacing: 2, fontVariantNumeric: "tabular-nums" }}>
          {callCount.toLocaleString()}
        </div>
      </div>

      {/* Models */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {bailianModels.map((m) => (
          <div key={m.name} style={{
            padding: "8px 12px", borderRadius: "var(--radius-xs)",
            background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)",
            fontSize: "var(--text-caption)",
          }}>
            <div style={{ color: "var(--text-primary)", fontWeight: 600 }}>{m.name}</div>
            <div style={{ color: "var(--text-tertiary)", fontSize: 10 }}>{m.description}</div>
          </div>
        ))}
      </div>

      {/* Log stream */}
      <div style={{
        borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)",
        border: "1px solid var(--border-subtle)", overflow: "hidden",
      }}>
        <div style={{
          padding: "6px 12px", fontSize: 10, color: "var(--text-tertiary)",
          borderBottom: "1px solid var(--border-subtle)", letterSpacing: 1,
        }}>
          API调用日志
        </div>
        <div style={{ maxHeight: 160, overflowY: "auto", padding: "4px 0" }}>
          {logs.map((log, i) => (
            <div key={i} style={{
              display: "flex", gap: 8, padding: "4px 12px",
              fontSize: 10, fontFamily: "monospace", color: "var(--text-secondary)",
              animation: i === 0 ? "fadeInUp 300ms var(--ease-out)" : "none",
            }}>
              <span style={{ color: "var(--text-tertiary)", minWidth: 80 }}>{log.time}</span>
              <span style={{ color: "var(--accent-cyan)", minWidth: 72 }}>{log.model}</span>
              <span style={{ color: "var(--accent-cyan)", minWidth: 40 }}>{log.industry}</span>
              <span style={{ color: "var(--text-tertiary)", minWidth: 52 }}>{log.tokens} tokens</span>
              <span style={{ color: "var(--success)" }}>{log.latency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

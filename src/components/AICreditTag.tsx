interface Props {
  tools: string[];
}

export default function AICreditTag({ tools }: Props) {
  return (
    <div style={{
      position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
      background: "rgba(0,229,255,0.08)", borderRadius: "var(--radius-xs)",
      padding: "4px 10px", zIndex: 2,
    }}>
      <span style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>
        本页{tools.join(" · ")}生成
      </span>
    </div>
  );
}

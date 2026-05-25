interface RadarData {
  label: string;
  value: number; // 0-100
}

interface Props {
  data: RadarData[];
  size?: number;
  name?: string;
}

export default function QwenRadar({ data, size = 280, name }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const levels = 5;

  const angleSlice = (2 * Math.PI) / data.length;

  const getPoint = (i: number, value: number) => {
    const angle = angleSlice * i - Math.PI / 2;
    const dist = (value / 100) * r;
    return {
      x: cx + dist * Math.cos(angle),
      y: cy + dist * Math.sin(angle),
    };
  };

  // Grid
  const gridPolygons = Array.from({ length: levels }, (_, level) => {
    const points = data.map((_, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const dist = ((level + 1) / levels) * r;
      return `${cx + dist * Math.cos(angle)},${cy + dist * Math.sin(angle)}`;
    });
    return <polygon key={level} points={points.join(" ")} fill="none" stroke="var(--border-subtle)" strokeWidth="0.5" />;
  });

  // Axes
  const axes = data.map((_, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    return (
      <line
        key={i}
        x1={cx} y1={cy}
        x2={cx + r * Math.cos(angle)}
        y2={cy + r * Math.sin(angle)}
        stroke="var(--border-subtle)"
        strokeWidth="0.5"
      />
    );
  });

  // Data polygon
  const dataPoints = data.map((d, i) => {
    const p = getPoint(i, d.value);
    return `${p.x},${p.y}`;
  }).join(" ");

  // Labels
  const labels = data.map((d, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    const lx = cx + (r + 30) * Math.cos(angle);
    const ly = cy + (r + 30) * Math.sin(angle);
    return (
      <text
        key={i}
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--text-secondary)"
        fontSize="12"
      >
        {d.label}
      </text>
    );
  });

  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {gridPolygons}
        {axes}
        <polygon
          points={dataPoints}
          fill="rgba(0,229,255,0.12)"
          stroke="var(--accent-cyan)"
          strokeWidth="1.5"
        />
        {data.map((d, i) => {
          const p = getPoint(i, d.value);
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="var(--accent-cyan)"
              stroke="var(--bg-primary)"
              strokeWidth="2"
            />
          );
        })}
        {labels}
      </svg>
      {name && (
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>千问OS</div>
          <div style={{ fontSize: "var(--text-body)", fontWeight: 700, color: "var(--accent-cyan)" }}>{name}</div>
        </div>
      )}
    </div>
  );
}

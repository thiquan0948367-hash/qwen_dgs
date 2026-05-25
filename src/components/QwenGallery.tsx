interface GalleryItem {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  gradient: string;
}

interface Props {
  items: GalleryItem[];
}

export default function QwenGallery({ items }: Props) {
  return (
    <div style={{
      display: "flex", overflowX: "auto", gap: 14,
      padding: "8px 0", scrollSnapType: "x mandatory",
      WebkitOverflowScrolling: "touch",
    }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            minWidth: 260, maxWidth: 280,
            background: item.gradient,
            borderRadius: "var(--radius-md)",
            padding: "var(--space-xl)",
            scrollSnapAlign: "start",
            display: "flex", flexDirection: "column", gap: 8,
            border: "1px solid var(--border-subtle)",
            flexShrink: 0,
          }}
        >
          {item.image && (
            <div style={{
              width: "100%", height: 120, borderRadius: "var(--radius-sm)",
              background: `url(${item.image}) center/cover`,
              backgroundColor: "var(--bg-secondary)",
            }} />
          )}
          <div style={{ fontSize: "var(--text-h3)", fontWeight: 600, color: "var(--text-primary)" }}>
            {item.title}
          </div>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--accent-cyan)", fontWeight: 500 }}>
            {item.subtitle}
          </div>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)", lineHeight: "var(--leading-body)" }}>
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
}

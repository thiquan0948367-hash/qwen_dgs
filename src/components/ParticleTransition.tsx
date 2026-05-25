import { useRef, useEffect, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  tx: number;
  ty: number;
  r: number;
  color: string;
  alpha: number;
  phase: number;
  speed: number;
}

interface Props {
  beforeImage?: string;
  afterImage?: string;
  trigger: number;
  particleCount?: number;
  width?: number;
  height?: number;
  onComplete?: () => void;
}

export default function ParticleTransition({
  beforeImage,
  afterImage,
  trigger,
  particleCount = 2000,
  width: propWidth,
  height: propHeight,
  onComplete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const phaseRef = useRef<"before" | "disintegrate" | "float" | "assemble" | "after">("before");
  const progressRef = useRef(0);
  const [showAfter, setShowAfter] = useState(false);

  const W = propWidth || 375;
  const H = propHeight || 600;

  const sampleImage = useCallback((img: HTMLImageElement, count: number, w: number, h: number): Particle[] => {
    const offCanvas = document.createElement("canvas");
    offCanvas.width = w;
    offCanvas.height = h;
    const ctx = offCanvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);
    const imageData = ctx.getImageData(0, 0, w, h).data;

    const particles: Particle[] = [];
    const step = Math.max(1, Math.floor(Math.sqrt((w * h) / count)));
    for (let y = 0; y < h; y += step) {
      for (let x = 0; x < w; x += step) {
        const idx = (y * w + x) * 4;
        const r = imageData[idx];
        const g = imageData[idx + 1];
        const b = imageData[idx + 2];
        const a = imageData[idx + 3];
        if (a > 30) {
          particles.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            tx: Math.random() * w,
            ty: Math.random() * h,
            r: 1 + Math.random() * 2.5,
            color: `rgb(${r},${g},${b})`,
            alpha: 0.7 + Math.random() * 0.3,
            phase: Math.random() * Math.PI * 2,
            speed: 0.3 + Math.random() * 0.7,
          });
        }
      }
    }
    return particles;
  }, []);

  const loadImage = useCallback((src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img);
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    const init = async () => {
      phaseRef.current = "before";
      setShowAfter(false);

      if (beforeImage) {
        const img = await loadImage(beforeImage);
        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(img, 0, 0, W, H);
        particlesRef.current = sampleImage(img, particleCount, W, H);

        if (afterImage) {
          const afterImg = await loadImage(afterImage);
          const afterParticles = sampleImage(afterImg, particleCount, W, H);
          // Map target positions from after image
          for (let i = 0; i < Math.min(particlesRef.current.length, afterParticles.length); i++) {
            particlesRef.current[i].tx = afterParticles[i].x;
            particlesRef.current[i].ty = afterParticles[i].y;
          }
        }
      }
    };

    init();

    return () => cancelAnimationFrame(animRef.current);
  }, [beforeImage, afterImage, W, H, particleCount, sampleImage, loadImage]);

  useEffect(() => {
    if (trigger === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const particles = particlesRef.current;
    if (particles.length === 0) return;

    phaseRef.current = "disintegrate";
    progressRef.current = 0;
    const startTime = performance.now();
    const disintegrateDuration = 800;
    const floatDuration = 600;
    const assembleDuration = 1000;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, W, H);

      if (phaseRef.current === "disintegrate") {
        const p = Math.min(1, elapsed / disintegrateDuration);
        // Ease-out
        const ep = 1 - Math.pow(1 - p, 3);
        for (const pt of particles) {
          const x = pt.x + (pt.tx - pt.x) * ep * 0.3 + Math.sin(pt.phase + p * 8) * 30 * ep;
          const y = pt.y + (pt.ty - pt.y) * ep * 0.3 + Math.cos(pt.phase + p * 8) * 30 * ep;
          ctx.beginPath();
          ctx.arc(x, y, pt.r * (1 - ep * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = pt.color.replace("rgb", "rgba").replace(")", `,${pt.alpha * (1 - ep * 0.5)})`);
          ctx.fill();
        }
        if (p >= 1) {
          phaseRef.current = "float";
          progressRef.current = 0;
        }
      } else if (phaseRef.current === "float") {
        const p = Math.min(1, (elapsed - disintegrateDuration) / floatDuration);
        for (const pt of particles) {
          const x = pt.x * 0.7 + pt.tx * 0.3 + Math.sin(pt.phase + p * 4 + pt.speed * 10) * 20 * (1 - p);
          const y = pt.y * 0.7 + pt.ty * 0.3 + Math.cos(pt.phase + p * 4 + pt.speed * 10) * 20 * (1 - p);
          ctx.beginPath();
          ctx.arc(x, y, pt.r * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = pt.color.replace("rgb", "rgba").replace(")", `,${pt.alpha * 0.6})`);
          ctx.fill();
        }
        if (p >= 1) {
          phaseRef.current = "assemble";
          progressRef.current = 0;
        }
      } else if (phaseRef.current === "assemble") {
        const p = Math.min(1, (elapsed - disintegrateDuration - floatDuration) / assembleDuration);
        // Ease-in-out
        const ep = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        for (const pt of particles) {
          const x = pt.tx * 0.3 + (pt.tx) * (0.7 * ep) + pt.x * 0.7 * (1 - ep) + Math.sin(pt.phase) * 10 * (1 - ep);
          const y = pt.ty * 0.3 + (pt.ty) * (0.7 * ep) + pt.y * 0.7 * (1 - ep) + Math.cos(pt.phase) * 10 * (1 - ep);
          ctx.beginPath();
          ctx.arc(x, y, pt.r * (0.7 + 0.3 * ep), 0, Math.PI * 2);
          const alpha = pt.alpha * (0.6 + 0.4 * ep);
          ctx.fillStyle = pt.color.replace("rgb", "rgba").replace(")", `,${alpha})`);
          ctx.fill();
        }
        if (p >= 1) {
          phaseRef.current = "after";
          setShowAfter(true);
          onComplete?.();
          // Draw final image cleanly
          if (afterImage) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
              ctx.clearRect(0, 0, W, H);
              ctx.globalAlpha = 1;
              ctx.drawImage(img, 0, 0, W, H);
            };
            img.src = afterImage;
          }
        }
      }

      if (phaseRef.current !== "after") {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [trigger, W, H, afterImage, onComplete]);

  return (
    <div style={{ position: "relative", width: W, height: H, overflow: "hidden", borderRadius: "var(--radius-md)" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      {/* Placeholder when no image loaded */}
      {!showAfter && phaseRef.current === "before" && !beforeImage && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--bg-secondary)", color: "var(--text-tertiary)", fontSize: "var(--text-caption)",
        }}>
          旧时代画面加载中...
        </div>
      )}
    </div>
  );
}

import { useRef } from "react";
import { useParticle } from "../hooks/useParticle";
import styles from "./ParticleBg.module.css";

export default function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticle(canvasRef);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}

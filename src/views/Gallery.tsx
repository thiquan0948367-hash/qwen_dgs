import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import QwenGallery from "../components/QwenGallery";
import AICreditTag from "../components/AICreditTag";

const SPECIES = [
  {
    title: "自动驾驶", subtitle: "Powered by 千问OS",
    description: "不止是四个轮子——千问OS让汽车看懂路况、听懂指令、预判风险，成为懂你情绪的出行伙伴。",
    gradient: "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(124,58,237,0.12))",
  },
  {
    title: "智能家居", subtitle: "Powered by 千问OS",
    description: "家电不再等待指令。千问OS让每个设备理解你的习惯，从扫地机器人到智能厨房，家有了灵魂。",
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.12), rgba(0,229,255,0.12))",
  },
  {
    title: "AR眼镜", subtitle: "Powered by 千问OS",
    description: "戴上眼镜，世界有了字幕。千问OS实时翻译、识别、导航——你的第二双眼睛，更智慧的眼睛。",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(0,229,255,0.12))",
  },
  {
    title: "工业机器人", subtitle: "Powered by 千问OS",
    description: "从重复劳动到智能决策。千问OS驱动的机器人能适应变化、自主学习，重塑制造业的未来。",
    gradient: "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(255,179,71,0.12))",
  },
  {
    title: "AI教育助手", subtitle: "Powered by 千问OS",
    description: "因材施教不再是一句口号。千问OS理解每个学生的节奏，让教育真正做到千人千面。",
    gradient: "linear-gradient(135deg, rgba(255,179,71,0.12), rgba(124,58,237,0.12))",
  },
  {
    title: "医疗影像分析", subtitle: "Powered by 千问OS",
    description: "千问OS在影像中看到人眼可能错过的细节，辅助医生做出更精准的诊断。",
    gradient: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(255,179,71,0.12))",
  },
];

export default function Gallery() {
  const navigate = useNavigate();
  const { name } = useUserStore();

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 60 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          新物种画廊
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 4 }}>
          万物 · 千问OS驱动的AI新物种
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", marginBottom: 16, fontStyle: "italic" }}>
          {name}，从你的3个场景出发，看看千问OS正在驱动的更大世界——
        </p>

        <QwenGallery items={SPECIES} />

        <button
          onClick={() => navigate("/multimodal")}
          style={{
            width: "100%", marginTop: 24, padding: "14px",
            borderRadius: "var(--radius-full)", background: "var(--accent-cyan)",
            color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)",
          }}
        >
          体验多模态 →
        </button>
      </div>
      <AICreditTag tools={["万相", "千问"]} />
    </div>
  );
}

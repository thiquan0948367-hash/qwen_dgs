import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { educationStudent, educationPath } from "../data/responses";
import AICreditTag from "../components/AICreditTag";

export default function InteractEducation() {
  const navigate = useNavigate();
  const { addInteraction, addStayDuration } = useUserStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [enterTime] = useState(Date.now());

  useEffect(() => {
    return () => addStayDuration("education", Date.now() - enterTime);
  }, []);

  const step = educationPath[currentStep];
  const diffColor = step?.difficulty === "easy" ? "var(--success)" : step?.difficulty === "medium" ? "var(--warning)" : step?.difficulty === "challenge" ? "var(--accent-cyan)" : "var(--success)";

  return (
    <div className="screen" style={{ justifyContent: "flex-start", paddingTop: 50 }}>
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-cyan)" }}>
          自适应学习引擎
        </h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 4 }}>
          教育 · 千问OS实时适应
        </p>
        <p style={{ color: "var(--text-tertiary)", fontSize: "var(--text-caption)", marginBottom: 14, fontStyle: "italic" }}>
          P5展示了"教案生成"——这里展示千问OS如何根据学生答题数据实时调整学习路径
        </p>

        {/* Student card */}
        <div style={{ padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>学生画像</div>
          <div style={{ fontSize: "var(--text-body)", fontWeight: 600, color: "var(--text-primary)" }}>
            {educationStudent.name} · {educationStudent.age}岁 · {educationStudent.grade}
          </div>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-secondary)", marginTop: 4 }}>
            当前：{educationStudent.subject} | 薄弱：{educationStudent.weaknesses.join("、")}
          </div>
        </div>

        {/* Question */}
        {step && (
          <div style={{
            padding: "16px", borderRadius: "var(--radius-md)",
            background: "var(--bg-secondary)", border: "1px solid var(--border-subtle)",
            marginBottom: 12,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)" }}>
                第 {step.step} 题
              </span>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: "var(--radius-full)", background: diffColor, color: "#fff", fontWeight: 600 }}>
                {step.difficulty === "easy" ? "基础" : step.difficulty === "medium" ? "进阶" : step.difficulty === "challenge" ? "挑战" : "完成"}
              </span>
            </div>
            <div style={{ fontSize: "var(--text-body-lg)", color: "var(--text-primary)", fontWeight: 500, marginBottom: 14 }}>
              {step.question}
            </div>

            {!showAnswer ? (
              <button onClick={() => setShowAnswer(true)}
                style={{ width: "100%", padding: "12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-glow)", color: "var(--accent-cyan)", fontSize: "var(--text-body)" }}>
                查看{educationStudent.name}的作答 →
              </button>
            ) : (
              <div>
                <div style={{
                  padding: "10px 14px", borderRadius: "var(--radius-sm)",
                  background: step.correct ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${step.correct ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                  marginBottom: 8,
                }}>
                  <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", marginBottom: 2 }}>
                    {educationStudent.name}的回答：
                  </div>
                  <div style={{ fontSize: "var(--text-body)", color: step.correct ? "var(--success)" : "var(--error)", fontWeight: 600 }}>
                    {step.studentAnswer} {step.correct ? "✓" : "✗"}
                  </div>
                </div>
                <div style={{
                  padding: "8px 12px", borderRadius: "var(--radius-xs)",
                  background: "var(--accent-cyan-dim)", fontSize: "var(--text-caption)",
                  color: "var(--accent-cyan)",
                }}>
                  千问OS适应决策：{step.correct
                    ? step.adaptTo === "next_topic" ? "知识已掌握 → 下一主题"
                    : "正确 → 提升难度至" + (step.adaptTo === "challenge" ? "挑战级" : "进阶级")
                    : "错误 → 识别薄弱点「" + (step.focusOn || "通分") + "」→ 降低难度并针对性练习"
                  }
                </div>
                {currentStep < educationPath.length - 1 ? (
                  <button onClick={() => { setCurrentStep((s) => s + 1); setShowAnswer(false); addInteraction({ screen: "education", action: `学习路径第${step.step + 1}步`, timestamp: Date.now() }); }}
                    style={{ width: "100%", marginTop: 10, padding: "12px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body)" }}>
                    下一题 →
                  </button>
                ) : (
                  <div style={{ marginTop: 10, padding: "10px", borderRadius: "var(--radius-sm)", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", textAlign: "center", fontSize: "var(--text-body)", color: "var(--success)", fontWeight: 600 }}>
                    🎉 学习路径完成！{educationStudent.name}已掌握分数运算
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Learning path tree */}
        <div style={{
          padding: "12px", borderRadius: "var(--radius-sm)", background: "var(--bg-secondary)",
          border: "1px solid var(--border-subtle)", marginBottom: 8,
        }}>
          <div style={{ fontSize: "var(--text-caption)", color: "var(--text-tertiary)", marginBottom: 8 }}>学习路径树（实时）</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
            {educationPath.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: i < currentStep || (i === currentStep && showAnswer) ? (p.correct ? "var(--success)" : "var(--warning)") : "var(--border-subtle)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700, color: i <= currentStep ? "#000" : "var(--text-tertiary)",
                }}>
                  {i <= currentStep ? (p.correct ? "✓" : "↺") : "·"}
                </div>
                {i < educationPath.length - 1 && <div style={{ width: 12, height: 1, background: i < currentStep ? "var(--accent-cyan)" : "var(--border-subtle)" }} />}
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => navigate("/apireveal")}
          style={{ width: "100%", padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-cyan)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
          揭开底层技术 →
        </button>
      </div>
      <AICreditTag tools={["千问"]} />
    </div>
  );
}

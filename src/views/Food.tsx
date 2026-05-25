import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { getFoodIntro, getRandomFoodMenu, getCuisineLabel } from "../data/responses";
import QwenChat from "../components/QwenChat";
import AICreditTag from "../components/AICreditTag";

const CUISINES = ["轻食主义", "家常烟火", "探味寻鲜"];

export default function Food() {
  const navigate = useNavigate();
  const { name, tags, setFoodPlan, addMemory } = useUserStore();
  const [cuisine, setCuisine] = useState(CUISINES[0]);
  const [menu, setMenu] = useState(() => getRandomFoodMenu(cuisine));
  const [respondCount, setRespondCount] = useState(0);
  const [respondText, setRespondText] = useState("");
  const [started, setStarted] = useState(false);

  const triggerRespond = useCallback((text: string) => {
    setRespondText(text);
    setRespondCount((c) => c + 1);
  }, []);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      triggerRespond(getFoodIntro(name, tags));
      setTimeout(() => {
        const menuText = ` 早餐 · ${menu.breakfast.name}\n${menu.breakfast.desc} | 约${menu.breakfast.kcal}kcal\n\n 午餐 · ${menu.lunch.name}\n${menu.lunch.desc} | 约${menu.lunch.kcal}kcal\n\n 晚餐 · ${menu.dinner.name}\n${menu.dinner.desc} | 约${menu.dinner.kcal}kcal`;
        triggerRespond(menuText);
      }, 2000);
    }
  }, []); // eslint-disable-line

  const switchCuisine = (c: string) => {
    setCuisine(c);
    const newMenu = getRandomFoodMenu(c);
    setMenu(newMenu);
    triggerRespond(`好的，切换为「${getCuisineLabel(c)}」风格——`);
    setTimeout(() => {
      triggerRespond(` 早餐 · ${newMenu.breakfast.name}\n${newMenu.breakfast.desc} | 约${newMenu.breakfast.kcal}kcal\n\n 午餐 · ${newMenu.lunch.name}\n${newMenu.lunch.desc} | 约${newMenu.lunch.kcal}kcal\n\n 晚餐 · ${newMenu.dinner.name}\n${newMenu.dinner.desc} | 约${newMenu.dinner.kcal}kcal`);
    }, 1500);
  };

  const handleDone = () => {
    setFoodPlan({ breakfast: `${menu.breakfast.name} - ${menu.breakfast.desc}`, lunch: `${menu.lunch.name} - ${menu.lunch.desc}`, dinner: `${menu.dinner.name} - ${menu.dinner.desc}` });
    addMemory({ time: "08:00", scene: "饮食规划", summary: `千问为${name}推荐了${getCuisineLabel(cuisine)}风格的一日三餐`, detail: `早餐：${menu.breakfast.name}，午餐：${menu.lunch.name}，晚餐：${menu.dinner.name}` });
    navigate("/travel");
  };

  return (
    <div className="screen">
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380 }}>
        <h2 style={{ fontSize: "var(--text-h2)", fontWeight: 600, marginBottom: 4, color: "var(--accent-gold)" }}>饮食 · 千问懂你</h2>
        <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-caption)", marginBottom: 16 }}>食 · 一粒米</p>
        <QwenChat showInput={false} maxHeight="38vh" respondTrigger={respondCount} respondText={respondText} />
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {CUISINES.map((c) => (
            <button key={c} onClick={() => switchCuisine(c)}
              style={{ padding: "8px 16px", borderRadius: "var(--radius-full)", border: `1px solid ${c === cuisine ? "var(--accent-cyan)" : "var(--border-subtle)"}`, background: c === cuisine ? "var(--accent-cyan-dim)" : "transparent", color: c === cuisine ? "var(--accent-cyan)" : "var(--text-secondary)", fontSize: "var(--text-caption)" }}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={handleDone}
          style={{ width: "100%", marginTop: 16, padding: "14px", borderRadius: "var(--radius-full)", background: "var(--accent-gold)", color: "#000", fontWeight: 600, fontSize: "var(--text-body-lg)" }}>
          去下一个目的地 →
        </button>
      </div>
      <AICreditTag tools={["千问", "万相"]} />
    </div>
  );
}

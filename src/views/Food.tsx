import breakfastImg from '../assets/hero.png';
import lunchImg from '../assets/hero.png';
import dinnerImg from '../assets/hero.png';
import '../styles/qwen-pages.css';
const meals=[{type:'早餐',name:'鲜虾南瓜粥',kcal:312,desc:'适合今天偏疲惫的状态',image:breakfastImg},{type:'午餐',name:'炙烤鸡胸藜麦沙拉',kcal:486,desc:'低负担但足够有能量',image:lunchImg},{type:'晚餐',name:'番茄牛肉暖汤面',kcal:527,desc:'今天适合早点休息',image:dinnerImg}]
export default function Food(){return <div className='page-shell'><header><h1 style={{fontSize:56}}>饮食</h1><p style={{color:'var(--text-secondary)',fontSize:28}}>今天，想吃点温暖的吗？</p></header><div style={{display:'flex',alignItems:'center',gap:16,margin:'20px 0'}}><div style={{fontSize:86}}>🤖</div><div style={{padding:24,borderRadius:24,background:'rgba(16,25,48,.78)',border:'1px solid rgba(0,229,255,.24)',fontSize:28}}>根据你的作息、口味偏好和今日状态，为你生成专属推荐</div></div>{meals.map(m=><div className='meal-card' key={m.type}><div><span>{m.type}</span><h3 style={{fontSize:48,margin:'12px 0'}}>{m.name}</h3><strong style={{color:'var(--cyan)',fontSize:40}}>{m.kcal} kcal</strong><p style={{color:'var(--text-secondary)',fontSize:28}}>{m.desc}</p></div><img src={m.image} alt={m.name}/></div>)}</div>}

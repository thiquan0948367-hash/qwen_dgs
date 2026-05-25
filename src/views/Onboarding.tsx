import { useNavigate } from 'react-router-dom';
import cityImg from '../assets/hero.png';
import '../styles/qwen-pages.css';

export default function Onboarding(){
  const navigate = useNavigate();
  return <div className='page-shell'>
    <div className='video-card'>
      <img src={cityImg} alt='city'/>
      <div className='video-overlay'><div style={{height:4,background:'rgba(255,255,255,.25)',borderRadius:99,marginBottom:12}}><div style={{width:'36%',height:'100%',background:'#fff',borderRadius:99}}/></div><div style={{display:'flex',justifyContent:'space-between'}}><button>⏸</button><span>00:18 / 01:08</span></div></div>
    </div>
    <div style={{display:'flex',alignItems:'center',gap:20,padding:28}}>
      <div style={{fontSize:100}}>🤖</div>
      <div style={{flex:1,padding:28,borderRadius:28,background:'rgba(16,25,48,.78)',border:'1px solid rgba(0,229,255,.24)',boxShadow:'0 0 28px rgba(0,229,255,.14)',fontSize:28,lineHeight:1.6}}>嗨！我是千问，你的AI智能助手。先带你看看我能做什么——</div>
    </div>
    <div style={{textAlign:'right',padding:'0 28px'}}><button onClick={()=>navigate('/hub')} style={{padding:'12px 32px',borderRadius:999,border:'1px solid #fff',background:'transparent',color:'#fff'}}>跳过 ▶</button></div>
  </div>
}

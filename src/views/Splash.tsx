import { useNavigate } from 'react-router-dom';
import p1Bg from '../assets/ai-images/P1.png';
import '../styles/qwen-pages.css';

export default function Splash(){
  const navigate = useNavigate();
  return <div className='page-shell splash' style={{backgroundImage:`linear-gradient(rgba(2,6,17,.58),rgba(8,17,31,.74)),url(${p1Bg})`}}>
    <div className='center-content'>
      <h1>万物归一</h1>
      <p style={{marginTop:18,color:'rgba(255,255,255,.82)',fontSize:20,letterSpacing:4}}>千问OS · AI时代的操作系统</p>
      <p style={{marginTop:90,color:'rgba(255,255,255,.66)',fontSize:18}}>天地与我并生，万物与我为一</p>
      <p style={{marginTop:14,color:'rgba(255,255,255,.4)'}}>——《庄子·齐物论》</p>
    </div>
    <div style={{textAlign:'center'}}><div className='loading-ring'/><p>QwenOS initializing...</p><span style={{color:'var(--text-secondary)'}}>Connecting intelligence...</span></div>
    <button onClick={()=>navigate('/onboarding')} className='brand-bar' style={{color:'#fff',fontSize:22}}>阿里云 × 千问</button>
  </div>
}

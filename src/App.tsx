import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./views/Splash";
import Onboarding from "./views/Onboarding";
import Food from "./views/Food";
import Hub from "./views/Hub";
import Travel from "./views/Travel";
import Creation from "./views/Creation";
import Memory from "./views/Memory";
import OSArch from "./views/OSArch";
import Gallery from "./views/Gallery";
import Multimodal from "./views/Multimodal";
import DataImpact from "./views/DataImpact";
import AIDisclosure from "./views/AIDisclosure";
import Transition from "./views/Transition";
import Report from "./views/Report";
import Share from "./views/Share";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/hub" element={<Hub />} />
        <Route path="/food" element={<Food />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/creation" element={<Creation />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/os" element={<OSArch />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/multimodal" element={<Multimodal />} />
        <Route path="/data" element={<DataImpact />} />
        <Route path="/disclosure" element={<AIDisclosure />} />
        <Route path="/transition" element={<Transition />} />
        <Route path="/report" element={<Report />} />
        <Route path="/share" element={<Share />} />
      </Routes>
    </BrowserRouter>
  );
}

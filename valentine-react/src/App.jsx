import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ValentineGame from './pages/ValentineGame';
import LoveCalculator from './pages/LoveCalculator';
import MemoryMatch from './pages/MemoryMatch';
import CatchTheHearts from './pages/CatchTheHearts';
import JigsawPuzzle from './pages/JigsawPuzzle';
import RelationshipSlider from './pages/RelationshipSlider';
import HiddenHearts from './pages/HiddenHearts';
import Rewards from './pages/Rewards';
import { SiteProvider, useSiteSettings } from './context/SiteContext';
import Admin from './pages/Admin';
import MusicPlayer from './components/MusicPlayer';
import SecurityCheck from './pages/SecurityCheck';
import SpamHeartAttack from './pages/SpamHeartAttack';
import FloatingHeart from './components/FloatingHeart';

const MainLayout = () => {
  const { isAuthenticated } = useSiteSettings();

  if (!isAuthenticated) {
    return <SecurityCheck />;
  }

  return (
    <>
      <FloatingHeart />
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/valentine" element={<ValentineGame />} />
        <Route path="/calculator" element={<LoveCalculator />} />
        <Route path="/memory" element={<MemoryMatch />} />
        <Route path="/catch" element={<CatchTheHearts />} />
        <Route path="/puzzle" element={<JigsawPuzzle />} />
        <Route path="/slider" element={<RelationshipSlider />} />
        <Route path="/hidden" element={<HiddenHearts />} />
        <Route path="/spam" element={<SpamHeartAttack />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <SiteProvider>
      <MainLayout />
    </SiteProvider>
  );
}

export default App;

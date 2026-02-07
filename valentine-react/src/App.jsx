import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ValentineGame from './pages/ValentineGame';
import LoveCalculator from './pages/LoveCalculator';
import MemoryMatch from './pages/MemoryMatch';
import CatchTheHearts from './pages/CatchTheHearts';
import LoveWordle from './pages/LoveWordle';
import JigsawPuzzle from './pages/JigsawPuzzle';
import RelationshipSlider from './pages/RelationshipSlider';
import HiddenHearts from './pages/HiddenHearts';
import Rewards from './pages/Rewards';
import MusicPlayer from './components/MusicPlayer';

function App() {
  return (
    <>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/valentine" element={<ValentineGame />} />
        <Route path="/calculator" element={<LoveCalculator />} />
        <Route path="/memory" element={<MemoryMatch />} />
        <Route path="/catch" element={<CatchTheHearts />} />
        <Route path="/wordle" element={<LoveWordle />} />
        <Route path="/puzzle" element={<JigsawPuzzle />} />
        <Route path="/slider" element={<RelationshipSlider />} />
        <Route path="/hidden" element={<HiddenHearts />} />
        <Route path="/rewards" element={<Rewards />} />
      </Routes>
    </>
  );
}

export default App;

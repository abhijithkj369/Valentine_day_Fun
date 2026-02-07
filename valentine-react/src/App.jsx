import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ValentineGame from './pages/ValentineGame';
import LoveCalculator from './pages/LoveCalculator';
import MemoryMatch from './pages/MemoryMatch';
import CatchTheHearts from './pages/CatchTheHearts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/valentine" element={<ValentineGame />} />
      <Route path="/calculator" element={<LoveCalculator />} />
      <Route path="/memory" element={<MemoryMatch />} />
      <Route path="/catch" element={<CatchTheHearts />} />
    </Routes>
  );
}

export default App;

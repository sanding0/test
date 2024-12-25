import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import { HomePage } from './pages/home-page';
import { SportsPage } from './pages/sports-page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sports" element={<SportsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

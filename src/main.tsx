import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App';
import FormPage from './routes/form';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />} />
        <Route index path="/form" element={<FormPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

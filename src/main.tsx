import './index.scss';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import App from './App';
import HomePage from './routes/@home';
import FormPage from './routes/form';
import TablePage from './routes/table';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route index path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/table" element={<TablePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

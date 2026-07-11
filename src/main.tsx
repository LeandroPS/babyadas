import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { ControlPage } from './pages/ControlPage'
import { DisplayPage } from './pages/DisplayPage'
import { HomePage } from './pages/HomePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:id" element={<DisplayPage />} />
        <Route path="/:id/control" element={<ControlPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

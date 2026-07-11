import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { ControlPage } from './pages/ControlPage'
import { DisplayPage } from './pages/DisplayPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DisplayPage />} />
        <Route path="/control" element={<ControlPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

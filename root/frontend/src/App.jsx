import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* oldalak majd ide kerülnek */}
      </Routes>
    </BrowserRouter>
  )
}
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
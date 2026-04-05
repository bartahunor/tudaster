import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)  // ← új

    useEffect(() => {
        validateToken().finally(() => setLoading(false))  // ← módosítva
    }, [])



  async function validateToken() {
    const token = localStorage.getItem('token')
    if (!token) return

    try {
      const res = await fetch('http://localhost:3000/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()

      if (data.valid) {
        setUser(JSON.parse(localStorage.getItem('user')))
      } else {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    } catch (err) {
      // szerver nem elérhető, token marad
    }
  }

  function handleAuthClick() {
    if (user) {
      navigate('/profil')
    } else {
      navigate('/login')
    }
  }

  function handlePracticeClick() {
    if (user) {
      navigate('/practice')
    } else {
      sessionStorage.setItem('redirectAfterLogin', '/practice')
      navigate('/login')
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>
          <img src="/logo.png" alt="Tudástér logo" style={{ width: '20%' }} />
        </a>

        {/* Nav linkek */}
        <div className="hidden md:flex items-center gap-10">
            <a className="text-slate-700 hover:text-primary font-medium transition-colors cursor-pointer" onClick={() => navigate('/#tantargyak')}>
                Tantárgyak
            </a>
            <a className="text-slate-700 hover:text-primary font-medium transition-colors cursor-pointer" onClick={handlePracticeClick}>
                Gyakorlás
            </a>
            <button className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md" onClick={handleAuthClick}>
                {loading ? 'Belépés' : user ? user.username : 'Belépés'}
            </button>
        </div>

      </div>
    </nav>
  )
}
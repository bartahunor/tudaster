import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" >
          <img src="/logo.png" alt="Tudástér logo" style={{ width: '20%' }} />
        </a>

        {/* Nav linkek */}
        <div className="hidden md:flex items-center gap-10">
            <a className="text-slate-700 hover:text-primary font-medium transition-colors cursor-pointer" >
                Tantárgyak
            </a>
            <a className="text-slate-700 hover:text-primary font-medium transition-colors cursor-pointer" >
                Gyakorlás
            </a>
            
            <Link to="/login" id="switch-link" className="bg-slate-900 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md">
              Belépés
            </Link>
        </div>

      </div>
    </nav>
  )
}
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './components/Home'
import Gallery from './components/Gallery'
import Booking from './components/Booking'
import Admin from './components/Admin'
import Contact from './components/Contact'

function Navbar() {
  const navLinkBase = 'px-4 py-2 rounded-full transition-colors'
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-rose-100/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-300 to-pink-400 shadow"></div>
          <div className="leading-tight">
            <p className="font-serif text-lg text-rose-700">ILENAI Nail'Z</p>
            <p className="text-xs text-rose-500">Mourenx • Nail Art</p>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          <NavLink to="/" end className={({isActive})=>`${navLinkBase} ${isActive?'bg-rose-600 text-white':'text-rose-700 hover:bg-rose-100'}`}>Accueil</NavLink>
          <NavLink to="/galerie" className={({isActive})=>`${navLinkBase} ${isActive?'bg-rose-600 text-white':'text-rose-700 hover:bg-rose-100'}`}>Galerie</NavLink>
          <NavLink to="/reservation" className={({isActive})=>`${navLinkBase} ${isActive?'bg-rose-600 text-white':'text-rose-700 hover:bg-rose-100'}`}>Prendre rendez-vous</NavLink>
          <NavLink to="/contact" className={({isActive})=>`${navLinkBase} ${isActive?'bg-rose-600 text-white':'text-rose-700 hover:bg-rose-100'}`}>Contact</NavLink>
          <NavLink to="/admin" className={({isActive})=>`${navLinkBase} ${isActive?'bg-rose-600 text-white':'text-rose-700 hover:bg-rose-100'}`}>Espace Pro</NavLink>
        </nav>
      </div>
    </header>
  )
}

function Footer(){
  return (
    <footer className="border-t mt-16 bg-rose-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-sm text-rose-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} ILENAI Nail'Z – Tous droits réservés</p>
        <p>Mourenx, France • <a href="tel:+33000000000" className="hover:underline">Téléphone</a> • <a href="mailto:contact@ilenai.fr" className="hover:underline">Email</a></p>
      </div>
    </footer>
  )
}

function App() {
  useEffect(()=>{document.documentElement.classList.add('scroll-smooth')},[])
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-rose-900">
        <Navbar/>
        <main>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/galerie" element={<Gallery/>}/>
            <Route path="/reservation" element={<Booking/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App

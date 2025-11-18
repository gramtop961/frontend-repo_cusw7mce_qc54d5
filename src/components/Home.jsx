import { Link } from 'react-router-dom'

const heroImages = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610992015732-4fca3cda40a5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'
]

export default function Home(){
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(253,164,175,0.25),transparent_35%)]"/>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl text-rose-900 leading-tight">Bienvenue chez ILENAI Nail'Z</h1>
            <p className="mt-4 text-rose-700">Manucures élégantes, nail art moderne et soin des mains avec une approche douce et raffinée. Prenez rendez-vous à Mourenx.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/reservation" className="px-6 py-3 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition">Prendre rendez-vous</Link>
              <Link to="/galerie" className="px-6 py-3 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 transition">Voir la galerie</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {heroImages.map((src,i)=> (
              <img key={i} src={src} className={`rounded-2xl h-48 sm:h-56 w-full object-cover ${i%2? 'mt-8':''} shadow`} alt="nails"/>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-serif text-3xl text-rose-900">À propos</h2>
        <p className="mt-3 text-rose-700 max-w-3xl">Passionnée par l'élégance des mains, je vous accueille à Mourenx pour des prestations soignées et personnalisées. Mon style mêle douceur, précision et créativité pour sublimer vos ongles au quotidien comme pour les grandes occasions.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-serif text-3xl text-rose-900 mb-6">Mood board</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {heroImages.concat(heroImages).map((src,i)=> (
            <img key={i} src={src} className="rounded-xl h-40 w-full object-cover hover:scale-[1.03] transition-transform" alt="nail art"/>
          ))}
        </div>
      </section>
    </div>
  )
}

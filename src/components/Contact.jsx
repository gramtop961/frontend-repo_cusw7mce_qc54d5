const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Contact(){
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl text-rose-900 mb-6">Contact</h1>
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white/70 border border-rose-100 rounded-2xl p-6">
          <h2 className="font-semibold text-rose-900">ILENAI Nail'Z</h2>
          <p className="text-rose-700 mt-2">Mourenx, France</p>
          <p className="text-rose-700 mt-2">Téléphone : <a href="tel:+33000000000" className="text-rose-700 underline">+33 0 00 00 00 00</a></p>
          <p className="text-rose-700">Email : <a href="mailto:contact@ilenai.fr" className="text-rose-700 underline">contact@ilenai.fr</a></p>
          <div className="mt-4">
            <iframe title="Mourenx" src="https://www.google.com/maps?q=Mourenx,France&output=embed" className="w-full h-64 rounded-xl border"/>
          </div>
        </div>
        <div className="bg-rose-50/70 border border-rose-100 rounded-2xl p-6">
          <h3 className="font-semibold text-rose-900 mb-3">Horaires</h3>
          <ul className="text-rose-700 space-y-1">
            <li>Lun–Ven : 9h – 18h30</li>
            <li>Samedi : 10h – 17h</li>
            <li>Dimanche : fermé</li>
          </ul>
          <p className="text-rose-700 mt-4">Réservations uniquement sur rendez-vous.</p>
        </div>
      </div>
    </div>
  )
}

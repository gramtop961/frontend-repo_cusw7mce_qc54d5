import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Booking(){
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', phone:'', date:'', time:'', notes:'' })
  const [occupied, setOccupied] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(()=>{
    if(!form.date) return
    fetch(`${API_BASE}/api/availability?date=${form.date}`)
      .then(r=>r.json())
      .then(d=> setOccupied(d.occupied || []))
      .catch(()=>setOccupied([]))
  }, [form.date])

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const dt = new Date(`${form.date}T${form.time}:00`)
    try{
      const res = await fetch(`${API_BASE}/api/appointments`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          datetime_iso: dt.toISOString(),
          location:'Mourenx',
          notes: form.notes || undefined
        })
      })
      if(res.status===409){
        setMessage({type:'error', text:"Ce créneau est déjà réservé. Merci de choisir un autre horaire."})
      } else if(!res.ok){
        const t = await res.text()
        setMessage({type:'error', text: t || 'Erreur lors de la réservation'})
      } else {
        setMessage({type:'success', text:'Votre rendez-vous est réservé ! Une confirmation vous sera envoyée par email.'})
        setForm({ first_name:'', last_name:'', email:'', phone:'', date:'', time:'', notes:'' })
      }
    } finally{
      setLoading(false)
    }
  }

  const isTaken = (time)=>{
    if(!form.date) return false
    const iso = new Date(`${form.date}T${time}:00`).toISOString().slice(0,16)
    return occupied.some(o => o.slice(0,16)===iso)
  }

  const times = []
  for(let h=9; h<=18; h++){
    for(let m of [0,30]){
      const hh = String(h).padStart(2,'0')
      const mm = String(m).padStart(2,'0')
      times.push(`${hh}:${mm}`)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl text-rose-900 mb-2">Prendre rendez-vous</h1>
      <p className="text-rose-700 mb-6">Les rendez-vous ont lieu à Mourenx.</p>

      {message && (
        <div className={`mb-4 p-3 rounded ${message.type==='success'?'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-700'}`}>{message.text}</div>
      )}

      <form onSubmit={handleSubmit} className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow border border-rose-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-rose-700">Prénom</label>
          <input required value={form.first_name} onChange={e=>setForm({...form, first_name:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400"/>
        </div>
        <div>
          <label className="text-sm text-rose-700">Nom</label>
          <input required value={form.last_name} onChange={e=>setForm({...form, last_name:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400"/>
        </div>
        <div>
          <label className="text-sm text-rose-700">Email</label>
          <input required type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400"/>
        </div>
        <div>
          <label className="text-sm text-rose-700">Téléphone</label>
          <input required value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400"/>
        </div>
        <div>
          <label className="text-sm text-rose-700">Date</label>
          <input required type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400"/>
        </div>
        <div>
          <label className="text-sm text-rose-700">Heure</label>
          <select required value={form.time} onChange={e=>setForm({...form, time:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400">
            <option value="">Sélectionnez</option>
            {times.map(t => (
              <option key={t} value={t} disabled={isTaken(t)}>{t}{isTaken(t)?' (indisponible)':''}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-rose-700">Notes (optionnel)</label>
          <textarea value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="w-full mt-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-rose-400" rows={3}/>
        </div>
        <div className="sm:col-span-2 flex justify-end">
          <button disabled={loading} className="px-6 py-3 rounded-full bg-rose-600 text-white hover:bg-rose-700 disabled:opacity-50">{loading?'Envoi...':'Réserver'}</button>
        </div>
      </form>
    </div>
  )
}

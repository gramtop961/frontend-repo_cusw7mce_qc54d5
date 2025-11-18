import { useEffect, useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || 'demo-admin-secret'

export default function Admin(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ id:null, first_name:'', last_name:'', email:'', phone:'', date:'', time:'', status:'booked', notes:'' })
  const [message, setMessage] = useState(null)

  const headers = useMemo(()=>({ 'Authorization': `Bearer ${ADMIN_TOKEN}`, 'Content-Type':'application/json' }),[])

  const fetchAll = async ()=>{
    setLoading(true)
    try{
      const res = await fetch(`${API_BASE}/api/appointments`, { headers })
      const data = await res.json()
      setItems(data)
    } finally{
      setLoading(false)
    }
  }

  useEffect(()=>{ fetchAll() },[])

  const startEdit = (it)=>{
    const d = new Date(it.datetime_iso)
    setForm({
      id: it.id,
      first_name: it.first_name,
      last_name: it.last_name,
      email: it.email,
      phone: it.phone,
      date: d.toISOString().slice(0,10),
      time: d.toTimeString().slice(0,5),
      status: it.status,
      notes: it.notes || ''
    })
  }

  const reset = ()=> setForm({ id:null, first_name:'', last_name:'', email:'', phone:'', date:'', time:'', status:'booked', notes:'' })

  const save = async ()=>{
    if(!form.date || !form.time) return
    const dt = new Date(`${form.date}T${form.time}:00`)
    const payload = { first_name: form.first_name, last_name: form.last_name, email: form.email, phone: form.phone, datetime_iso: dt.toISOString(), status: form.status, notes: form.notes }
    const url = `${API_BASE}/api/appointments/${form.id}`
    const res = await fetch(url, { method:'PATCH', headers, body: JSON.stringify(payload) })
    if(res.status===409){
      setMessage({type:'error', text:'Conflit: créneau déjà réservé.'})
      return
    }
    if(!res.ok){ setMessage({type:'error', text:'Erreur lors de la sauvegarde'}) ; return }
    setMessage({type:'success', text:'Modifié'})
    reset(); fetchAll()
  }

  const removeItem = async (id)=>{
    if(!confirm('Supprimer ce rendez-vous ?')) return
    const res = await fetch(`${API_BASE}/api/appointments/${id}`, { method:'DELETE', headers })
    if(res.ok){ fetchAll() }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl text-rose-900 mb-6">Calendrier (Espace Pro)</h1>

      {message && (<div className={`mb-4 p-3 rounded ${message.type==='success'?'bg-emerald-50 text-emerald-700':'bg-rose-50 text-rose-700'}`}>{message.text}</div>)}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white/70 border border-rose-100 rounded-2xl p-4">
          {loading? <p>Chargement…</p> : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-rose-700">
                    <th className="py-2">Date</th>
                    <th>Heure</th>
                    <th>Client</th>
                    <th>Contact</th>
                    <th>Statut</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(it=>{
                    const d = new Date(it.datetime_iso)
                    return (
                      <tr key={it.id} className="border-t border-rose-100">
                        <td className="py-2">{d.toLocaleDateString()}</td>
                        <td>{d.toTimeString().slice(0,5)}</td>
                        <td>{it.first_name} {it.last_name}</td>
                        <td>{it.phone}<br/><span className="text-rose-600">{it.email}</span></td>
                        <td><span className="px-2 py-1 rounded-full bg-rose-100 text-rose-700">{it.status}</span></td>
                        <td className="text-right">
                          <button onClick={()=>startEdit(it)} className="px-2 py-1 text-rose-700 hover:underline">Éditer</button>
                          <button onClick={()=>removeItem(it.id)} className="px-2 py-1 text-rose-700 hover:underline">Supprimer</button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div className="bg-white/70 border border-rose-100 rounded-2xl p-4">
          <h2 className="font-semibold text-rose-900 mb-3">Modifier le rendez-vous</h2>
          <div className="grid grid-cols-1 gap-2">
            <input placeholder="Prénom" value={form.first_name} onChange={e=>setForm({...form, first_name:e.target.value})} className="px-3 py-2 rounded-lg border"/>
            <input placeholder="Nom" value={form.last_name} onChange={e=>setForm({...form, last_name:e.target.value})} className="px-3 py-2 rounded-lg border"/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="px-3 py-2 rounded-lg border"/>
            <input placeholder="Téléphone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="px-3 py-2 rounded-lg border"/>
            <div className="flex gap-2">
              <input type="date" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} className="px-3 py-2 rounded-lg border w-1/2"/>
              <input type="time" value={form.time} onChange={e=>setForm({...form, time:e.target.value})} className="px-3 py-2 rounded-lg border w-1/2"/>
            </div>
            <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})} className="px-3 py-2 rounded-lg border">
              <option value="booked">booked</option>
              <option value="confirmed">confirmed</option>
              <option value="done">done</option>
              <option value="canceled">canceled</option>
            </select>
            <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} className="px-3 py-2 rounded-lg border" rows={3}/>
            <div className="flex gap-2">
              <button onClick={save} className="flex-1 px-4 py-2 rounded-full bg-rose-600 text-white">Enregistrer</button>
              <button onClick={reset} className="px-4 py-2 rounded-full bg-rose-100 text-rose-700">Réinitialiser</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

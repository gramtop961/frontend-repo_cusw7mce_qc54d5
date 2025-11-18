import { useState } from 'react'

const images = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610992015732-4fca3cda40a5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610992015732-4fca3cda40a5?q=80&w=1200&auto=format&fit=crop'
]

export default function Gallery(){
  const [active, setActive] = useState(null)
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-serif text-3xl text-rose-900 mb-6">Galerie</h1>
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]"><div className="grid gap-4">
        {images.map((src,i)=> (
          <img key={i} onClick={()=>setActive(src)} src={src} alt="Nail art" className="mb-4 w-full rounded-xl object-cover break-inside-avoid hover:scale-[1.02] transition-transform"/>
        ))}
      </div></div>

      {active && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={()=>setActive(null)}>
          <img src={active} alt="Zoom" className="max-h-[85vh] rounded-2xl shadow-2xl"/>
        </div>
      )}
    </div>
  )
}

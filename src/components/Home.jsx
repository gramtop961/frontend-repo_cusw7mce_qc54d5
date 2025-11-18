import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform } from 'framer-motion'

const heroImages = [
  'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1610992015732-4fca3cda40a5?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop'
]

function FloatingNail({ x, y, delay=0, size=28 }){
  return (
    <motion.div
      className="pointer-events-none absolute text-rose-300/70"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
      style={{ left: x, top: y }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 21c3-1 7-1 10 0"/>
        <path d="M12 2c-2.5 3-4.5 7-5 10 2 2 8 2 10 0-.5-3-2.5-7-5-10z"/>
      </svg>
    </motion.div>
  )
}

export default function Home(){
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [ -100, 100 ], [ 8, -8 ])
  const rotateY = useTransform(mx, [ -100, 100 ], [ -8, 8 ])

  const onMouseMove = (e)=>{
    const { innerWidth, innerHeight } = window
    const dx = (e.clientX - innerWidth/2) / (innerWidth/2) * 100
    const dy = (e.clientY - innerHeight/2) / (innerHeight/2) * 100
    mx.set(dx)
    my.set(dy)
  }

  return (
    <div onMouseMove={onMouseMove}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(244,114,182,0.22),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(253,164,175,0.22),transparent_35%),radial-gradient(circle_at_10%_90%,rgba(244,63,94,0.08),transparent_45%)]"/>

        {/* Floating decorative nails */}
        <FloatingNail x="10%" y="12%" delay={0.2} size={26}/>
        <FloatingNail x="82%" y="18%" delay={0.6} size={30}/>
        <FloatingNail x="5%" y="70%" delay={1.0} size={24}/>
        <FloatingNail x="88%" y="72%" delay={1.4} size={28}/>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div style={{ rotateX, rotateY }}>
            <motion.h1
              className="font-serif text-4xl sm:text-5xl text-rose-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Bienvenue chez ILENAILS
            </motion.h1>
            <motion.p
              className="mt-4 text-rose-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Manucures élégantes, nail art moderne et soin des mains avec une approche douce et raffinée. Prenez rendez-vous à Mourenx.
            </motion.p>
            <motion.div className="mt-6 flex gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Link to="/reservation" className="px-6 py-3 rounded-full bg-rose-600 text-white hover:bg-rose-700 transition will-change-transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-rose-300/30">Prendre rendez-vous</Link>
              <Link to="/galerie" className="px-6 py-3 rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 transition hover:scale-[1.02] active:scale-[0.98]">Voir la galerie</Link>
            </motion.div>
          </motion.div>
          <motion.div className="grid grid-cols-2 gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            {heroImages.map((src,i)=> (
              <motion.img
                key={i}
                src={src}
                className={`rounded-2xl h-48 sm:h-56 w-full object-cover ${i%2? 'mt-8':''} shadow`}
                alt="nails"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="font-serif text-3xl text-rose-900">À propos</h2>
        <p className="mt-3 text-rose-700 max-w-3xl">Passionnée par l'élégance des mains, je vous accueille à Mourenx pour des prestations soignées et personnalisées. Mon style mêle douceur, précision et créativité pour sublimer vos ongles au quotidien comme pour les grandes occasions.</p>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-3xl text-rose-900">Mood board</h2>
          <Link to="/galerie" className="text-rose-700 hover:underline">Tout voir →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {heroImages.concat(heroImages).map((src,i)=> (
            <motion.img
              key={i}
              src={src}
              className="rounded-xl h-40 w-full object-cover hover:brightness-105"
              alt="nail art"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

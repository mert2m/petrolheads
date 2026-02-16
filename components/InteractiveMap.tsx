'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const locations = [
  { id: 1, city: 'Istanbul', x: 75, y: 25, events: 45 },
  { id: 2, city: 'Ankara', x: 55, y: 35, events: 28 },
  { id: 3, city: 'Izmir', x: 35, y: 45, events: 22 },
  { id: 4, city: 'Antalya', x: 48, y: 65, events: 15 },
  { id: 5, city: 'Bursa', x: 60, y: 30, events: 18 },
  { id: 6, city: 'Adana', x: 58, y: 58, events: 12 },
]

export default function InteractiveMap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeLocation, setActiveLocation] = useState<number | null>(null)

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 bg-ph-dark overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            <span className="glitch-text" data-text="TÜRKİYE GENELİNDE">TÜRKİYE GENELİNDE</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '8rem' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-4"
          />
          <p className="font-futura text-gray-400">Etkinlik lokasyonlarımız</p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto aspect-[16/9] bg-ph-black/50 rounded-2xl border border-ph-red/20 overflow-hidden"
        >
          {/* Turkey silhouette (simplified SVG) */}
          <svg
            viewBox="0 0 100 70"
            className="absolute inset-0 w-full h-full p-8"
            fill="none"
          >
            {/* Simplified Turkey outline */}
            <path
              d="M20 35 Q25 25, 40 28 Q50 20, 65 22 Q75 18, 85 25 Q90 30, 88 38 Q92 45, 85 50 Q75 55, 65 52 Q55 58, 45 55 Q35 60, 28 52 Q18 48, 20 35Z"
              fill="rgba(227, 30, 36, 0.1)"
              stroke="#E31E24"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />
          </svg>

          {/* Location pins */}
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
              className="absolute cursor-pointer group"
              style={{ left: `${location.x}%`, top: `${location.y}%` }}
              onMouseEnter={() => setActiveLocation(location.id)}
              onMouseLeave={() => setActiveLocation(null)}
            >
              {/* Ping animation */}
              <motion.div
                className="absolute inset-0 w-4 h-4 bg-ph-red/30 rounded-full -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Pin */}
              <motion.div
                whileHover={{ scale: 1.3 }}
                className="relative w-4 h-4 bg-ph-red rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white shadow-lg"
                style={{ boxShadow: '0 0 15px rgba(227, 30, 36, 0.6)' }}
              />

              {/* Tooltip */}
              {activeLocation === location.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-ph-dark border border-ph-red/40 rounded-lg p-3 whitespace-nowrap z-10"
                >
                  <p className="font-race text-white text-sm">{location.city}</p>
                  <p className="font-futura text-ph-red text-xs">{location.events} Etkinlik</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-ph-red/40" />
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-ph-dark/80 backdrop-blur-sm border border-ph-red/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-ph-red rounded-full" />
              <span className="font-futura text-xs text-gray-400">Etkinlik Noktası</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

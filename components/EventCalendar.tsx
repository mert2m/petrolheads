'use client'

import { useState, useRef, useMemo, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const events = [
  {
    id: 1,
    title: 'WINTER CRUISE 2025',
    date: '15 Subat 2025',
    time: '14:00',
    location: 'Istanbul, Kadikoy',
    type: 'cruise',
    description: 'Kis sezonunun en buyuk surus etkinligi. Bogazda muhteşem manzara esliginde.',
  },
  {
    id: 2,
    title: 'GARAJ BULUSMASI',
    date: '22 Subat 2025',
    time: '11:00',
    location: 'Ankara, Kizilay',
    type: 'meetup',
    description: 'Teknik bilgi paylaşımı ve modifikasyon sohbetleri.',
  },
  {
    id: 3,
    title: 'TRACK DAY',
    date: '8 Mart 2025',
    time: '09:00',
    location: 'Intercity Istanbul Park',
    type: 'track',
    description: 'Pistte hiz tutkusunu yasayın. Profesyonel egitmenler esliginde.',
  },
  {
    id: 4,
    title: 'CAR & COFFEE',
    date: '15 Mart 2025',
    time: '10:00',
    location: 'Izmir, Alsancak',
    type: 'meetup',
    description: 'Kahve esliginde klasik ve modern araçların buluşması.',
  },
  {
    id: 5,
    title: 'MIDNIGHT RUN',
    date: '22 Mart 2025',
    time: '23:00',
    location: 'Istanbul, Maslak',
    type: 'cruise',
    description: 'Gece surus deneyimi. Sehir isiklari altinda unutulmaz anlar.',
  },
]

const eventTypeColors = {
  cruise: 'bg-blue-500',
  meetup: 'bg-green-500',
  track: 'bg-ph-red',
}

const eventTypeLabels = {
  cruise: 'Surus',
  meetup: 'Bulusma',
  track: 'Pist',
}

export default function EventCalendar() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const seed = i * 0.3
      const normalize = (value: number) => (value + 1) / 2
      return {
        id: i,
        x: normalize(Math.sin(seed)) * 100,
        y: normalize(Math.sin(seed * 2)) * 100,
        duration: normalize(Math.sin(seed * 3)) * 4 + 5,
      }
    })
  }, [])

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 bg-ph-black overflow-hidden">
      {/* Background */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-ph-red rounded-full"
              style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
              animate={{ y: [0, -40, 0], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: particle.duration, repeat: Infinity }}
            />
          ))}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            <span className="glitch-text" data-text="ETKİNLİK TAKVİMİ">ETKİNLİK TAKVİMİ</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '10rem' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-4"
          />
          <p className="font-futura text-gray-400 text-base sm:text-lg">
            Yaklaşan etkinlikleri kacirma!
          </p>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 sm:gap-6 mb-8"
        >
          {Object.entries(eventTypeLabels).map(([type, label]) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${eventTypeColors[type as keyof typeof eventTypeColors]}`} />
              <span className="font-futura text-sm text-gray-400">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Events List */}
        <div className="space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
              className="group relative bg-gradient-to-r from-ph-dark to-ph-black border border-ph-red/20 rounded-xl p-4 sm:p-6 cursor-pointer overflow-hidden hover:border-ph-red/50 transition-all duration-300"
            >
              {/* Type indicator */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`} />

              {/* Content */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-futura text-white ${eventTypeColors[event.type as keyof typeof eventTypeColors]}`}>
                      {eventTypeLabels[event.type as keyof typeof eventTypeLabels]}
                    </span>
                    <span className="font-futura text-gray-500 text-sm">{event.date}</span>
                  </div>
                  <h3 className="font-race text-xl sm:text-2xl text-white group-hover:text-ph-red transition-colors">
                    {event.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-futura text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span className="font-futura text-sm hidden sm:inline">{event.location}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedEvent === event.id ? 180 : 0 }}
                    className="text-ph-red"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              {/* Expandable content */}
              <AnimatePresence>
                {selectedEvent === event.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pl-4 border-t border-ph-red/20 mt-4">
                      <p className="font-futura text-gray-300 mb-4">{event.description}</p>
                      <div className="flex gap-3">
                        <motion.a
                          href="https://x.com/i/communities/1914706125393391712"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 bg-ph-red text-white font-futura text-sm px-4 py-2 rounded-lg hover:bg-ph-red/90 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Katil
                        </motion.a>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-2 bg-ph-dark border border-ph-red/30 text-white font-futura text-sm px-4 py-2 rounded-lg hover:border-ph-red transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Paylas
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover effect line */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-ph-red"
                initial={{ width: '0%' }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* See All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <motion.a
            href="https://x.com/i/communities/1914706125393391712"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-ph-red font-futura font-bold hover:text-white transition-colors"
          >
            Tum Etkinlikleri Gor
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

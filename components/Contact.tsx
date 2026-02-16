'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Background particles
  const particleCount = 25
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const seed = i * 0.28
      const normalize = (value: number) => (value + 1) / 2
      const random1 = normalize(Math.sin(seed))
      const random2 = normalize(Math.sin(seed * 2))
      const random3 = normalize(Math.sin(seed * 3))
      const random4 = normalize(Math.sin(seed * 4))

      return {
        id: i,
        x: random1 * 100,
        y: random2 * 100,
        size: random3 * 2 + 1,
        duration: random4 * 5 + 7,
      }
    })
  }, [])

  return (
    <section id="contact" ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-ph-dark w-full overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L60 60 M60 0 L0 60' stroke='%23E31E24' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Red Particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bg-ph-red rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Tire Track Pattern Overlay */}
      <div className="absolute inset-0 tire-track-pattern opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 relative inline-block">
            <span className="glitch-text" data-text="ILETISIM">ILETISIM</span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '8rem' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-futura text-lg sm:text-xl text-gray-300 mb-10 sm:mb-14"
          >
            Soruların mı var? Bize ulaş!
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-10 sm:mb-14">
            {/* Twitter Card - Enhanced */}
            <motion.a
              href="https://x.com/i/communities/1914706125393391712"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{
                y: -10,
                rotateX: 8,
                rotateY: 5,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 sm:p-10 bg-gradient-to-br from-ph-black via-ph-dark to-ph-black border-2 border-ph-red/30 rounded-xl hover:border-ph-red transition-all duration-300 hover:shadow-2xl hover:glow-red-strong touch-manipulation cursor-pointer overflow-hidden"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-ph-red/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-10 h-10 border-t-2 border-l-2 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-1 -right-1 w-10 h-10 border-t-2 border-r-2 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-2 border-l-2 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-2 border-r-2 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="flex items-center justify-center mb-5 sm:mb-6 relative z-10">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="p-4 bg-ph-red/20 rounded-full border-2 border-ph-red group-hover:bg-ph-red/30 transition-colors duration-300"
                >
                  <svg className="w-12 h-12 sm:w-14 sm:h-14 text-ph-red" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.div>
              </div>

              <h3 className="relative font-race text-2xl sm:text-3xl text-white mb-3 text-center z-10 group-hover:text-ph-red transition-colors duration-300">
                Twitter / X
              </h3>
              <p className="relative font-futura text-base sm:text-lg text-gray-400 text-center z-10 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                @petrolheads
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-ph-red transition-all duration-300 group-hover:w-full" />
            </motion.a>

            {/* Community Card - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{
                y: -10,
                rotateX: 8,
                rotateY: -5,
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 sm:p-10 bg-gradient-to-br from-ph-black via-ph-dark to-ph-black border-2 border-ph-red/30 rounded-xl hover:border-ph-red transition-all duration-300 hover:shadow-2xl hover:glow-red-strong cursor-pointer overflow-hidden"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-ph-red/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-10 h-10 border-t-2 border-l-2 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -top-1 -right-1 w-10 h-10 border-t-2 border-r-2 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-2 border-l-2 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-2 border-r-2 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="flex items-center justify-center mb-5 sm:mb-6 relative z-10">
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="p-4 bg-ph-red/20 rounded-full border-2 border-ph-red group-hover:bg-ph-red/30 transition-colors duration-300"
                >
                  <span className="text-5xl sm:text-6xl">🚗</span>
                </motion.div>
              </div>

              <h3 className="relative font-race text-2xl sm:text-3xl text-white mb-3 text-center z-10 group-hover:text-ph-red transition-colors duration-300">
                Topluluk
              </h3>
              <p className="relative font-futura text-base sm:text-lg text-gray-400 text-center z-10 group-hover:text-gray-300 transition-colors duration-300 mb-4">
                23,000+ üye
              </p>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-ph-red transition-all duration-300 group-hover:w-full" />
            </motion.div>
          </div>

          {/* Info Box - Enhanced */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative p-6 sm:p-8 bg-gradient-to-br from-ph-black via-ph-dark to-ph-black rounded-xl border-2 border-ph-red/30 overflow-hidden"
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-ph-red/50" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-ph-red/50" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-ph-red/50" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-ph-red/50" />

            {/* Animated background accent */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-ph-red/5 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            <p className="relative font-futura text-sm sm:text-base md:text-lg text-gray-300 text-center leading-relaxed z-10">
              En iyi iletişim yolu bizimle <span className="text-ph-red font-bold">X (Twitter)</span> üzerinden bağlantı kurmak.
              Sorularını, önerilerini veya sadece merhaba demek istersen, bizi takip et!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


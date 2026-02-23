'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'

export default function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Background particles
  const particleCount = 40
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const seed = i * 0.22
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
        duration: random4 * 5 + 5,
      }
    })
  }, [])

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-ph-dark w-full overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L80 80 M80 0 L0 80' stroke='%23E31E24' stroke-width='2'/%3E%3C/svg%3E")`,
            backgroundSize: '80px 80px',
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
                y: [0, -40, 0],
                x: [0, Math.sin(particle.id) * 20, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.3, 1],
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Main Content Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative bg-gradient-to-br from-ph-black via-ph-dark to-ph-black border-4 border-ph-red/40 rounded-2xl p-8 sm:p-12 md:p-16 shadow-2xl overflow-hidden"
          >
            {/* Corner Accents */}
            <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-ph-red" />
            <div className="absolute -top-2 -right-2 w-16 h-16 border-t-4 border-r-4 border-ph-red" />
            <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-4 border-l-4 border-ph-red" />
            <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-ph-red" />

            {/* Background Glow */}
            <div className="absolute inset-0 bg-ph-red/5 rounded-2xl glow-red-strong" />

            {/* Diagonal Speed Lines */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
              <motion.div
                className="absolute top-1/4 -left-full w-full h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent transform -rotate-12"
                animate={{ x: ['0%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute top-1/2 -left-full w-full h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent transform -rotate-12"
                animate={{ x: ['0%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 0.5 }}
              />
              <motion.div
                className="absolute top-3/4 -left-full w-full h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent transform -rotate-12"
                animate={{ x: ['0%', '200%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', delay: 1 }}
              />
            </div>

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-race text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 sm:mb-8 relative"
              >
                <span className="glitch-text" data-text="SOHBETE KATIL">SOHBETE KATIL</span>
              </motion.h2>

              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: '12rem' } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1.5 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-6 sm:mb-8"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-futura text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 px-2 leading-relaxed"
              >
                Bizi X (Twitter)'da takip et ve Türkiye'nin en tutkulu otomobil topluluğunun bir parçası ol.
              </motion.p>

              <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                <motion.a
                  href="https://x.com/i/communities/1914706125393391712"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  whileHover={{
                    scale: 1.08,
                    rotate: [0, -1, 1, -1, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative inline-flex items-center justify-center space-x-3 sm:space-x-4 bg-ph-red text-white font-futura font-bold px-8 sm:px-12 md:px-16 py-4 sm:py-5 md:py-6 rounded-xl text-base sm:text-lg md:text-xl transition-all duration-300 glow-red-strong hover:shadow-2xl w-full sm:w-auto touch-manipulation overflow-hidden"
                >
                  {/* Button Background Animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-ph-red via-red-600 to-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />

                  <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span className="relative z-10 tracking-wide">@PETROLHEADS'I TAKIP ET</span>
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex items-center space-x-4 sm:space-x-6 bg-ph-black/50 border-2 border-ph-red/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-ph-red" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </motion.div>
                    <span className="font-futura font-bold text-white text-xl sm:text-2xl md:text-3xl">26,000+</span>
                    <span className="font-futura text-gray-400 text-base sm:text-lg">Takipçi</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Background particles
  const particleCount = 35
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const seed = i * 0.25
      const normalize = (value: number) => (value + 1) / 2
      const random1 = normalize(Math.sin(seed))
      const random2 = normalize(Math.sin(seed * 2))
      const random3 = normalize(Math.sin(seed * 3))
      const random4 = normalize(Math.sin(seed * 4))

      return {
        id: i,
        x: random1 * 100,
        y: random2 * 100,
        size: random3 * 2.5 + 1,
        duration: random4 * 4 + 6,
      }
    })
  }, [])

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-ph-black overflow-hidden w-full">
      {/* Diagonal Cut - Enhanced */}
      <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 md:h-20 lg:h-24 bg-gradient-to-br from-ph-dark via-ph-red/10 to-transparent transform -skew-y-2 border-b-2 border-ph-red/20" />

      {/* Background Pattern - Enhanced */}
      <div className="absolute inset-0 opacity-10">
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
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
                y: [0, -60, 0],
                opacity: [0.2, 0.9, 0.2],
                scale: [1, 1.5, 1],
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
      <div className="absolute inset-0 tire-track-pattern opacity-15 pointer-events-none" />

      {/* Animated Speed Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-1/4 -left-full w-full h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent"
          animate={{ x: ['0%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-2/4 -left-full w-full h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent"
          animate={{ x: ['0%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 0.5 }}
        />
        <motion.div
          className="absolute top-3/4 -left-full w-full h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent"
          animate={{ x: ['0%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: 1 }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading with Glitch */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 sm:mb-8 px-2 relative"
          >
            <span className="glitch-text" data-text="EKiBE KATILMAYA HAZIR MISIN?">
              EKiBE KATILMAYA HAZIR MISIN?
            </span>
          </motion.h2>

          {/* Animated Divider Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '16rem' } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-1.5 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-6 sm:mb-8"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-futura text-lg sm:text-xl md:text-2xl text-gray-300 mb-10 sm:mb-14 max-w-3xl mx-auto px-2 leading-relaxed"
          >
            Bizi X'te takip et ve Türkiye'nin en tutkulu otomobil topluluğunun bir parçası ol.
          </motion.p>

          {/* CTA Button - Enhanced */}
          <motion.a
            href="https://x.com/i/communities/1914706125393391712"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{
              scale: 1.1,
              rotate: [0, -2, 2, -2, 0],
              transition: { duration: 0.4 }
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center justify-center space-x-3 sm:space-x-5 bg-ph-red text-white font-futura font-bold px-8 sm:px-12 md:px-16 lg:px-20 py-5 sm:py-6 md:py-7 lg:py-8 rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-300 glow-red-strong hover:shadow-2xl mb-8 sm:mb-12 w-full sm:w-auto touch-manipulation overflow-hidden border-4 border-ph-red/50 hover:border-white/50"
          >
            {/* Animated Background Gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-ph-red via-red-700 to-ph-red"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ backgroundSize: '200% 200%' }}
            />

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            />

            {/* Corner Accents on Button */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <motion.svg
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 relative z-10"
              fill="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </motion.svg>
            <span className="relative z-10 tracking-wide">@PETROLHEADS'I TAKIP EDIN</span>
          </motion.a>

          {/* Başvuru CTA Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/basvuru">
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -1, 1, -1, 0] }}
                className="inline-flex items-center space-x-3 sm:space-x-4 bg-gradient-to-r from-ph-dark via-ph-black to-ph-dark border-2 border-ph-red/40 px-6 sm:px-8 py-3 sm:py-4 rounded-full backdrop-blur-sm hover:border-ph-red transition-all duration-300 cursor-pointer"
              >
                <motion.span
                  className="text-2xl sm:text-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  🏁
                </motion.span>
                <span className="font-futura text-gray-300 font-bold text-sm sm:text-base md:text-lg">
                  Özel Sürüş Kulübü
                </span>
                <div className="w-1 h-6 bg-ph-red/50" />
                <span className="font-race text-ph-red text-sm sm:text-base md:text-lg">
                  HEMEN BASVUR
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}


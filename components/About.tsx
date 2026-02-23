'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect, useMemo } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMounted, setIsMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    setIsMounted(true)
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Animated counters
  const [counts, setCounts] = useState({ members: 0, year: 0 })

  useEffect(() => {
    if (isInView) {
      // Animate member count
      let memberCount = 0
      const memberTarget = 23000
      const memberInterval = setInterval(() => {
        memberCount += 500
        if (memberCount >= memberTarget) {
          memberCount = memberTarget
          clearInterval(memberInterval)
        }
        setCounts(prev => ({ ...prev, members: memberCount }))
      }, 20)

      // Animate year
      let yearCount = 2000
      const yearTarget = 2025
      const yearInterval = setInterval(() => {
        yearCount += 1
        if (yearCount >= yearTarget) {
          yearCount = yearTarget
          clearInterval(yearInterval)
        }
        setCounts(prev => ({ ...prev, year: yearCount }))
      }, 40)

      return () => {
        clearInterval(memberInterval)
        clearInterval(yearInterval)
      }
    }
  }, [isInView])

  const stats = [
    { value: counts.members > 0 ? `${(counts.members / 1000).toFixed(0)}K+` : '23K+', label: 'Üye', isCounter: true },
    { value: counts.year > 0 ? counts.year.toString() : '2025', label: 'Kuruluş', isCounter: true },
    { value: '🇹🇷', label: 'TR', isCounter: false },
  ]

  // Red particles
  const particleCount = 20
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const seed = i * 0.15
      const normalize = (value: number) => (value + 1) / 2
      const random1 = normalize(Math.sin(seed))
      const random2 = normalize(Math.sin(seed * 2))
      const random3 = normalize(Math.sin(seed * 3))
      const random4 = normalize(Math.sin(seed * 4))
      const random5 = normalize(Math.sin(seed * 5))

      return {
        id: i,
        initialX: random1 * 100, // percentage
        initialY: random2 * 100,
        targetY: random3 * 100,
        duration: random4 * 3 + 4,
        delay: random5 * 1.5,
      }
    })
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-ph-black w-full overflow-hidden">
      {/* Checkered Flag Divider */}
      <div className="h-8 sm:h-10 md:h-12 lg:h-16 checkered-red" />

      {/* Background Particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-ph-red rounded-full"
              style={{
                left: `${particle.initialX}%`,
              }}
              initial={{
                y: `${particle.initialY}%`,
                opacity: 0.4,
              }}
              animate={{
                y: `${particle.targetY}%`,
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      )}

      {/* Tire Track Pattern Overlay */}
      <div className="absolute inset-0 tire-track-pattern opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <h2 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 relative">
              <span className="glitch-text" data-text="BIZ KIMIZ?">BIZ KIMIZ?</span>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="font-futura text-base sm:text-lg md:text-xl text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                Otomobillere, mühendisliğine ve sürüşlerine olan ortak tutkumuzdan doğduk.
                Petrolheads, Türkiye'nin en hızlı büyüyen otomobil topluluğu — 26,000+ üye ve sayı artıyor.
              </p>
              <p className="font-futura text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed">
                Biz sadece araba tutkunları değiliz. Aynı tutkuyu paylaşan insanların bir araya geldiği,
                gerçek dostlukların kurulduğu bir aileyiz.
              </p>
            </motion.div>

            {/* Red accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-ph-red to-transparent mt-6"
            />
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 order-1 md:order-2"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{
                  y: -8,
                  rotateX: 5,
                  rotateY: 5,
                  transition: { duration: 0.2 }
                }}
                className="group relative text-center p-3 sm:p-4 md:p-6 bg-gradient-to-br from-ph-dark to-ph-black rounded-lg border-2 border-ph-red/30 hover:border-ph-red transition-all duration-300 hover:shadow-2xl hover:glow-red-strong cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-ph-red/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Diagonal accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-ph-red/10 transform rotate-45 translate-x-6 -translate-y-6 group-hover:bg-ph-red/20 transition-colors duration-300" />

                <div className="relative z-10">
                  <div className="font-race text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-ph-red mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="font-futura text-xs sm:text-sm md:text-base text-gray-400 uppercase tracking-wider group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-ph-red transition-all duration-300 group-hover:w-full" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}


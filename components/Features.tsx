'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useMemo, useState, useEffect } from 'react'

const features = [
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round"/>
      </svg>
    ),
    title: 'ETKİNLİKLER',
    description: 'Topluluğumuzla bir araya gelip asfaltın nabzını tutuyoruz. Buluşmalar, sürüşler ve unutulmaz anılar burada şekilleniyor.',
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round"/>
      </svg>
    ),
    title: 'TEKNİK SOHBET',
    description: 'Motorun kalbinden süspansiyona kadar tüm detayları masaya yatırıyoruz. Bilgiyi paylaşıp hep birlikte daha güçlü hale geliyoruz.',
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round"/>
        <path d="M8 9h8M8 13h6" strokeLinecap="round"/>
      </svg>
    ),
    title: 'GÜNLÜK TARTIŞMALAR',
    description: 'Garaj sohbetlerinden yola çıkıp tüm otomotiv dünyasına uzanan canlı konuşmalar. Her gün yeni bir fikir, yeni bir heyecan.',
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round"/>
        <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeLinecap="round"/>
      </svg>
    ),
    title: 'GELECEK ETKİNLİKLER',
    description: 'Yaklaşan sürüşler ve planlanan buluşmalar için hazırlıkları burada takip edebilirsin. Takvimini ayarla, yakında görüşürüz!',
  },
]

export default function Features() {
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
      const seed = i * 0.2
      const normalize = (value: number) => (value + 1) / 2
      const random1 = normalize(Math.sin(seed))
      const random2 = normalize(Math.sin(seed * 2))
      const random3 = normalize(Math.sin(seed * 3))
      const random4 = normalize(Math.sin(seed * 4))

      return {
        id: i,
        x: random1 * 100,
        y: random2 * 100,
        size: random3 * 3 + 1,
        duration: random4 * 3 + 5,
      }
    })
  }, [])

  return (
    <section id="features" ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-ph-dark w-full overflow-hidden">
      {/* Animated Background Pattern */}
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
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 sm:mb-4 relative inline-block">
            <span className="glitch-text" data-text="BİZİ YÖNLENDİREN">BİZİ YÖNLENDİREN</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '6rem' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{
                y: -12,
                rotateX: 8,
                rotateY: 5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative p-5 sm:p-6 md:p-8 bg-gradient-to-br from-ph-black via-ph-black to-ph-dark border-2 border-ph-red/20 rounded-lg hover:border-ph-red transition-all duration-300 hover:shadow-2xl hover:glow-red-strong cursor-pointer"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-ph-red/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Top Corner Accent */}
              <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-ph-red/0 group-hover:border-ph-red transition-all duration-300" />
              <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-ph-red/0 group-hover:border-ph-red transition-all duration-300" />

              {/* Icon */}
              <motion.div
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-4 sm:mb-6 text-ph-red relative z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>

              {/* Title with glitch effect on hover */}
              <h3 className="relative font-race text-xl sm:text-2xl text-white mb-2 sm:mb-3 z-10 group-hover:text-ph-red transition-colors duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="relative font-futura text-sm sm:text-base text-gray-400 leading-relaxed z-10 group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Animated bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-ph-red via-ph-red to-transparent"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4 }}
              />

              {/* Diagonal Speed Lines */}
              <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute -right-full top-0 w-full h-0.5 bg-gradient-to-r from-transparent via-ph-red to-transparent transform rotate-45 group-hover:right-0 transition-all duration-500" />
                <div className="absolute -right-full top-1/3 w-full h-0.5 bg-gradient-to-r from-transparent via-ph-red to-transparent transform rotate-45 group-hover:right-0 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


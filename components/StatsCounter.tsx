'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 23000, suffix: '+', label: 'Topluluk Üyesi', icon: '👥' },
  { value: 150, suffix: '+', label: 'Etkinlik', icon: '🏁' },
  { value: 50, suffix: '+', label: 'Şehir', icon: '📍' },
  { value: 2025, suffix: '', label: 'Kuruluş', icon: '🔥' },
]

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    let startTime: number
    const duration = 2000

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setDisplayValue(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [inView, value])

  return (
    <span>
      {displayValue.toLocaleString('tr-TR')}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-ph-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-ph-dark via-ph-black to-ph-dark" />

      {/* Red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-ph-red/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-ph-dark to-ph-black border border-ph-red/30 rounded-2xl p-6 sm:p-8 text-center hover:border-ph-red transition-all duration-300">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                  className="text-4xl sm:text-5xl mb-4"
                >
                  {stat.icon}
                </motion.div>

                {/* Number */}
                <div className="font-race text-3xl sm:text-4xl md:text-5xl text-white mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={isInView} />
                </div>

                {/* Label */}
                <p className="font-futura text-gray-400 text-sm sm:text-base uppercase tracking-wider">
                  {stat.label}
                </p>

                {/* Bottom accent */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  className="absolute bottom-0 left-0 h-1 bg-ph-red rounded-b-2xl"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

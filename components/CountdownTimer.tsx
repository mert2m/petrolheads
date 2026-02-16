'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Next event date - update this to your next event
const NEXT_EVENT_DATE = new Date('2025-02-15T14:00:00')
const EVENT_NAME = 'WINTER CRUISE 2025'
const EVENT_LOCATION = 'Istanbul, Kadikoy'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const difference = NEXT_EVENT_DATE.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeBlock({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -30 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.05, rotateY: 5 }}
        className="relative bg-gradient-to-br from-ph-black via-ph-dark to-ph-black border-2 border-ph-red/40 rounded-xl p-4 sm:p-6 md:p-8 min-w-[70px] sm:min-w-[90px] md:min-w-[120px] overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-ph-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-ph-red opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-ph-red opacity-50 group-hover:opacity-100 transition-opacity" />

        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white text-center relative z-10"
        >
          {String(value).padStart(2, '0')}
        </motion.div>
        <div className="font-futura text-xs sm:text-sm text-gray-400 uppercase tracking-wider text-center mt-2 relative z-10">
          {label}
        </div>

        {/* Animated bottom line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-ph-red"
          initial={{ width: '0%' }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default function CountdownTimer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Particles
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const seed = i * 0.25
      const normalize = (value: number) => (value + 1) / 2
      return {
        id: i,
        x: normalize(Math.sin(seed)) * 100,
        y: normalize(Math.sin(seed * 2)) * 100,
        duration: normalize(Math.sin(seed * 3)) * 4 + 4,
        delay: normalize(Math.sin(seed * 4)) * 2,
      }
    })
  }, [])

  const timeBlocks = [
    { value: timeLeft.days, label: 'Gun' },
    { value: timeLeft.hours, label: 'Saat' },
    { value: timeLeft.minutes, label: 'Dakika' },
    { value: timeLeft.seconds, label: 'Saniye' },
  ]

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 bg-ph-black overflow-hidden">
      {/* Checkered pattern */}
      <div className="h-8 sm:h-10 md:h-12 checkered-red" />

      {/* Background particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-ph-red rounded-full"
              style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
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

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L60 60 M60 0 L0 60' stroke='%23E31E24' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-ph-red/20 border border-ph-red/50 rounded-full px-4 py-1 mb-4"
          >
            <span className="font-futura text-ph-red text-sm uppercase tracking-wider">
              Sonraki Etkinlik
            </span>
          </motion.div>

          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            <span className="glitch-text" data-text={EVENT_NAME}>{EVENT_NAME}</span>
          </h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '8rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-4"
          />

          <p className="font-futura text-gray-400 text-base sm:text-lg flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-ph-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {EVENT_LOCATION}
          </p>
        </motion.div>

        {/* Countdown */}
        {isMounted && (
          <div className="flex justify-center items-center gap-2 sm:gap-4 md:gap-6 flex-wrap">
            {timeBlocks.map((block, index) => (
              <TimeBlock
                key={block.label}
                value={block.value}
                label={block.label}
                delay={0.3 + index * 0.1}
              />
            ))}
          </div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8 sm:mt-12"
        >
          <motion.a
            href="https://x.com/i/communities/1914706125393391712"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-ph-red text-white font-futura font-bold px-8 py-4 rounded-xl hover:bg-ph-red/90 transition-colors glow-red-strong"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            ETKINLIGE KATIL
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

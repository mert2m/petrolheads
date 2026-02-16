'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Pre-calculate particle positions to avoid SSR issues
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => {
      const seed = i * 0.15
      const normalize = (value: number) => (value + 1) / 2
      return {
        id: i,
        x: normalize(Math.sin(seed)) * 100, // percentage
        y: normalize(Math.sin(seed * 2)) * 100,
        targetY: normalize(Math.sin(seed * 3)) * -200,
        duration: normalize(Math.sin(seed * 4)) * 2 + 1,
        delay: normalize(Math.sin(seed * 5)) * 2,
      }
    })
  }, [])

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-ph-black flex flex-col items-center justify-center"
        >
          {/* Spinning Wheel */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mb-8">
            {/* Outer Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Tire */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#2D2D2D"
                  strokeWidth="8"
                />
                {/* Tire Treads */}
                {[...Array(12)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="5"
                    x2="50"
                    y2="12"
                    stroke="#1A1A1A"
                    strokeWidth="3"
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
                {/* Red Accent */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#E31E24"
                  strokeWidth="8"
                  strokeDasharray={`${progress * 2.83} 283`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-100"
                />
              </svg>
            </motion.div>

            {/* Inner Rim */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="#1A1A1A"
                  stroke="#E31E24"
                  strokeWidth="2"
                />
                {/* Spokes */}
                {[...Array(5)].map((_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="15"
                    x2="50"
                    y2="40"
                    stroke="#E31E24"
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform={`rotate(${i * 72} 50 50)`}
                  />
                ))}
                {/* Center Hub */}
                <circle cx="50" cy="50" r="10" fill="#E31E24" />
                <circle cx="50" cy="50" r="5" fill="#1A1A1A" />
              </svg>
            </motion.div>
          </div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <h2 className="font-race text-2xl sm:text-3xl text-white mb-2">
              PETROL HEADS
            </h2>
            <p className="font-futura text-gray-400 text-sm">
              Motor çalıştırılıyor...
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mt-8 w-48 sm:w-64 h-1 bg-ph-dark rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ph-red"
              style={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress Text */}
          <p className="font-futura text-ph-red text-sm mt-2">
            {Math.min(Math.round(progress), 100)}%
          </p>

          {/* Red Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 bg-ph-red rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: [0, particle.targetY],
                  opacity: [0.3, 0.8, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

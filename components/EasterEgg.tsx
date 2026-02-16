'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Konami Code: ↑↑↓↓←→←→BA
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

export default function EasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length)
      setInputSequence(newSequence)

      // Check if sequence matches
      if (JSON.stringify(newSequence) === JSON.stringify(KONAMI_CODE)) {
        setIsActivated(true)
        setInputSequence([])

        // Auto-hide after 5 seconds
        setTimeout(() => setIsActivated(false), 5000)
      }
    },
    [inputSequence]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Show hint after 30 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 30000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Hint */}
      <AnimatePresence>
        {showHint && !isActivated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ph-dark/90 backdrop-blur-sm border border-ph-red/30 px-4 py-2 rounded-lg"
          >
            <p className="font-futura text-xs text-gray-400">
              Psst... ↑↑↓↓←→←→BA dene 🎮
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg Animation */}
      <AnimatePresence>
        {isActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
          >
            {/* Background overlay */}
            <div className="absolute inset-0 bg-ph-black/80" />

            {/* Racing cars animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-6xl sm:text-8xl"
                  initial={{ x: '-100%', y: `${20 + i * 15}%` }}
                  animate={{ x: '200%' }}
                  transition={{
                    duration: 1 + i * 0.2,
                    delay: i * 0.1,
                    ease: 'linear',
                  }}
                >
                  🏎️
                </motion.div>
              ))}
            </div>

            {/* Checkered flag */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="relative z-10 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-8xl sm:text-9xl mb-4"
              >
                🏁
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-race text-3xl sm:text-5xl text-white mb-2"
              >
                TURBO ACTIVATED!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-futura text-ph-red text-lg"
              >
                🔥 +100 HP 🔥
              </motion.p>
            </motion.div>

            {/* Confetti/sparks */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#E31E24' : '#FFD700',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ x: 0, y: 0, scale: 0 }}
                animate={{
                  x: (Math.random() - 0.5) * 500,
                  y: (Math.random() - 0.5) * 500,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Speed lines */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`line-${i}`}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-ph-red to-transparent"
                style={{
                  width: `${Math.random() * 200 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: '-200px',
                }}
                animate={{ x: window.innerWidth + 400 }}
                transition={{
                  duration: 0.5 + Math.random() * 0.5,
                  delay: Math.random() * 0.5,
                  ease: 'linear',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

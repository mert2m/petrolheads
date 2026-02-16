'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function NitroBoost() {
  const [isActivated, setIsActivated] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [clickCount, setClickCount] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const activateNitro = useCallback(() => {
    if (isActivated) return

    setIsActivated(true)
    setClickCount((prev) => prev + 1)

    // Add screen shake effect
    document.body.style.animation = 'shake 0.5s ease-in-out'

    // Auto-hide after animation
    setTimeout(() => {
      setIsActivated(false)
      document.body.style.animation = ''
    }, 2000)
  }, [isActivated])

  if (!isMounted) return null

  return (
    <>
      {/* Shake animation keyframes */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>

      {/* Nitro Button */}
      <motion.button
        onClick={activateNitro}
        disabled={isActivated}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', delay: 2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-50 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-2xl flex items-center justify-center text-white font-race text-xs sm:text-sm overflow-hidden group border-2 border-blue-400/50"
        style={{
          boxShadow: isActivated
            ? '0 0 60px rgba(59, 130, 246, 0.8), 0 0 100px rgba(59, 130, 246, 0.4)'
            : '0 0 30px rgba(59, 130, 246, 0.4)',
        }}
      >
        {/* Animated rings */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-300/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-blue-300/20" />

        {/* Icon */}
        <motion.div
          animate={isActivated ? { scale: [1, 1.5, 1], rotate: 360 } : {}}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>

        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-400/0 to-blue-300/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />

        {/* Click counter badge */}
        {clickCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-6 h-6 bg-ph-red rounded-full flex items-center justify-center text-xs font-bold"
          >
            {clickCount}
          </motion.div>
        )}
      </motion.button>

      {/* Nitro Effect Overlay */}
      <AnimatePresence>
        {isActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
          >
            {/* Blue tint overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-blue-500/20"
            />

            {/* Speed lines */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                style={{
                  width: `${Math.random() * 300 + 100}px`,
                  top: `${Math.random() * 100}%`,
                  left: '-300px',
                }}
                animate={{ x: [0, window.innerWidth + 600] }}
                transition={{
                  duration: 0.3 + Math.random() * 0.3,
                  delay: Math.random() * 0.5,
                  ease: 'linear',
                }}
              />
            ))}

            {/* Blue fire particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`fire-${i}`}
                className="absolute w-4 h-4 rounded-full"
                style={{
                  background: `radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%)`,
                  right: `${Math.random() * 200}px`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                initial={{ scale: 0, x: 0 }}
                animate={{
                  scale: [0, 1.5, 0],
                  x: [-100, -400],
                  y: [0, (Math.random() - 0.5) * 100],
                }}
                transition={{
                  duration: 0.8,
                  delay: Math.random() * 0.3,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Center flash */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 3, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-blue-400/50 blur-xl"
            />

            {/* NOS text */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: [0, 1.5, 1], rotate: 0 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <h2 className="font-race text-6xl sm:text-8xl text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]">
                NOS!
              </h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-futura text-white text-lg mt-2"
              >
                +100 HP BOOST
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

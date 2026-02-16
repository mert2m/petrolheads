'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Local engine sound file
const ENGINE_SOUND_URL = '/engine.mp3'

export default function MotorSound() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [showControls, setShowControls] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRevving, setIsRevving] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)

    // Preload audio
    const audio = new Audio(ENGINE_SOUND_URL)
    audio.loop = true
    audio.volume = volume
    audio.preload = 'auto'
    audioRef.current = audio

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  // Update volume when slider changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const toggleSound = useCallback(async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      try {
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Audio playback failed:', error)
      }
      setIsLoading(false)
    }
  }, [isPlaying])

  const handleRevv = useCallback(() => {
    if (!audioRef.current || !isPlaying) return

    setIsRevving(true)
    audioRef.current.playbackRate = 1.4

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.playbackRate = 1.0
      }
      setIsRevving(false)
    }, 1000)
  }, [isPlaying])

  if (!isMounted) return null

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 left-6 z-50"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Volume Control Panel */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-0 mb-4 bg-ph-dark/95 backdrop-blur-sm border border-ph-red/40 rounded-xl p-4 shadow-2xl min-w-[200px]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ph-red/20">
              <div className="w-3 h-3 rounded-full bg-ph-red animate-pulse" />
              <span className="font-race text-white text-sm">V8 ENGINE</span>
            </div>

            {/* Volume Control */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-futura text-xs text-gray-400 uppercase">Volume</span>
                <span className="font-race text-ph-red text-sm">{Math.round(volume * 100)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16z" />
                </svg>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="flex-1 h-2 bg-ph-black rounded-lg appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-ph-red
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-lg
                    [&::-webkit-slider-thumb]:shadow-ph-red/50
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-ph-red
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:border-0"
                  style={{
                    background: `linear-gradient(to right, #E31E24 0%, #E31E24 ${volume * 100}%, #1A1A1A ${volume * 100}%, #1A1A1A 100%)`
                  }}
                />
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5.889 16H2a1 1 0 01-1-1V9a1 1 0 011-1h3.889l5.294-4.332a.5.5 0 01.817.387v15.89a.5.5 0 01-.817.387L5.89 16zM17.5 12a4.5 4.5 0 00-2.25-3.897v7.794A4.5 4.5 0 0017.5 12z" />
                </svg>
              </div>
            </div>

            {/* Rev Button */}
            {isPlaying && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleRevv}
                disabled={isRevving}
                className={`w-full py-3 rounded-lg font-race text-sm uppercase tracking-wider transition-all ${
                  isRevving
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white'
                    : 'bg-ph-black border border-ph-red/40 text-ph-red hover:bg-ph-red hover:text-white'
                }`}
              >
                {isRevving ? 'VROOOOM!' : 'GAZ BAS'}
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={toggleSound}
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', delay: 2.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        disabled={isLoading}
        className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden border-2 transition-all duration-300 ${
          isPlaying
            ? 'bg-gradient-to-br from-ph-red via-red-600 to-red-800 border-red-400/50'
            : 'bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-gray-600/50 hover:border-ph-red/50'
        }`}
        style={{
          boxShadow: isPlaying
            ? '0 0 40px rgba(227, 30, 36, 0.6), 0 0 80px rgba(227, 30, 36, 0.3)'
            : '0 0 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Animated rings when playing */}
        {isPlaying && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-ph-red/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-ph-red/20"
              animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-t-ph-red border-r-transparent border-b-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        )}

        {/* Icon */}
        <motion.div
          animate={
            isRevving
              ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }
              : isPlaying
              ? { rotate: [0, 3, -3, 0] }
              : {}
          }
          transition={{
            duration: isRevving ? 0.5 : 0.4,
            repeat: isPlaying && !isRevving ? Infinity : 0,
          }}
          className="relative z-10"
        >
          {isPlaying ? (
            // Engine running icon
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4v2h3v2H7l-2 2v3H3v-3H1v8h2v-3h2v3h3l2 2h8l2-2v-3h2v3h2v-8h-2v3h-2v-3l-2-2h-3V6h3V4H7zm3 8h4v6h-4v-6z" />
            </svg>
          ) : (
            // Engine off icon
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 4v2h3v2H7l-2 2v3H3v-3H1v8h2v-3h2v3h3l2 2h8l2-2v-3h2v3h2v-8h-2v3h-2v-3l-2-2h-3V6h3V4H7z" opacity="0.5" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Status Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className={`absolute -right-2 -top-2 px-2 py-1 rounded-full text-xs font-race ${
          isPlaying
            ? 'bg-ph-red text-white'
            : 'bg-gray-800 text-gray-400'
        }`}
      >
        {isLoading ? '...' : isPlaying ? 'ON' : 'OFF'}
      </motion.div>

      {/* Exhaust smoke effect */}
      <AnimatePresence>
        {isRevving && (
          <div className="fixed bottom-0 left-0 pointer-events-none z-40">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-sm"
                style={{
                  width: `${20 + Math.random() * 20}px`,
                  height: `${20 + Math.random() * 20}px`,
                  background: `rgba(100, 100, 100, ${0.3 + Math.random() * 0.2})`,
                  left: `${80 + i * 15}px`,
                  bottom: `${40 + Math.random() * 30}px`,
                }}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{
                  scale: [0, 1.5, 2.5],
                  opacity: [0.5, 0.3, 0],
                  x: [0, 100 + i * 30],
                  y: [0, -50 - Math.random() * 50],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.08,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

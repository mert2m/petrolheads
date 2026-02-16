'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

// Typing effect component
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setIsStarted(true)
    }, delay * 1000)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!isStarted) return

    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, isStarted])

  return (
    <span className="relative">
      {displayedText}
      {isStarted && currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-[3px] h-[1em] bg-white ml-1 align-middle"
        />
      )}
    </span>
  )
}

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  // Parallax scroll effect
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 500], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3])
  const scale = useTransform(scrollY, [0, 500], [1, 1.1])

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

  // Pre-calculate particle positions to avoid hydration mismatches
  // Reduce particles on mobile for better performance
  const particleCount = dimensions.width < 640 ? 15 : 30
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const seed = i * 0.1 // Use index-based seed for consistency
      // Normalize Math.sin output (-1 to 1) to (0 to 1) range
      const normalize = (value: number) => (value + 1) / 2
      const random1 = normalize(Math.sin(seed))
      const random2 = normalize(Math.sin(seed * 2))
      const random3 = normalize(Math.sin(seed * 3))
      const random4 = normalize(Math.sin(seed * 4))
      const random5 = normalize(Math.sin(seed * 5))
      
      return {
        id: i,
        initialX: random1 * dimensions.width,
        initialY: random2 * dimensions.height,
        targetY: random3 * dimensions.height,
        duration: random4 * 4 + 3, // Between 3 and 7 seconds
        delay: random5 * 2, // Between 0 and 2 seconds
      }
    })
  }, [dimensions.width, dimensions.height, particleCount])

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY, scale }}
      >
        <Image
          src="/images/header.jpeg"
          alt="Petrolheads Background"
          fill
          className="object-cover opacity-30"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-ph-black/60" />
      </motion.div>

      {/* Tire Track Pattern Overlay */}
      <div className="absolute inset-0 z-[1] tire-track-pattern opacity-50" />

      {/* Red Particles */}
      {isMounted && (
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-ph-red rounded-full"
              initial={{
                x: particle.initialX,
                y: particle.initialY,
                opacity: 0.6,
              }}
              animate={{
                y: particle.targetY,
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

      {/* Main Content Container with Parallax */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-16 sm:py-20 md:py-24"
        style={{ y: textY, opacity }}
      >
        {/* Red Hero Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-5xl mx-auto"
        >
          {/* Red Background Block */}
          <div className="relative bg-ph-red px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-16 lg:py-24 rounded-lg shadow-2xl overflow-hidden">
            {/* Dark Bar Behind DRIVING SPIRIT */}
            <div className="absolute bottom-12 sm:bottom-14 md:bottom-16 lg:bottom-20 left-0 right-0 h-8 sm:h-10 md:h-12 lg:h-16 bg-ph-black/50 rounded-sm transform -skew-y-1" />
            
            {/* Red Square Pattern on Dark Bar */}
            <div className="absolute bottom-12 sm:bottom-14 md:bottom-16 lg:bottom-20 left-2 sm:left-3 md:left-4 lg:left-6 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-ph-red/90 transform -skew-y-1 border-2 border-white/20" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* PETROL HEADS - Main Title with Glitch */}
              <div className="relative mb-4 sm:mb-6 md:mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-race text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight leading-tight relative px-2"
                >
                  <span className="glitch-text block" data-text="PETROL HEADS">PETROL HEADS</span>
                </motion.h1>
              </div>

              {/* DRIVING SPIRIT - Subtitle with Typing Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="relative mb-4 sm:mb-6 md:mb-8 z-20"
              >
                <p className="font-race text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl text-white font-bold uppercase tracking-wider relative inline-block px-2">
                  {isMounted ? (
                    <TypewriterText text="DRIVING SPIRIT" delay={1.2} />
                  ) : (
                    <span className="opacity-0">DRIVING SPIRIT</span>
                  )}
                </p>
              </motion.div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="font-futura text-xs sm:text-sm md:text-base lg:text-lg text-white/90 mt-4 sm:mt-6 relative z-10 px-2"
              >
                Türkiye'nin En Tutkulu Otomotiv Topluluğu
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

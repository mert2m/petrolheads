'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function HeadlightEffect() {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Pre-define all springs at component level
  const springConfigSlow = { damping: 30, stiffness: 100 }
  const leftHeadlightX = useSpring(mouseX, springConfigSlow)
  const leftHeadlightY = useSpring(mouseY, springConfigSlow)
  const rightHeadlightX = useSpring(mouseX, springConfigSlow)
  const rightHeadlightY = useSpring(mouseY, springConfigSlow)

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] bg-ph-black overflow-hidden"
    >
      {/* Dark overlay - the headlight will reveal through this */}
      <div className="absolute inset-0 bg-ph-black z-10 pointer-events-none">
        {isMounted && (
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{
              x,
              y,
              translateX: '-50%',
              translateY: '-50%',
              background: `
                radial-gradient(
                  ellipse 300px 200px at center,
                  transparent 0%,
                  transparent 30%,
                  rgba(26, 26, 26, 0.3) 50%,
                  rgba(26, 26, 26, 0.7) 70%,
                  #1A1A1A 100%
                )
              `,
            }}
          />
        )}
        {/* Full cover that gets cut by the headlight */}
        {isMounted && (
          <motion.div
            className="absolute inset-0"
            style={{
              background: '#1A1A1A',
              maskImage: `radial-gradient(ellipse 300px 200px at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 30%, black 70%)`,
              WebkitMaskImage: `radial-gradient(ellipse 300px 200px at var(--mouse-x) var(--mouse-y), transparent 0%, transparent 30%, black 70%)`,
            }}
          />
        )}
      </div>

      {/* Headlight beams */}
      {isMounted && (
        <>
          {/* Left headlight */}
          <motion.div
            className="absolute w-[400px] h-[300px] pointer-events-none z-20"
            style={{
              x: leftHeadlightX,
              y: leftHeadlightY,
              translateX: '-70%',
              translateY: '-50%',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `
                  radial-gradient(
                    ellipse 100% 60% at 70% 50%,
                    rgba(255, 255, 200, 0.15) 0%,
                    rgba(255, 255, 200, 0.05) 40%,
                    transparent 70%
                  )
                `,
              }}
            />
          </motion.div>

          {/* Right headlight */}
          <motion.div
            className="absolute w-[400px] h-[300px] pointer-events-none z-20"
            style={{
              x: rightHeadlightX,
              y: rightHeadlightY,
              translateX: '-30%',
              translateY: '-50%',
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background: `
                  radial-gradient(
                    ellipse 100% 60% at 30% 50%,
                    rgba(255, 255, 200, 0.15) 0%,
                    rgba(255, 255, 200, 0.05) 40%,
                    transparent 70%
                  )
                `,
              }}
            />
          </motion.div>

          {/* Red accent glow */}
          <motion.div
            className="absolute w-[100px] h-[100px] pointer-events-none z-20"
            style={{
              x,
              y,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `
                  radial-gradient(
                    circle,
                    rgba(227, 30, 36, 0.3) 0%,
                    transparent 70%
                  )
                `,
              }}
            />
          </motion.div>
        </>
      )}

      {/* Content that gets revealed */}
      <div className="relative z-0 h-full min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="font-race text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 opacity-80">
            <span className="glitch-text" data-text="KARANLIKTA">KARANLIKTA</span>
          </h2>
          <p className="font-race text-2xl sm:text-3xl md:text-4xl text-ph-red">
            <span className="glitch-text" data-text="PARLIYORUZ">PARLIYORUZ</span>
          </p>
          <p className="font-futura text-gray-500 mt-8 text-sm sm:text-base">
            Mouse'u hareket ettir ve farları kontrol et
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ph-dark to-transparent z-30 pointer-events-none" />
    </section>
  )
}

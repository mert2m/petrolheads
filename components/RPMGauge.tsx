'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'

export default function RPMGauge() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [displayRpm, setDisplayRpm] = useState(0)
  const [displaySpeed, setDisplaySpeed] = useState(0)
  const [currentGear, setCurrentGear] = useState(1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  // Transform scroll to RPM (0 to 9000)
  const rpm = useTransform(scrollYProgress, [0, 1], [0, 9000])
  const smoothRpm = useSpring(rpm, { damping: 30, stiffness: 100 })

  // Transform scroll to needle rotation (-135 to 135 degrees)
  const needleRotation = useTransform(scrollYProgress, [0, 1], [-135, 135])
  const smoothNeedle = useSpring(needleRotation, { damping: 30, stiffness: 100 })

  // Speed (km/h) based on RPM
  const speed = useTransform(scrollYProgress, [0, 1], [0, 320])
  const smoothSpeed = useSpring(speed, { damping: 30, stiffness: 100 })

  // Listen to motion value changes
  useMotionValueEvent(smoothRpm, 'change', (latest) => {
    setDisplayRpm(Math.round(latest))
  })

  useMotionValueEvent(smoothSpeed, 'change', (latest) => {
    setDisplaySpeed(Math.round(latest))
  })

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.15) setCurrentGear(1)
    else if (latest < 0.3) setCurrentGear(2)
    else if (latest < 0.45) setCurrentGear(3)
    else if (latest < 0.6) setCurrentGear(4)
    else if (latest < 0.75) setCurrentGear(5)
    else setCurrentGear(6)
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] bg-ph-black overflow-hidden py-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L60 60 M60 0 L0 60' stroke='%23E31E24' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            <span className="glitch-text" data-text="PERFORMANS">PERFORMANS</span>
          </h2>
          <p className="font-futura text-gray-400">
            Scroll yaparak deviri artır
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* RPM Gauge */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              {/* Outer ring */}
              <circle
                cx="100"
                cy="100"
                r="95"
                fill="none"
                stroke="#2D2D2D"
                strokeWidth="4"
              />

              {/* Scale marks */}
              {[...Array(10)].map((_, i) => {
                const angle = -135 + i * 30
                const radian = (angle * Math.PI) / 180
                const x1 = 100 + 75 * Math.cos(radian)
                const y1 = 100 + 75 * Math.sin(radian)
                const x2 = 100 + 85 * Math.cos(radian)
                const y2 = 100 + 85 * Math.sin(radian)
                const textX = 100 + 63 * Math.cos(radian)
                const textY = 100 + 63 * Math.sin(radian)
                const isRedZone = i >= 7

                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isRedZone ? '#E31E24' : '#666'}
                      strokeWidth={i % 2 === 0 ? '3' : '1.5'}
                    />
                    {i % 2 === 0 && (
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isRedZone ? '#E31E24' : '#888'}
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {i}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Red zone arc */}
              <path
                d="M 100 100 L 176 40 A 85 85 0 0 1 185 100 L 100 100"
                fill="rgba(227, 30, 36, 0.2)"
                transform="rotate(45 100 100)"
              />

              {/* Inner circle */}
              <circle cx="100" cy="100" r="50" fill="#1A1A1A" />
              <circle
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke="#E31E24"
                strokeWidth="2"
                opacity="0.5"
              />

              {/* Needle */}
              {isMounted && (
                <motion.g style={{ rotate: smoothNeedle, transformOrigin: '100px 100px' }}>
                  <polygon
                    points="100,25 103,95 100,100 97,95"
                    fill="#E31E24"
                  />
                  <circle cx="100" cy="100" r="8" fill="#E31E24" />
                  <circle cx="100" cy="100" r="4" fill="#1A1A1A" />
                </motion.g>
              )}

              {/* RPM text */}
              <text
                x="100"
                y="130"
                textAnchor="middle"
                fill="white"
                fontSize="8"
                fontFamily="sans-serif"
              >
                RPM x1000
              </text>
            </svg>

            {/* Digital RPM Display */}
            {isMounted && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
                <span className="font-race text-3xl sm:text-4xl text-ph-red">
                  {displayRpm}
                </span>
                <span className="font-futura text-gray-400 text-sm ml-2">RPM</span>
              </div>
            )}
          </div>

          {/* Speed Display */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            <div className="text-center">
              {isMounted && (
                <>
                  <div className="font-race text-6xl sm:text-8xl text-white mb-2">
                    {displaySpeed}
                  </div>
                  <div className="font-futura text-xl text-gray-400">KM/H</div>

                  {/* Gear indicator */}
                  <div className="mt-6 inline-block px-6 py-3 bg-ph-dark border-2 border-ph-red rounded-lg">
                    <span className="font-race text-2xl text-ph-red">
                      {currentGear}
                    </span>
                    <span className="font-futura text-gray-500 ml-2">VİTES</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="h-2 bg-ph-dark rounded-full overflow-hidden">
            {isMounted && (
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-ph-red"
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

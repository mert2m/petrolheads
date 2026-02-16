'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'
import Image from 'next/image'

export default function CarShowcase() {
  const ref = useRef(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isMounted, setIsMounted] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 bg-ph-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ph-dark via-ph-black to-ph-dark" />

      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-ph-red/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            <span className="glitch-text" data-text="SHOWROOM">SHOWROOM</span>
          </h2>
          <p className="font-futura text-gray-400">Mouse ile döndür</p>
        </motion.div>

        {/* 3D Car Container */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative max-w-3xl mx-auto aspect-video cursor-grab active:cursor-grabbing"
          style={{ perspective: '1000px' }}
        >
          {isMounted && (
            <motion.div
              style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative w-full h-full"
            >
              {/* Car Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-ph-red/30">
                <Image
                  src="/images/header.jpeg"
                  alt="Showcase Car"
                  fill
                  className="object-cover"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-ph-black/80 via-transparent to-transparent" />

                {/* Reflection effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent"
                  style={{
                    rotateX: springRotateX,
                    rotateY: springRotateY,
                  }}
                />
              </div>

              {/* Shadow */}
              <div
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-ph-red/20 blur-xl rounded-full"
                style={{ transform: 'translateZ(-50px)' }}
              />

              {/* 3D depth layers */}
              <div
                className="absolute inset-0 border-2 border-ph-red/10 rounded-2xl"
                style={{ transform: 'translateZ(20px)' }}
              />
            </motion.div>
          )}

          {/* Corner indicators */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-ph-red" />
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-ph-red" />
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-ph-red" />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-ph-red" />
        </motion.div>

        {/* Info badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center gap-4 mt-8 flex-wrap"
        >
          {['450 HP', 'V8 MOTOR', '0-100: 4.2s', 'RWD'].map((spec, i) => (
            <motion.div
              key={spec}
              whileHover={{ scale: 1.1, y: -5 }}
              className="bg-ph-dark border border-ph-red/40 px-4 py-2 rounded-lg"
            >
              <span className="font-race text-ph-red text-sm">{spec}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

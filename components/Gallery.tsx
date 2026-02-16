'use client'

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useMemo, useEffect } from 'react'
import Image from 'next/image'

// Placeholder images - replace with actual gallery images
const galleryImages = [
  { id: 1, src: '/images/header.jpeg', alt: 'Car 1', title: 'POWER' },
  { id: 2, src: '/images/maskot.jpeg', alt: 'Car 2', title: 'SPEED' },
  { id: 3, src: '/images/header.jpeg', alt: 'Car 3', title: 'STYLE' },
  { id: 4, src: '/images/maskot.jpeg', alt: 'Car 4', title: 'LEGEND' },
  { id: 5, src: '/images/header.jpeg', alt: 'Car 5', title: 'BEAST' },
  { id: 6, src: '/images/maskot.jpeg', alt: 'Car 6', title: 'ICON' },
]

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Background particles
  const particleCount = 30
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const seed = i * 0.18
      const normalize = (value: number) => (value + 1) / 2
      const random1 = normalize(Math.sin(seed))
      const random2 = normalize(Math.sin(seed * 2))
      const random3 = normalize(Math.sin(seed * 3))
      const random4 = normalize(Math.sin(seed * 4))

      return {
        id: i,
        x: random1 * 100,
        y: random2 * 100,
        duration: random3 * 4 + 6,
        delay: random4 * 2,
      }
    })
  }, [])

  return (
    <>
      <section id="gallery" ref={ref} className="relative py-12 sm:py-16 md:py-20 lg:py-28 bg-ph-black w-full overflow-hidden">
        {/* Checkered Flag Divider */}
        <div className="h-8 sm:h-10 md:h-12 lg:h-16 checkered-pattern" />

        {/* Background Particles */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1.5 h-1.5 bg-ph-red rounded-full"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.2, 0.7, 0.2],
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

        {/* Tire Track Pattern Overlay */}
        <div className="absolute inset-0 tire-track-pattern opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-3 sm:mb-4 relative inline-block">
              <span className="glitch-text" data-text="GALERİ">GALERİ</span>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: '8rem' } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-4"
            />
            <p className="font-futura text-gray-400 text-base sm:text-lg">
              Türk otomotiv kültürünün ruhunu yakalıyoruz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: hoveredImage === image.id ? 3 : 0,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredImage(image.id)}
                onHoverEnd={() => setHoveredImage(null)}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedImage(image.id)}
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                {/* Image */}
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-125 group-hover:rotate-2"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Border Frame */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-ph-red transition-all duration-300 z-10 pointer-events-none" />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-ph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ph-black via-ph-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Red Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-ph-red/0 via-ph-red/20 to-ph-red/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="font-race text-2xl sm:text-3xl md:text-4xl text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <span className="glitch-text" data-text={image.title}>{image.title}</span>
                  </motion.div>
                </div>

                {/* Speed Lines Effect */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                  <motion.div
                    className="absolute top-1/2 -left-full w-full h-0.5 bg-gradient-to-r from-transparent via-ph-red to-transparent"
                    animate={hoveredImage === image.id ? { x: ['0%', '200%'] } : {}}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute top-1/3 -left-full w-full h-0.5 bg-gradient-to-r from-transparent via-ph-red to-transparent"
                    animate={hoveredImage === image.id ? { x: ['0%', '200%'] } : {}}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute top-2/3 -left-full w-full h-0.5 bg-gradient-to-r from-transparent via-ph-red to-transparent"
                    animate={hoveredImage === image.id ? { x: ['0%', '200%'] } : {}}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear', delay: 0.4 }}
                  />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-red-strong pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ph-black/98 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Background particles in lightbox */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
              {particles.slice(0, 15).map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 bg-ph-red rounded-full"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                  }}
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

            <motion.div
              initial={{ scale: 0.8, rotateX: -20 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.8, rotateX: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-5xl max-h-[95vh] sm:max-h-[90vh] w-full h-full"
            >
              <div className="relative w-full h-full border-4 border-ph-red/50 rounded-lg overflow-hidden glow-red-strong">
                <Image
                  src={galleryImages.find(img => img.id === selectedImage)?.src || ''}
                  alt="Gallery image"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(null)
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 text-white text-xl sm:text-2xl font-bold bg-ph-red w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center hover:bg-ph-red/80 transition-colors touch-manipulation shadow-lg glow-red z-10"
                aria-label="Close gallery"
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


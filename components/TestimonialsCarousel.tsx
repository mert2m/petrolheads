'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Ahmet Yilmaz',
    role: 'BMW M3 Sahibi',
    avatar: 'A',
    text: 'Petrolheads sayesinde hayatimin en iyi araba arkadaşlarını buldum. Her hafta sonu bir araya gelip tutkunuzu paylaşmak paha biçilemez!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mehmet Kaya',
    role: 'VW Golf GTI Tutkunu',
    avatar: 'M',
    text: 'Teknik bilgi paylaşımı inanılmaz. Arabamdaki her modifikasyonu topluluktan öğrendim. Gerçek bir aile ortamı!',
    rating: 5,
  },
  {
    id: 3,
    name: 'Can Demir',
    role: 'Mustang GT Koleksiyoncusu',
    avatar: 'C',
    text: 'Organizasyonlar profesyonelce planlanıyor. Her etkinlik unutulmaz anılarla dolu. Kesinlikle tavsiye ederim!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Emre Ozturk',
    role: 'Subaru WRX STI',
    avatar: 'E',
    text: 'Rally severlerin buluşma noktası! Türkiyenin her yerinden insanlarla tanıştım. Muhteşem bir topluluk!',
    rating: 5,
  },
]

export default function TestimonialsCarousel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Particles
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => {
      const seed = i * 0.2
      const normalize = (value: number) => (value + 1) / 2
      return {
        id: i,
        x: normalize(Math.sin(seed)) * 100,
        y: normalize(Math.sin(seed * 2)) * 100,
        size: normalize(Math.sin(seed * 3)) * 2 + 1,
        duration: normalize(Math.sin(seed * 4)) * 4 + 5,
      }
    })
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 bg-ph-dark overflow-hidden">
      {/* Background particles */}
      {isMounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute bg-ph-red rounded-full"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='40' height='40' fill='none' stroke='%23E31E24' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            <span className="glitch-text" data-text="TOPLULUK SESİ">TOPLULUK SESİ</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '10rem' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto"
          />
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Main Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -100, rotateY: 15 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative bg-gradient-to-br from-ph-black via-ph-dark to-ph-black border-2 border-ph-red/30 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-ph-red" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-ph-red" />

              {/* Quote icon */}
              <div className="absolute top-4 right-4 text-ph-red/20 text-6xl sm:text-8xl font-serif">
                "
              </div>

              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </motion.svg>
                  ))}
                </div>

                {/* Text */}
                <p className="font-futura text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-ph-red rounded-full flex items-center justify-center text-white font-race text-xl sm:text-2xl border-2 border-white/20"
                  >
                    {testimonials[currentIndex].avatar}
                  </motion.div>
                  <div>
                    <h4 className="font-race text-lg sm:text-xl text-white">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="font-futura text-sm sm:text-base text-ph-red">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Animated bottom line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-ph-red"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: 'linear' }}
                key={`progress-${currentIndex}`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-6 w-10 h-10 sm:w-12 sm:h-12 bg-ph-red/80 hover:bg-ph-red rounded-full flex items-center justify-center text-white transition-colors shadow-lg z-20"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 w-10 h-10 sm:w-12 sm:h-12 bg-ph-red/80 hover:bg-ph-red rounded-full flex items-center justify-center text-white transition-colors shadow-lg z-20"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-ph-red scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

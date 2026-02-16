'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TrailPoint {
  id: number
  x: number
  y: number
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check for touch device
    if ('ontouchstart' in window) return

    let id = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
      }

      setTrail((prev) => [...prev.slice(-15), newPoint])
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (trail.length === 0) return

    const timeout = setTimeout(() => {
      setTrail((prev) => prev.slice(1))
    }, 50)

    return () => clearTimeout(timeout)
  }, [trail])

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute rounded-full bg-ph-red"
            style={{
              left: point.x,
              top: point.y,
              width: `${4 + (index / trail.length) * 8}px`,
              height: `${4 + (index / trail.length) * 8}px`,
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px rgba(227, 30, 36, 0.5)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

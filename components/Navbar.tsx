'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = ['home', 'about', 'features', 'gallery', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Ana Sayfa', href: '#home', section: 'home' },
    { name: 'Hakkımızda', href: '#about', section: 'about' },
    { name: 'Topluluk', href: '#features', section: 'features' },
    { name: 'Galeri', href: '#gallery', section: 'gallery' },
    { name: 'İletişim', href: '#contact', section: 'contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-ph-black/90 backdrop-blur-xl shadow-2xl shadow-ph-red/10 border-b border-ph-red/20'
          : 'bg-gradient-to-b from-ph-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center space-x-2 sm:space-x-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className={`relative flex items-center justify-center bg-ph-red rounded-full transition-all duration-300 ${
                isScrolled ? 'w-8 h-8' : 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12'
              }`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <span className={`font-race text-white font-bold transition-all duration-300 ${
                isScrolled ? 'text-sm' : 'text-base sm:text-lg md:text-xl'
              }`}>P</span>
            </motion.div>
            <span className={`font-race text-white font-bold transition-all duration-300 group-hover:text-ph-red ${
              isScrolled ? 'text-sm' : 'text-sm sm:text-base md:text-lg lg:text-xl'
            }`}>PETROL HEADS</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative font-futura font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 ${
                  activeSection === link.section
                    ? 'text-ph-red'
                    : 'text-white hover:text-ph-red'
                }`}
              >
                {link.name}
                {/* Active indicator */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-ph-red"
                  initial={{ width: 0 }}
                  animate={{ width: activeSection === link.section ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Hover indicator */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ph-red/50 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0 }}
                className="block w-full h-0.5 bg-white"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-full h-0.5 bg-white"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0 }}
                className="block w-full h-0.5 bg-white"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ph-black/98 backdrop-blur-md border-t border-ph-dark"
          >
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-white font-futura font-semibold text-base sm:text-lg uppercase tracking-wider hover:text-ph-red transition-colors duration-300 py-2 border-b border-ph-dark/50 last:border-0"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}


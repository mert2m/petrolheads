'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-ph-black border-t border-ph-dark w-full">
      {/* Checkered Flag Divider */}
      <div className="h-8 sm:h-10 md:h-12 checkered-red" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center">
          {/* Logo & Brand */}
          <div className="text-center md:text-left order-1">
            <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <Image
                src="/images/maskot.jpeg"
                alt="Petrolheads Logo"
                width={40}
                height={40}
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
              />
              <span className="font-race text-lg sm:text-xl md:text-2xl text-white">PETROL HEADS</span>
            </div>
            <p className="font-futura text-xs sm:text-sm text-gray-400">
              2023'ten Beri Sürüş Ruhu
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 sm:space-x-6 order-2 md:order-2">
            <motion.a
              href="https://x.com/i/communities/1914706125393391712"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-ph-red transition-colors touch-manipulation"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-400 hover:text-ph-red transition-colors touch-manipulation"
              aria-label="Spotify"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.36.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.281c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </motion.a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right order-3">
            <p className="font-futura text-xs sm:text-sm text-gray-400">
              © {currentYear} Petrolheads
            </p>
            <p className="font-futura text-xs text-gray-500 mt-1 sm:mt-2">
              İstanbul'da ❤️ ve dostluklarla yapıldı
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}


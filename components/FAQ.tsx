'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const faqs = [
  {
    question: 'Petrolheads topluluğuna nasıl katılabilirim?',
    answer: 'X (Twitter) üzerinden topluluğumuza katılabilirsiniz. Tek yapmanız gereken hesabımızı takip etmek ve topluluk linkine tıklamak. Ardından etkinliklerimize katılabilir, diğer üyelerle tanışabilirsiniz.',
  },
  {
    question: 'Etkinliklere katılmak için ücret var mı?',
    answer: 'Çoğu etkinliğimiz ücretsizdir. Özel organizasyonlar ve pist günleri için düşük katılım ücretleri olabilir. Tüm detaylar etkinlik duyurularında paylaşılır.',
  },
  {
    question: 'Hangi araçlarla etkinliklere katılabilirim?',
    answer: 'Her marka ve model araçla etkinliklerimize katılabilirsiniz! Klasik, spor, modifiyeli veya stok - önemli olan tutkunuz. Motosiklet sahipleri de aramıza hoş geldiniz.',
  },
  {
    question: 'Etkinlikler nerelerde düzenleniyor?',
    answer: 'Etkinliklerimiz Türkiye genelinde düzenlenmektedir. İstanbul, Ankara, İzmir başta olmak üzere birçok şehirde buluşmalar organize ediyoruz. Lokasyonlar etkinlik öncesi duyurulur.',
  },
  {
    question: 'Toplulukta nasıl aktif olabilirim?',
    answer: 'Etkinliklere katılarak, teknik bilgi paylaşarak, fotoğraf/video içerik üreterek veya organizasyonlarda gönüllü olarak topluluğumuzda aktif rol alabilirsiniz.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-16 sm:py-20 md:py-24 bg-ph-dark overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none' stroke='%23E31E24' stroke-width='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-race text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            <span className="glitch-text" data-text="SIKÇA SORULAN SORULAR">SIKÇA SORULAN SORULAR</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '8rem' } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto"
          />
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-ph-black/50 border border-ph-red/20 rounded-lg p-4 sm:p-6 hover:border-ph-red/50 transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-futura font-semibold text-white text-base sm:text-lg group-hover:text-ph-red transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-8 h-8 bg-ph-red/20 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-ph-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="font-futura text-gray-400 mt-4 pt-4 border-t border-ph-red/20 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

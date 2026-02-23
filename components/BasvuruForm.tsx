'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ---- Types ----
interface FormData {
  adSoyad: string
  yas: string
  meslek: string
  sehir: string
  telefon: string
  instagram: string
  twitter: string
  arac: string
  modifiye: string
  ehliyetSuresi: string
  pistDeneyimi: string
  tougeDeneyimi: string
  konvoyDeneyimi: string
  driftDeneyimi: string
  roadTrip: string
  surusTarzlari: string[]
  nerdenDuydun: string
  nedenKatilmak: string
  etkinlikSikligi: string
  kurallarKabul: boolean
}

const initialFormData: FormData = {
  adSoyad: '',
  yas: '',
  meslek: '',
  sehir: '',
  telefon: '',
  instagram: '',
  twitter: '',
  arac: '',
  modifiye: '',
  ehliyetSuresi: '',
  pistDeneyimi: '',
  tougeDeneyimi: '',
  konvoyDeneyimi: '',
  driftDeneyimi: '',
  roadTrip: '',
  surusTarzlari: [],
  nerdenDuydun: '',
  nedenKatilmak: '',
  etkinlikSikligi: '',
  kurallarKabul: false,
}

// ---- Constants ----
const STEPS = [
  { id: 1, label: 'Kisisel', icon: '01' },
  { id: 2, label: 'Araç', icon: '02' },
  { id: 3, label: 'Tutku', icon: '03' },
  { id: 4, label: 'Son', icon: '04' },
]

const EHLIYET_OPTIONS = [
  'Henüz yok',
  '0-1 yıl',
  '1-3 yıl',
  '3-5 yıl',
  '5-10 yıl',
  '10+ yıl',
]

const SURUS_TARZLARI = [
  'Roll',
  'Touge',
  'Pist',
  'Drift',
  'Off-Road',
  'Ralli',
  'Konvoy',
  'Hepsi',
]

const NERDEN_OPTIONS = [
  'X (Twitter)',
  'Instagram',
  'Arkadaş tavsiyesi',
  'Etkinlikte gördüm',
  'Google',
  'Diğer',
]

const ETKINLIK_SIKLIGI_OPTIONS = [
  { value: 'her-hafta', label: 'Her hafta buluşurum' },
  { value: 'ayda-bir', label: 'Ayda 1-2 kez' },
  { value: 'arada', label: 'Arada sırada' },
  { value: 'uzaktan', label: 'Uzaktan takip ederim' },
]

// ---- Sub-components ----

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-ph-dark/60 -translate-y-1/2 rounded-full" />
        {/* Filled line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-ph-red -translate-y-1/2 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {STEPS.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <motion.div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 font-futura font-bold text-sm sm:text-base transition-colors duration-300 ${
                currentStep >= step.id
                  ? 'bg-ph-red border-ph-red text-white'
                  : 'bg-ph-dark/80 border-ph-dark text-gray-500'
              }`}
              animate={currentStep === step.id ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              {currentStep > step.id ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.icon
              )}
            </motion.div>
            <span className={`mt-2 font-futura text-xs sm:text-sm font-semibold uppercase tracking-wider ${
              currentStep >= step.id ? 'text-ph-red' : 'text-gray-600'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FormInput({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  type = 'text',
  error,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
  type?: string
  error?: string
}) {
  return (
    <div>
      <label className="block font-futura text-sm sm:text-base text-gray-300 mb-2 font-semibold">
        {label} {required && <span className="text-ph-red">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-ph-dark/80 border ${
          error ? 'border-red-500' : 'border-ph-red/20'
        } rounded-lg px-4 py-3 font-futura text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-ph-red focus:shadow-[0_0_15px_rgba(227,30,36,0.15)] transition-all duration-300`}
      />
      {error && <p className="mt-1 text-red-400 text-xs font-futura">{error}</p>}
    </div>
  )
}

function FormTextarea({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows = 3,
  error,
  hint,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  required?: boolean
  placeholder?: string
  rows?: number
  error?: string
  hint?: string
}) {
  return (
    <div>
      <label className="block font-futura text-sm sm:text-base text-gray-300 mb-2 font-semibold">
        {label} {required && <span className="text-ph-red">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className={`w-full bg-ph-dark/80 border ${
          error ? 'border-red-500' : 'border-ph-red/20'
        } rounded-lg px-4 py-3 font-futura text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-ph-red focus:shadow-[0_0_15px_rgba(227,30,36,0.15)] transition-all duration-300 resize-none`}
      />
      {hint && !error && <p className="mt-1 text-gray-500 text-xs font-futura">{hint}</p>}
      {error && <p className="mt-1 text-red-400 text-xs font-futura">{error}</p>}
    </div>
  )
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required,
  placeholder,
  error,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: string[]
  required?: boolean
  placeholder?: string
  error?: string
}) {
  return (
    <div>
      <label className="block font-futura text-sm sm:text-base text-gray-300 mb-2 font-semibold">
        {label} {required && <span className="text-ph-red">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-ph-dark/80 border ${
          error ? 'border-red-500' : 'border-ph-red/20'
        } rounded-lg px-4 py-3 font-futura text-white text-sm sm:text-base focus:outline-none focus:border-ph-red focus:shadow-[0_0_15px_rgba(227,30,36,0.15)] transition-all duration-300 appearance-none cursor-pointer`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23E31E24' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
        }}
      >
        <option value="" className="bg-ph-dark">{placeholder || 'Seçiniz...'}</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ph-dark">{opt}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-red-400 text-xs font-futura">{error}</p>}
    </div>
  )
}

function MultiToggle({
  label,
  options,
  selected,
  onChange,
}: {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}) {
  const toggle = (option: string) => {
    if (option === 'Hepsi') {
      onChange(selected.includes('Hepsi') ? [] : ['Hepsi'])
      return
    }
    const without = selected.filter((s) => s !== 'Hepsi')
    if (without.includes(option)) {
      onChange(without.filter((s) => s !== option))
    } else {
      onChange([...without, option])
    }
  }

  return (
    <div>
      <label className="block font-futura text-sm sm:text-base text-gray-300 mb-3 font-semibold">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {options.map((option) => {
          const isActive = selected.includes(option) || (option !== 'Hepsi' && selected.includes('Hepsi'))
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`px-4 py-2 rounded-full font-futura text-sm font-semibold border-2 transition-all duration-300 touch-manipulation ${
                isActive
                  ? 'bg-ph-red/20 border-ph-red text-ph-red shadow-[0_0_10px_rgba(227,30,36,0.2)]'
                  : 'bg-ph-dark/50 border-ph-dark text-gray-400 hover:border-ph-red/40 hover:text-gray-300'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RadioGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
}: {
  label: string
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <div>
      <label className="block font-futura text-sm sm:text-base text-gray-300 mb-3 font-semibold">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`px-4 py-2 rounded-full font-futura text-sm font-semibold border-2 transition-all duration-300 touch-manipulation ${
              value === option.value
                ? 'bg-ph-red/20 border-ph-red text-ph-red shadow-[0_0_10px_rgba(227,30,36,0.2)]'
                : 'bg-ph-dark/50 border-ph-dark text-gray-400 hover:border-ph-red/40 hover:text-gray-300'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {error && <p className="mt-2 text-red-400 text-xs font-futura">{error}</p>}
    </div>
  )
}

function SuccessScreen() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center py-10 sm:py-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-6xl sm:text-8xl mb-6"
      >
        🏁
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="font-race text-2xl sm:text-3xl md:text-4xl text-white mb-4"
      >
        BASVURUN ALINDI!
      </motion.h2>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '8rem' }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-6"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="font-futura text-base sm:text-lg text-gray-300 max-w-md mx-auto mb-4 leading-relaxed"
      >
        Ekibimiz başvurunu inceleyecek. Seninle en kısa sürede iletişime geçeceğiz.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="font-futura text-sm text-gray-500"
      >
        Sürüş tutkusu asla bitmez.
      </motion.p>

      <motion.a
        href="/"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block mt-8 px-8 py-3 bg-ph-red/20 border-2 border-ph-red text-ph-red font-futura font-bold rounded-lg hover:bg-ph-red hover:text-white transition-all duration-300 touch-manipulation"
      >
        Ana Sayfaya Dön
      </motion.a>
    </motion.div>
  )
}

// ---- Slide animation variants ----
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
}

// ---- Main Component ----
export default function BasvuruForm() {
  const [isMounted, setIsMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const seed = i * 0.3
      const normalize = (value: number) => (value + 1) / 2
      const r1 = normalize(Math.sin(seed))
      const r2 = normalize(Math.sin(seed * 2))
      const r3 = normalize(Math.sin(seed * 3))
      const r4 = normalize(Math.sin(seed * 4))
      return { id: i, x: r1 * 100, y: r2 * 100, size: r3 * 2 + 1, duration: r4 * 5 + 6 }
    })
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const handleRadioChange = useCallback((name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const handleMultiToggle = useCallback((selected: string[]) => {
    setFormData((prev) => ({ ...prev, surusTarzlari: selected }))
  }, [])

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (step === 1) {
      if (!formData.adSoyad.trim()) newErrors.adSoyad = 'Ad Soyad gerekli'
      if (!formData.yas.trim()) newErrors.yas = 'Yaş gerekli'
      else if (isNaN(Number(formData.yas)) || Number(formData.yas) < 16 || Number(formData.yas) > 99) newErrors.yas = 'Geçerli bir yaş girin (16-99)'
      if (!formData.sehir.trim()) newErrors.sehir = 'Şehir gerekli'
      if (!formData.telefon.trim()) newErrors.telefon = 'Telefon gerekli'
    }

    if (step === 2) {
      if (!formData.arac.trim()) newErrors.arac = 'Araç bilgisi gerekli'
      if (!formData.ehliyetSuresi) newErrors.ehliyetSuresi = 'Ehliyet süresi seçin'
    }

    if (step === 3) {
      if (!formData.nedenKatilmak.trim()) newErrors.nedenKatilmak = 'Bu alanı doldurun'
      else if (formData.nedenKatilmak.trim().length < 100) newErrors.nedenKatilmak = `En az 100 karakter gerekli (${formData.nedenKatilmak.trim().length}/100)`
    }

    if (step === 4) {
      if (!formData.kurallarKabul) newErrors.kurallarKabul = 'Kuralları kabul etmeniz gerekli'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setDirection(1)
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setDirection(-1)
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return
    setIsSubmitting(true)

    try {
      const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL
      if (sheetsUrl) {
        await fetch(sheetsUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            surusTarzlari: formData.surusTarzlari.join(', '),
            tarih: new Date().toLocaleString('tr-TR'),
            kurallarKabul: formData.kurallarKabul ? 'Evet' : 'Hayır',
          }),
        })
      }
    } catch {
      // no-cors mode doesn't return response, optimistic success
    }

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (!isMounted) return null

  return (
    <section className="relative min-h-screen bg-ph-black py-24 sm:py-28 md:py-32 overflow-hidden w-full">
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

      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-ph-red rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }}
            animate={{ y: [0, -50, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Tire Track Pattern */}
      <div className="absolute inset-0 tire-track-pattern opacity-10 pointer-events-none" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10"
        >
          <h1 className="font-race text-3xl sm:text-4xl md:text-5xl text-white mb-4 relative inline-block">
            <span className="glitch-text" data-text="BASVURU FORMU">BASVURU FORMU</span>
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '8rem' }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-transparent via-ph-red to-transparent mx-auto mb-4"
          />
          <p className="font-futura text-base sm:text-lg text-gray-400">
            Petrolheads ailesine katılmak için formu doldur.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-gradient-to-br from-ph-black via-ph-dark/50 to-ph-black border-2 border-ph-red/20 rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden"
        >
          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-ph-red/50" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-ph-red/50" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-ph-red/50" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-ph-red/50" />

          {/* Animated background accent */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-ph-red/5 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {isSubmitted ? (
            <SuccessScreen />
          ) : (
            <div className="relative z-10">
              <ProgressBar currentStep={currentStep} />

              <AnimatePresence mode="wait" custom={direction}>
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-5"
                  >
                    <h3 className="font-race text-xl sm:text-2xl text-white mb-6">KiSiSEL BiLGiLER</h3>

                    <FormInput
                      label="Ad Soyad"
                      name="adSoyad"
                      value={formData.adSoyad}
                      onChange={handleInputChange}
                      required
                      placeholder="Tam adınız"
                      error={errors.adSoyad}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput
                        label="Yaş"
                        name="yas"
                        value={formData.yas}
                        onChange={handleInputChange}
                        required
                        placeholder="25"
                        type="number"
                        error={errors.yas}
                      />
                      <FormInput
                        label="Meslek"
                        name="meslek"
                        value={formData.meslek}
                        onChange={handleInputChange}
                        placeholder="Yazılım Mühendisi, Öğrenci..."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput
                        label="Şehir"
                        name="sehir"
                        value={formData.sehir}
                        onChange={handleInputChange}
                        required
                        placeholder="İstanbul"
                        error={errors.sehir}
                      />
                      <FormInput
                        label="Telefon / WhatsApp"
                        name="telefon"
                        value={formData.telefon}
                        onChange={handleInputChange}
                        required
                        placeholder="05XX XXX XX XX"
                        type="tel"
                        error={errors.telefon}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput
                        label="Instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleInputChange}
                        placeholder="@kullaniciadi"
                      />
                      <FormInput
                        label="X (Twitter)"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleInputChange}
                        placeholder="@kullaniciadi"
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-5"
                  >
                    <h3 className="font-race text-xl sm:text-2xl text-white mb-6">ARAÇ & TECRÜBE</h3>

                    <FormInput
                      label="Araç (Marka / Model / Yıl)"
                      name="arac"
                      value={formData.arac}
                      onChange={handleInputChange}
                      required
                      placeholder="BMW E36 325i 1994"
                      error={errors.arac}
                    />

                    <FormTextarea
                      label="Modifiye detayları"
                      name="modifiye"
                      value={formData.modifiye}
                      onChange={handleInputChange}
                      placeholder="Coilover, egzoz, intake, vs..."
                      rows={3}
                    />

                    <FormSelect
                      label="Ehliyet süresi"
                      name="ehliyetSuresi"
                      value={formData.ehliyetSuresi}
                      onChange={handleInputChange}
                      options={EHLIYET_OPTIONS}
                      required
                      error={errors.ehliyetSuresi}
                    />

                    <FormTextarea
                      label="Pist deneyimin var mı? Anlat"
                      name="pistDeneyimi"
                      value={formData.pistDeneyimi}
                      onChange={handleInputChange}
                      placeholder="Istanbul Park track day, sim racing, vb..."
                      rows={2}
                    />

                    <FormTextarea
                      label="Touge / dağ yolu tecrüben"
                      name="tougeDeneyimi"
                      value={formData.tougeDeneyimi}
                      onChange={handleInputChange}
                      placeholder="Uludağ yolu, Bolu Dağı, favori rotaların..."
                      rows={2}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormTextarea
                        label="Konvoy sürüşleri yaptın mı?"
                        name="konvoyDeneyimi"
                        value={formData.konvoyDeneyimi}
                        onChange={handleInputChange}
                        placeholder="Kaç kişilik, nereye..."
                        rows={2}
                      />
                      <FormTextarea
                        label="Drift deneyimin var mı?"
                        name="driftDeneyimi"
                        value={formData.driftDeneyimi}
                        onChange={handleInputChange}
                        placeholder="Drift etkinliği, kendi pratiğin..."
                        rows={2}
                      />
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-5"
                  >
                    <h3 className="font-race text-xl sm:text-2xl text-white mb-6">SÜRÜS TUTKUSU & MOTiVASYON</h3>

                    <FormTextarea
                      label="Hayalindeki road trip rotası"
                      name="roadTrip"
                      value={formData.roadTrip}
                      onChange={handleInputChange}
                      placeholder="Karadeniz sahil yolu, Antalya-Konya arası dağ geçitleri..."
                      rows={2}
                    />

                    <MultiToggle
                      label="Seni ne heyecanlandırıyor?"
                      options={SURUS_TARZLARI}
                      selected={formData.surusTarzlari}
                      onChange={handleMultiToggle}
                    />

                    <FormSelect
                      label="Petrolheads'i nereden duydun?"
                      name="nerdenDuydun"
                      value={formData.nerdenDuydun}
                      onChange={handleInputChange}
                      options={NERDEN_OPTIONS}
                    />

                    <FormTextarea
                      label="Neden Petrolheads'e katılmak istiyorsun?"
                      name="nedenKatilmak"
                      value={formData.nedenKatilmak}
                      onChange={handleInputChange}
                      required
                      placeholder="Bize tutkunu, motivasyonunu ve kulüpten beklentilerini anlat... (min. 100 karakter)"
                      rows={5}
                      error={errors.nedenKatilmak}
                      hint={`${formData.nedenKatilmak.trim().length}/100 karakter`}
                    />
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-6"
                  >
                    <h3 className="font-race text-xl sm:text-2xl text-white mb-6">SON ADIM</h3>

                    <RadioGroup
                      label="Etkinliklere ne sıklıkta katılabilirsin?"
                      name="etkinlikSikligi"
                      options={ETKINLIK_SIKLIGI_OPTIONS}
                      value={formData.etkinlikSikligi}
                      onChange={(val) => handleRadioChange('etkinlikSikligi', val)}
                    />

                    {/* Rules Checkbox */}
                    <div>
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative mt-0.5 flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={formData.kurallarKabul}
                            onChange={(e) => {
                              setFormData((prev) => ({ ...prev, kurallarKabul: e.target.checked }))
                              if (errors.kurallarKabul) {
                                setErrors((prev) => ({ ...prev, kurallarKabul: undefined }))
                              }
                            }}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                            formData.kurallarKabul
                              ? 'bg-ph-red border-ph-red'
                              : errors.kurallarKabul
                                ? 'border-red-500 bg-ph-dark/80'
                                : 'border-ph-red/40 bg-ph-dark/80 group-hover:border-ph-red/70'
                          }`}>
                            {formData.kurallarKabul && (
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="font-futura text-sm text-gray-300">
                          <span className="text-ph-red">*</span> Petrolheads kulüp kurallarını okudum ve kabul ediyorum. Güvenli sürüş ilkelerine bağlı kalacağımı, etkinliklerde sorumluluk sahibi davranacağımı taahhüt ederim.
                        </span>
                      </label>
                      {errors.kurallarKabul && <p className="mt-2 text-red-400 text-xs font-futura">{errors.kurallarKabul}</p>}
                    </div>

                    {/* Summary Preview */}
                    <div className="bg-ph-dark/40 border border-ph-red/10 rounded-lg p-4 sm:p-5">
                      <h4 className="font-futura text-sm text-gray-400 mb-3 font-semibold uppercase tracking-wider">Başvuru Özeti</h4>
                      <div className="space-y-2 font-futura text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Ad Soyad</span>
                          <span className="text-white">{formData.adSoyad}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Araç</span>
                          <span className="text-white">{formData.arac}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Şehir</span>
                          <span className="text-white">{formData.sehir}</span>
                        </div>
                        {formData.meslek && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Meslek</span>
                            <span className="text-white">{formData.meslek}</span>
                          </div>
                        )}
                        {formData.surusTarzlari.length > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">İlgi Alanları</span>
                            <span className="text-ph-red">{formData.surusTarzlari.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-ph-dark/50">
                {currentStep > 1 ? (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 bg-ph-dark/60 border border-ph-red/20 rounded-lg font-futura font-semibold text-sm text-gray-300 hover:border-ph-red/50 hover:text-white transition-all duration-300 touch-manipulation"
                  >
                    Geri
                  </motion.button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-8 py-3 bg-ph-red rounded-lg font-futura font-bold text-sm text-white hover:shadow-[0_0_20px_rgba(227,30,36,0.4)] transition-all duration-300 touch-manipulation overflow-hidden"
                  >
                    <span className="relative z-10">Devam Et</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-ph-red via-red-700 to-ph-red"
                      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      style={{ backgroundSize: '200% 200%' }}
                    />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    whileHover={isSubmitting ? {} : { scale: 1.03 }}
                    whileTap={isSubmitting ? {} : { scale: 0.97 }}
                    className={`relative px-8 py-3 rounded-lg font-futura font-bold text-sm text-white transition-all duration-300 touch-manipulation overflow-hidden ${
                      isSubmitting ? 'bg-ph-red/50 cursor-wait' : 'bg-ph-red hover:shadow-[0_0_20px_rgba(227,30,36,0.4)]'
                    }`}
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Gönderiliyor...' : 'Başvuruyu Gönder'}
                    </span>
                    {!isSubmitting && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-ph-red via-red-700 to-ph-red"
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        style={{ backgroundSize: '200% 200%' }}
                      />
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

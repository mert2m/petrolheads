import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Features from '@/components/Features'
import Gallery from '@/components/Gallery'
import SocialProof from '@/components/SocialProof'
import CTA from '@/components/CTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import LoadingScreen from '@/components/LoadingScreen'
import HeadlightEffect from '@/components/HeadlightEffect'
import RPMGauge from '@/components/RPMGauge'
import EasterEgg from '@/components/EasterEgg'
import CountdownTimer from '@/components/CountdownTimer'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import EventCalendar from '@/components/EventCalendar'
import NitroBoost from '@/components/NitroBoost'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import SocialBar from '@/components/SocialBar'
import FAQ from '@/components/FAQ'
import StatsCounter from '@/components/StatsCounter'
import CarShowcase from '@/components/CarShowcase'
import InteractiveMap from '@/components/InteractiveMap'
import CursorTrail from '@/components/CursorTrail'

export default function Home() {
  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Cursor Trail Effect */}
      <CursorTrail />

      {/* Easter Egg - Konami Code */}
      <EasterEgg />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Social Bar (left side) */}
      <SocialBar />

      {/* Floating Buttons */}
      <NitroBoost />
      <BackToTop />

      <main className="min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />

        {/* Stats Counter */}
        <StatsCounter />

        <Features />

        {/* Countdown Timer for Next Event */}
        <CountdownTimer />

        {/* Headlight Effect Section */}
        <HeadlightEffect />

        <Gallery />

        {/* 3D Car Showcase */}
        <CarShowcase />

        {/* RPM Gauge Section */}
        <RPMGauge />

        {/* Testimonials Carousel */}
        <TestimonialsCarousel />

        {/* Interactive Map */}
        <InteractiveMap />

        {/* Event Calendar */}
        <EventCalendar />

        {/* FAQ Section */}
        <FAQ />

        <SocialProof />
        <CTA />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

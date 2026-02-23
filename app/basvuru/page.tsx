import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import BasvuruForm from '@/components/BasvuruForm'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import CursorTrail from '@/components/CursorTrail'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  title: 'Başvuru Formu',
  description: "Petrolheads sürüş kulübüne katılmak için başvuru formunu doldur. Türkiye'nin en tutkulu otomotiv topluluğunun bir parçası ol.",
  openGraph: {
    title: 'Petrolheads - Başvuru Formu',
    description: "Petrolheads sürüş kulübüne katılmak için başvuru formunu doldur.",
    url: 'https://petrolheads.com.tr/basvuru',
  },
}

export default function BasvuruPage() {
  return (
    <>
      <CustomCursor />
      <CursorTrail />
      <ScrollProgress />
      <BackToTop />
      <main className="min-h-screen w-full overflow-x-hidden">
        <Navbar />
        <BasvuruForm />
        <Footer />
      </main>
    </>
  )
}

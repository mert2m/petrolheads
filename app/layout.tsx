import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  metadataBase: new URL('https://petrolheads.com.tr'),
  title: {
    default: "Petrolheads - Türkiye'nin Önde Gelen Otomobil Topluluğu | Driving Spirit",
    template: '%s | Petrolheads',
  },
  description: "26,000+ Türk araba tutkununa katıl. Petrolheads, otomobil kültürünü yaşayan ve nefes alanların evi. Etkinlikler, buluşmalar ve motor tutkusu.",
  keywords: [
    'otomotiv topluluğu',
    'araba tutkunu',
    'petrolheads',
    'türkiye otomotiv',
    'araba buluşması',
    'car meet',
    'motor sporları',
    'modifiye araçlar',
    'araba etkinlikleri',
    'driving spirit',
  ],
  authors: [{ name: 'Petrolheads Team' }],
  creator: 'Petrolheads',
  publisher: 'Petrolheads',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://petrolheads.com.tr',
    siteName: 'Petrolheads',
    title: "Petrolheads - Türkiye'nin Önde Gelen Otomobil Topluluğu",
    description: "26,000+ Türk araba tutkununa katıl. Petrolheads, otomobil kültürünü yaşayan ve nefes alanların evi.",
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Petrolheads - Driving Spirit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Petrolheads - Türkiye'nin Önde Gelen Otomobil Topluluğu",
    description: "26,000+ Türk araba tutkununa katıl. Driving Spirit.",
    images: ['/images/og-image.jpg'],
    creator: '@petrolheads',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: 'https://petrolheads.com.tr',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Script id="fix-turkish-chars" strategy="afterInteractive">
          {`
            (function() {
              function fixTurkishCharacters() {
                const elements = document.querySelectorAll('.font-race');
                elements.forEach((element) => {
                  const text = element.textContent || '';
                  let html = element.innerHTML;
                  let changed = false;

                  // Büyük İ harfini ters ünlem (¡) ile değiştir - Race Sport fontunda daha şık görünüyor
                  if (text.includes('İ') || html.includes('İ')) {
                    html = html.replace(/İ/g, '¡');
                    changed = true;
                  }

                  // Glitch-text için data-text attribute'unu da güncelle
                  if (element.hasAttribute('data-text')) {
                    const dataText = element.getAttribute('data-text');
                    if (dataText && dataText.includes('İ')) {
                      element.setAttribute('data-text', dataText.replace(/İ/g, '¡'));
                    }
                  }

                  // Ş harfi için Oswald font kullan (Race Sport'ta Ş yok)
                  if ((text.includes('Ş') || text.includes('ş')) && !html.includes('font-family:')) {
                    html = html.replace(
                      /([Şş])/g,
                      function(match) {
                        return '<span style="font-family: Oswald, sans-serif; font-weight: 700;">' + match + '</span>';
                      }
                    );
                    changed = true;
                  }

                  if (changed) {
                    element.innerHTML = html;
                  }
                });
              }

              // Sayfa yüklendiğinde çalıştır
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', fixTurkishCharacters);
              } else {
                setTimeout(fixTurkishCharacters, 100);
              }

              // MutationObserver ile dinamik içerik değişikliklerini izle
              const observer = new MutationObserver(function(mutations) {
                let shouldFix = false;
                mutations.forEach(function(mutation) {
                  if (mutation.addedNodes.length > 0) {
                    shouldFix = true;
                  }
                });
                if (shouldFix) {
                  setTimeout(fixTurkishCharacters, 50);
                }
              });
              observer.observe(document.body, {
                childList: true,
                subtree: true,
              });
            })();
          `}
        </Script>
      </body>
    </html>
  )
}


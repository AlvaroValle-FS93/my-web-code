import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from './dictionaries'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Pricing from '@/components/Pricing'
import Portfolio from '@/components/Portfolio'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AV Digital Solutions',
    url: `https://avdigital.es/${lang}`,
    description: dict.hero.sub,
    email: 'alvaro.valle.fullstack@outlook.com',
    telephone: '+34 600 000 000',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Valencia',
      addressCountry: 'ES',
    },
    areaServed: ['ES', 'FR', 'IT', 'EU'],
    knowsLanguage: ['es', 'en', 'fr', 'it'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: dict.services.title,
      itemListElement: dict.services.items.map(
        (item: { name: string; desc: string }, i: number) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: {
            '@type': 'Service',
            name: item.name,
            description: item.desc,
          },
        })
      ),
    },
  }

  return (
    <div className="min-h-screen bg-bg text-text font-sans overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="hero-glow fixed -top-24 -right-24 w-[700px] h-[700px] pointer-events-none z-0" />
      <Nav dict={dict.nav} lang={lang} />
      <main>
        <Hero dict={dict} />
        <Services dict={dict.services} />
        <Process dict={dict.process} />
        <Pricing dict={dict.pricing} />
        <Portfolio dict={dict.portfolio} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} lang={lang} />
    </div>
  )
}

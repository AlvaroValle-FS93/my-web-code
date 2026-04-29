import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getDictionary, hasLocale, type Locale } from './dictionaries'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Pricing from '@/components/Pricing'
import Portfolio from '@/components/Portfolio'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

const Contact = dynamic(() => import('@/components/Contact'))

const BASE = 'https://www.alvarovalle.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const dict = await getDictionary(lang as Locale)
  return {
    alternates: {
      canonical: `${BASE}/${lang}`,
      languages: {
        'es': `${BASE}/es`,
        'en': `${BASE}/en`,
        'fr': `${BASE}/fr`,
        'it': `${BASE}/it`,
        'x-default': `${BASE}/es`,
      },
    },
    title: 'AV Digital Solutions · Alvaro Valle',
    description: dict.hero.sub,
  }
}

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
    url: `${BASE}/${lang}`,
    description: dict.hero.sub,
    email: 'alvaro.valle.fullstack@outlook.com',
    // telephone: '+34 600 000 000',
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
        <Contact dict={dict.contact} lang={lang} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} lang={lang} />
    </div>
  )
}

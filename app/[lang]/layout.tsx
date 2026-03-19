import type { Metadata } from 'next'
import { hasLocale, type Locale } from './dictionaries'

const SEO: Record<Locale, { title: string; description: string; keywords: string }> = {
  es: {
    title: 'AV Digital Solutions · Desarrollo de Apps en Valencia',
    description: 'Desarrollo de aplicaciones web y móviles a medida en Valencia. React, Next.js, Node.js, diseño UI incluido. Freelance con precios competitivos.',
    keywords: 'desarrollador freelance Valencia, desarrollo app móvil Valencia, crear app para empresa, React Next.js Valencia, desarrollo web a medida Valencia, aplicación web personalizada, programador freelance España, desarrollo software Valencia, app iOS Android Valencia, diseño UI UX Valencia, Next.js developer Spain, Node.js Valencia, mantenimiento web Valencia, empresa desarrollo aplicaciones',
  },
  en: {
    title: 'AV Digital Solutions · App Development in Valencia Spain',
    description: 'Custom web and mobile app development in Valencia, Spain. React, Next.js, Node.js, UI design included. Freelance developer with competitive prices.',
    keywords: 'freelance developer Valencia Spain, mobile app development Spain, custom web app development, React Next.js developer Spain, Node.js developer Valencia, hire freelance developer Spain, custom software development Spain, iOS Android app developer, web application development Valencia, UI UX design Spain, affordable app development Europe, Next.js developer Europe',
  },
  fr: {
    title: "AV Digital Solutions · Développement d'Apps à Valence Espagne",
    description: "Développement d'applications web et mobiles sur mesure à Valence, Espagne. React, Next.js, Node.js, design UI inclus. Freelance avec des prix compétitifs.",
    keywords: 'développeur freelance Valence Espagne, développement application mobile Espagne, création app web sur mesure, développeur React Next.js Espagne, Node.js développeur Valence, embaucher développeur freelance Espagne, développement logiciel personnalisé, développeur iOS Android Espagne, conception UI UX Espagne, Next.js développeur Europe',
  },
  it: {
    title: 'AV Digital Solutions · Sviluppo App a Valencia Spagna',
    description: 'Sviluppo di applicazioni web e mobile su misura a Valencia, Spagna. React, Next.js, Node.js, design UI incluso. Freelance con prezzi competitivi.',
    keywords: 'sviluppatore freelance Valencia Spagna, sviluppo app mobile Spagna, creazione app web su misura, sviluppatore React Next.js Spagna, Node.js sviluppatore Valencia, assumere sviluppatore freelance Spagna, sviluppo software personalizzato, sviluppatore iOS Android Spagna, design UI UX Spagna, Next.js sviluppatore Europa',
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const locale: Locale = hasLocale(lang) ? (lang as Locale) : 'es'
  const seo = SEO[locale]

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: `https://avdigital.es/${locale}`,
      languages: {
        es: 'https://avdigital.es/es',
        en: 'https://avdigital.es/en',
        fr: 'https://avdigital.es/fr',
        it: 'https://avdigital.es/it',
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      locale: locale,
      type: 'website',
      url: `https://avdigital.es/${locale}`,
      siteName: 'AV Digital Solutions',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  }
}

export async function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }, { lang: 'fr' }, { lang: 'it' }]
}

export default async function LangLayout({
  children,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  return <>{children}</>
}

'use client'

import { useEffect, useState } from 'react'

interface FooterDict {
  slogan: string
  location: string
  copy: string
  privacy: string
  cookies: string
  terms: string
}

interface NavDict {
  services: string
  process: string
  pricing: string
  portfolio: string
  contact: string
}

const localeMap: Record<string, string> = {
  es: 'es-ES',
  en: 'en-GB',
  fr: 'fr-FR',
  it: 'it-IT',
}

const navLinks = [
  { label_key: 'services', href: '#services' },
  { label_key: 'process', href: '#process' },
  { label_key: 'pricing', href: '#pricing' },
  { label_key: 'portfolio', href: '#portfolio' },
  { label_key: 'contact', href: '#contact' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/avdigital',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alvaro-valle-melgarejo/?locale=fr',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/avdigital',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hola@avdigital.es',
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
]

export default function Footer({ dict, nav, lang }: { dict: FooterDict; nav: NavDict; lang: string }) {
  const [date, setDate] = useState('')

  useEffect(() => {
    const locale = localeMap[lang] || 'es-ES'
    setDate(
      new Date().toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    )
  }, [lang])

  return (
    <footer className="border-t border-border-dim mt-8">
      {/* Row 1 */}
      <div className="wrapper py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo + slogan */}
        <div className="flex flex-col gap-2">
          <span className="font-mono font-bold text-[15px] text-text tracking-tight">
            AV Digital Solutions
          </span>
          <span className="text-[13px] text-text-2 leading-snug">{dict.slogan}</span>
          <span className="font-mono text-[11px] text-accent mt-1">{dict.location}</span>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-2.5 md:items-center">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[12px] text-text-2 hover:text-accent transition-colors"
            >
              {nav[l.label_key as keyof NavDict]}
            </a>
          ))}
        </div>

        {/* Social icons */}
        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-12 h-12 rounded-md bg-accent-dim border border-border-mid flex items-center justify-center text-accent hover:bg-accent hover:text-bg transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border-dim" />

      {/* Row 2 */}
      <div className="wrapper py-8 flex flex-col md:flex-row items-center justify-between gap-3 flex-wrap">
        <span className="font-mono text-[11px] text-text-3">{dict.copy}</span>

        <div className="flex gap-5 flex-wrap justify-center">
          <a href={`/${lang}/privacy`} className="font-mono text-[11px] text-text-3 hover:text-accent transition-colors">
            {dict.privacy}
          </a>
          <a href={`/${lang}/cookies`} className="font-mono text-[11px] text-text-3 hover:text-accent transition-colors">
            {dict.cookies}
          </a>
          <a href={`/${lang}/terms`} className="font-mono text-[11px] text-text-3 hover:text-accent transition-colors">
            {dict.terms}
          </a>
        </div>

        <span className="font-mono text-[11px] text-text-3 capitalize">{date}</span>
      </div>
    </footer>
  )
}

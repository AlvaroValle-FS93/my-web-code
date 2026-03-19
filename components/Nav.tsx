'use client'

import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'

const LANGS = ['es', 'en', 'fr', 'it'] as const
type LangCode = (typeof LANGS)[number]

interface NavDict {
  services: string
  process: string
  pricing: string
  portfolio: string
  contact: string
}

export default function Nav({ dict, lang }: { dict: NavDict; lang: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const changeLang = (newLang: LangCode) => {
    const segments = pathname.split('/')
    segments[1] = newLang
    router.push(segments.join('/'))
    setOpen(false)
  }

  const navItems = ['services', 'process', 'pricing', 'portfolio', 'contact'] as const

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border-dim backdrop-blur-xl bg-bg/90">
      <div className="wrapper flex items-center justify-between py-5">

        {/* Logo */}
        <div className="font-mono text-sm text-accent tracking-widest">
          AV<span className="text-text-2">.</span>digital
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-[13px] text-text-2 hover:text-accent transition-colors tracking-wider bg-transparent border-none cursor-pointer font-sans"
            >
              {dict[s]}
            </button>
          ))}
        </div>

        {/* Right side: langs + toggle + hamburger */}
        <div className="flex items-center gap-3">
          {/* Lang switcher — always visible */}
          <div className="hidden md:flex gap-1.5">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                className={`font-mono text-[11px] px-2 py-1 rounded-sm border transition-all duration-200 cursor-pointer bg-transparent ${
                  lang === l
                    ? 'border-accent text-accent'
                    : 'border-border-mid text-text-2 hover:border-accent hover:text-accent'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Toggle theme"
            className="relative w-10 h-[22px] rounded-full border border-border-mid bg-accent-dim cursor-pointer flex-shrink-0 transition-colors duration-200"
          >
            <span
              className={`absolute inset-y-[2px] left-0 w-[18px] rounded-full bg-accent shadow-sm transition-transform duration-300 ease-in-out ${
                theme === 'dark' ? 'translate-x-[20px]' : 'translate-x-[2px]'
              }`}
            />
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 cursor-pointer bg-transparent border-none p-1"
          >
            <span className={`block h-px bg-text transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`block h-px bg-text transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px bg-text transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-h-96' : 'max-h-0'}`}>
        <div className="wrapper pb-6 flex flex-col gap-4 border-t border-border-dim pt-4">
          {navItems.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-[14px] text-text-2 hover:text-accent transition-colors tracking-wider bg-transparent border-none cursor-pointer font-sans text-left"
            >
              {dict[s]}
            </button>
          ))}

          <div className="flex gap-1.5 pt-2 border-t border-border-dim">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => changeLang(l)}
                className={`font-mono text-[11px] px-2 py-1 rounded-sm border transition-all duration-200 cursor-pointer bg-transparent ${
                  lang === l
                    ? 'border-accent text-accent'
                    : 'border-border-mid text-text-2 hover:border-accent hover:text-accent'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

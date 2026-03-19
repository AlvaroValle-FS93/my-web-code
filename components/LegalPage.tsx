import Link from 'next/link'

interface Section {
  title: string
  body: string
}

interface LegalPageProps {
  lang: string
  title: string
  intro: string
  sections: Section[]
  backLabel: string
}

export default function LegalPage({ lang, title, intro, sections, backLabel }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-bg text-text font-sans">
      <div className="wrapper py-24 max-w-2xl">
        <Link
          href={`/${lang}`}
          className="font-mono text-[11px] text-accent hover:opacity-70 transition-opacity mb-10 inline-flex items-center gap-2"
        >
          ← {backLabel}
        </Link>

        <h1 className="text-3xl font-bold tracking-tight mb-4 mt-6">{title}</h1>
        <p className="text-[15px] text-text-2 leading-relaxed mb-12">{intro}</p>

        <div className="flex flex-col gap-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-mono text-[12px] text-accent tracking-widest mb-2">{s.title}</h2>
              <p className="text-[15px] text-text-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

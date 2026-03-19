interface ProcessDict {
  tag: string
  title: string
  sub: string
  steps: Array<{
    num: string
    title: string
    desc: string
    time: string
  }>
}

function ProcessIcon({ index }: { index: number }) {
  const props = {
    width: 20, height: 20, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
  }
  if (index === 0) return (
    <svg {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
  if (index === 1) return (
    <svg {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  )
  if (index === 2) return (
    <svg {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
  return (
    <svg {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

export default function Process({ dict }: { dict: ProcessDict }) {
  return (
    <section id="process" className="py-20 border-t border-border-dim">
      <div className="wrapper">
        <div className="section-tag">{dict.tag}</div>
        <h2 className="section-title">{dict.title}</h2>
        <p className="section-sub">{dict.sub}</p>

        <div className="flex flex-col">
          {dict.steps.map((step, i) => (
            <div
              key={i}
              className="grid grid-cols-[72px_1fr] gap-6 py-7 border-b border-border-dim last:border-b-0 items-start"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-accent-dim border border-border-mid flex items-center justify-center text-accent flex-shrink-0">
                  <ProcessIcon index={i} />
                </div>
                <div className="font-mono text-[10px] text-accent">{step.num}</div>
              </div>
              <div>
                <h3 className="text-[16px] font-bold mb-1.5">{step.title}</h3>
                <p className="text-[13px] text-text-2 leading-relaxed">{step.desc}</p>
                <div className="font-mono text-[11px] text-text-3 mt-2">{step.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

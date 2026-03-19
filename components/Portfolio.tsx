const GRADIENTS = [
  'from-[#00d296]/10 to-[#00a8f8]/10',
  'from-[#00a8f8]/10 to-[#7c3aed]/10',
  'from-[#7c3aed]/10 to-[#00d296]/10',
]

interface PortfolioDict {
  tag: string
  title: string
  sub: string
  youtube_btn: string
  items: Array<{
    name: string
    type: string
    desc: string
    tag: string
    badge?: string
    badgeStyle?: string
  }>
}

export default function Portfolio({ dict }: { dict: PortfolioDict }) {
  return (
    <section id="portfolio" className="py-20 border-t border-border-dim">
      <div className="wrapper">
      <div className="section-tag">{dict.tag}</div>
      <h2 className="section-title">{dict.title}</h2>
      <p className="section-sub">{dict.sub}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {dict.items.map((item, i) => (
          <div
            key={i}
            className="group bg-bg-2 border border-border-dim rounded-lg overflow-hidden hover:border-border-mid transition-colors duration-200 flex flex-col"
          >
            <div
              className={`h-44 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex flex-col items-center justify-center border-b border-border-dim gap-2 relative`}
            >
              <span className="font-mono text-[11px] text-accent tracking-widest">
                {item.tag.toUpperCase()}
              </span>
              {item.badge && (
                <span className={`${item.badgeStyle === 'progress' ? 'btn-progress' : 'btn-whatsapp'} font-mono text-[10px] tracking-widest rounded-sm px-2 py-1`}>
                  {item.badge.toUpperCase()}
                </span>
              )}
            </div>
            <div className="p-6 flex flex-col flex-1 gap-3">
              <div className="flex flex-wrap gap-1.5">
                {item.type.split(' · ').map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] px-2.5 py-1 bg-accent-dim text-accent border border-accent/20"
                    style={{ borderRadius: '2rem' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="text-[16px] font-bold">{item.name}</h3>
              <p className="text-[13px] text-text-2 leading-relaxed flex-1">{item.desc}</p>
              {i === 0 && (
                <a
                  href="https://www.youtube.com/watch?v=qmeBNp-i9XM&t=367s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[11px] font-bold px-3 py-2 rounded-sm border border-border-mid bg-accent-dim text-accent hover:bg-accent hover:text-bg transition-colors duration-200 self-start mt-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  {dict.youtube_btn}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

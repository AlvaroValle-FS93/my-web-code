const GRADIENTS = [
  'from-[#00d296]/10 to-[#00a8f8]/10',
  'from-[#00a8f8]/10 to-[#7c3aed]/10',
  'from-[#7c3aed]/10 to-[#00d296]/10',
]

interface PortfolioDict {
  tag: string
  title: string
  sub: string
  items: Array<{
    name: string
    type: string
    desc: string
    tag: string
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
            className="group bg-bg-2 border border-border-dim rounded-lg overflow-hidden hover:border-border-mid transition-colors duration-200"
          >
            <div
              className={`h-44 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center border-b border-border-dim`}
            >
              <span className="font-mono text-[11px] text-accent tracking-widest">
                {item.tag.toUpperCase()}
              </span>
            </div>
            <div className="p-6">
              <div className="font-mono text-[10px] text-text-3 tracking-widest mb-2">
                {item.type}
              </div>
              <h3 className="text-[16px] font-bold mb-2">{item.name}</h3>
              <p className="text-[13px] text-text-2 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

interface ServicesDict {
  tag: string
  title: string
  sub: string
  items: Array<{
    num: string
    name: string
    desc: string
    price: string
    features: string[]
  }>
}

export default function Services({ dict }: { dict: ServicesDict }) {
  return (
    <section id="services" className="py-20 border-t border-border-dim">
      <div className="wrapper">
        <div className="section-tag">{dict.tag}</div>
        <h2 className="section-title">{dict.title}</h2>
        <p className="section-sub">{dict.sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-y divide-border-dim border border-border-dim rounded-lg overflow-hidden">
          {dict.items.map((item) => (
            <div
              key={item.num}
              className="bg-bg-2 p-8 hover:bg-bg-surface transition-colors duration-200 flex flex-col"
            >
              <div className="font-mono text-[11px] text-text-3 mb-5">{item.num}</div>
              <div className="text-[18px] font-bold mb-2">{item.name}</div>
              <div className="text-[13px] text-text-2 leading-relaxed mb-5">{item.desc}</div>

              <ul className="flex flex-col gap-1.5 mb-6 flex-1">
                {item.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-[12px] text-text-2">
                    <span className="text-accent mt-px flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="font-mono text-[13px] text-accent px-3 py-1.5 bg-accent-dim rounded-sm inline-block self-start">
                {item.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

interface PricingDict {
  tag: string
  title: string
  sub: string
  popular: string
  from: string
  plans: Array<{
    tier: string
    price: string
    unit: string
    desc: string
    featured: boolean
    features: string[]
  }>
}

export default function Pricing({ dict }: { dict: PricingDict }) {
  return (
    <section id="pricing" className="py-20 border-t border-border-dim">
      <div className="wrapper">
      <div className="section-tag">{dict.tag}</div>
      <h2 className="section-title">{dict.title}</h2>
      <p className="section-sub">{dict.sub}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dict.plans.map((plan) => (
          <div
            key={plan.tier}
            className={`relative bg-bg-2 rounded-md p-7 transition-colors duration-200 ${
              plan.featured
                ? 'border-2 border-accent'
                : 'border border-border-dim hover:border-border-mid'
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-px right-5 font-mono text-[9px] tracking-widest text-black bg-accent px-2.5 py-0.5 rounded-b">
                {dict.popular}
              </span>
            )}
            <div className="font-mono text-[11px] text-text-2 tracking-widest mb-3">
              {plan.tier}
            </div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="font-mono text-[11px] text-text-2">{dict.from}</span>
              <span className="text-[30px] font-extrabold tracking-tight">{plan.price}</span>
              <span className="text-sm text-text-2 font-normal">{plan.unit}</span>
            </div>
            <div className="text-[12px] text-text-2 leading-relaxed mb-5">{plan.desc}</div>
            <ul className="flex flex-col gap-2">
              {plan.features.map((f, i) => (
                <li key={i} className="text-[12px] text-text-2 flex gap-2">
                  <span className="text-accent flex-shrink-0">—</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

interface HeroDict {
  hero: {
    tag: string
    h1_1: string
    h1_2: string
    h1_3: string
    sub: string
    cta1: string
    cta2: string
  }
  stats: {
    weeks_val: string
    weeks_label: string
    price_val: string
    price_label: string
    contact_val: string
    contact_label: string
  }
}

export default function Hero({ dict }: { dict: HeroDict }) {
  const { hero, stats } = dict

  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      <div className="wrapper">

      <div className="font-mono text-[11px] text-accent tracking-[0.12em] mb-6 flex items-center gap-2.5">
        <span className="block w-6 h-px bg-accent" />
        {hero.tag}
      </div>

      <h1 className="text-[clamp(36px,6vw,72px)] font-extrabold leading-none tracking-tight mb-3">
        {hero.h1_1}
        <br />
        <em className="not-italic text-accent">{hero.h1_2}</em>
        <br />
        {hero.h1_3}
      </h1>

      <p className="text-[clamp(15px,2vw,19px)] text-text-2 max-w-[560px] leading-relaxed mb-12 font-normal">
        {hero.sub}
      </p>

      <div className="flex gap-3.5 flex-wrap">
        <a href="#contact" className="btn-primary">
          {hero.cta1}
        </a>
        <a href="#services" className="btn-secondary">
          {hero.cta2}
        </a>
      </div>

      <div className="mt-10 bg-bg-3 border border-border-dim rounded-md p-5 font-mono text-[12px] text-text-2 max-w-[480px]">
        <div className="flex gap-1.5 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="leading-loose">
          <div>
            <span className="text-accent">$</span>{' '}
            <span className="text-accent-2">npx create-your-app</span>
          </div>
          <div className="text-text-3">→ Analyzing requirements...</div>
          <div>
            <span className="text-accent">✓</span> UI/UX design ready
          </div>
          <div>
            <span className="text-accent">✓</span> React + Next.js + Node.js
          </div>
          <div>
            <span className="text-accent">✓</span> Deployed to production
          </div>
          <div>
            <span className="text-accent">$</span>{' '}
            <span className="inline-block w-2 h-3.5 bg-accent cursor-blink align-middle" />
          </div>
        </div>
      </div>

      <div className="flex gap-16 mt-16 pt-10 border-t border-border-dim flex-wrap justify-center">
        {[
          { val: stats.weeks_val, label: stats.weeks_label },
          { val: stats.price_val, label: stats.price_label },
          { val: stats.contact_val, label: stats.contact_label },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <div className="font-mono text-[28px] font-bold text-accent">{s.val}</div>
            <div className="text-[12px] text-text-2 mt-1 tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}

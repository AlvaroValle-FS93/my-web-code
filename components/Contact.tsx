'use client'

import { useState } from 'react'
import { contactSchema, type ContactFormErrors, type ServiceId } from '@/lib/schemas/contact'

interface ContactDict {
  tag: string
  title: string
  sub: string
  email_label: string
  location_label: string
  location_val: string
  response_label: string
  response_val: string
  chat_label: string
  form: {
    name: string
    name_ph: string
    email_ph: string
    project: string
    project_ph: string
    accept_privacy: string
    accept_comms: string
    send: string
    sending: string
    service_label: string
    service_webapp: string
    service_webapp_desc: string
    service_native: string
    service_native_desc: string
    service_automation: string
    service_automation_desc: string
    service_landing: string
    service_landing_desc: string
  }
  form_errors: Record<string, string>
}

function ServiceIcon({ id }: { id: ServiceId }) {
  const props = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (id === 'webapp') return (
    <svg {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
      <path d="M7 8l3 3-3 3" />
      <path d="M13 14h4" />
    </svg>
  )
  if (id === 'native') return (
    <svg {...props}>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  )
  if (id === 'automation') return (
    <svg {...props}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M7 6h10" />
      <path d="M5 8v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
      <path d="M12 14v2" />
    </svg>
  )
  return (
    <svg {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  )
}

export default function Contact({ dict }: { dict: ContactDict }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [project, setProject] = useState('')
  const [service, setService] = useState<ServiceId | undefined>(undefined)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [acceptComms, setAcceptComms] = useState(false)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const t = (key: string) => dict.form_errors[key] ?? key

  const services: { id: ServiceId; label: string; desc: string }[] = [
    { id: 'webapp', label: dict.form.service_webapp, desc: dict.form.service_webapp_desc },
    { id: 'native', label: dict.form.service_native, desc: dict.form.service_native_desc },
    { id: 'automation', label: dict.form.service_automation, desc: dict.form.service_automation_desc },
    { id: 'landing', label: dict.form.service_landing, desc: dict.form.service_landing_desc },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = contactSchema.safeParse({ name, email, project, service, acceptPrivacy: acceptPrivacy || undefined, acceptComms })

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name?.[0] ? t(fieldErrors.name[0]) : undefined,
        email: fieldErrors.email?.[0] ? t(fieldErrors.email[0]) : undefined,
        project: fieldErrors.project?.[0] ? t(fieldErrors.project[0]) : undefined,
        acceptPrivacy: fieldErrors.acceptPrivacy?.[0] ? t(fieldErrors.acceptPrivacy[0]) : undefined,
      })
      return
    }

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })

      if (!res.ok) {
        const data = await res.json()
        if (data.errors) {
          setErrors({
            name: data.errors.name?.[0] ? t(data.errors.name[0]) : undefined,
            email: data.errors.email?.[0] ? t(data.errors.email[0]) : undefined,
            project: data.errors.project?.[0] ? t(data.errors.project[0]) : undefined,
          })
        }
        setStatus('error')
        return
      }

      setStatus('success')
      setName('')
      setEmail('')
      setProject('')
      setService(undefined)
      setAcceptPrivacy(false)
      setAcceptComms(false)
    } catch {
      setStatus('error')
    }
  }

  const inputBase =
    'bg-bg-2 border text-text placeholder-text-3 px-3.5 py-3 rounded-sm outline-none transition-colors text-[14px] font-sans'
  const inputClass = (field: keyof ContactFormErrors) =>
    `${inputBase} ${errors[field] ? 'border-red-500 focus:border-red-500' : 'border-border-dim focus:border-accent'}`

  return (
    <section id="contact" className="py-20 border-t border-border-dim">
      <div className="wrapper">
        <div className="section-tag">{dict.tag}</div>
        <h2 className="section-title">{dict.title}</h2>
        <p className="section-sub">{dict.sub}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-6">
            {[
              {
                label: dict.email_label,
                val: 'hola@avdigital.es',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
              {
                label: 'WHATSAPP',
                val: '+34 697 819 510',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                ),
              },
              {
                label: dict.location_label,
                val: dict.location_val,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
              {
                label: dict.response_label,
                val: dict.response_val,
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-md bg-accent-dim border border-border-mid flex items-center justify-center text-accent flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="font-mono text-[10px] text-text-3 tracking-widest mb-1">{item.label}</div>
                  <div className="text-[17px] text-accent font-medium" suppressHydrationWarning>{item.val}</div>
                </div>
              </div>
            ))}

            <div>
              <div className="font-mono text-[10px] text-text-3 tracking-widest mb-3">
                {dict.chat_label}
              </div>
              <div className="flex gap-2 flex-wrap">
                <a
                  href="https://wa.me/34697819510"
                  target="_blank"
                  rel="noopener noreferrer"
                  suppressHydrationWarning
                  className="btn-whatsapp inline-flex items-center gap-2 font-mono text-[12px] font-bold px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-px hover:opacity-90"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="https://t.me/+34697819510"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-telegram inline-flex items-center gap-2 font-mono text-[12px] font-bold px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-px hover:opacity-90"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                  Telegram
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
            {status === 'success' && (
              <div className="font-mono text-[13px] text-accent bg-accent-dim border border-border-mid rounded-sm px-4 py-3">
                {t('success')}
              </div>
            )}

            {/* Service selector */}
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] text-text-3 tracking-widest">
                {dict.form.service_label}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {services.map((svc) => {
                  const selected = service === svc.id
                  return (
                    <button
                      key={svc.id}
                      type="button"
                      onClick={() => setService(selected ? undefined : svc.id)}
                      className={`flex flex-col gap-2 px-3.5 py-3 rounded-sm border text-left transition-colors cursor-pointer ${
                        selected
                          ? 'border-accent bg-accent-dim'
                          : 'border-border-dim bg-bg-2 hover:border-accent'
                      }`}
                    >
                      <span className={`flex-shrink-0 ${selected ? 'text-accent' : 'text-text-2'}`}>
                        <ServiceIcon id={svc.id} />
                      </span>
                      <span className={`font-mono text-[11px] font-bold leading-tight ${selected ? 'text-accent' : 'text-text'}`}>
                        {svc.label}
                      </span>
                      <span className={`font-sans text-[11px] leading-snug ${selected ? 'text-accent' : 'text-text-2'}`}>
                        {svc.desc}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-text-3 tracking-widest">
                {dict.form.name}
              </label>
              <input
                type="text"
                placeholder={dict.form.name_ph}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass('name')}
              />
              {errors.name && (
                <span className="font-mono text-[11px] text-red-500">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-text-3 tracking-widest">EMAIL</label>
              <input
                type="email"
                placeholder={dict.form.email_ph}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass('email')}
              />
              {errors.email && (
                <span className="font-mono text-[11px] text-red-500">{errors.email}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-text-3 tracking-widest">
                {dict.form.project}
              </label>
              <textarea
                placeholder={dict.form.project_ph}
                rows={4}
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className={`${inputClass('project')} resize-none`}
              />
              {errors.project && (
                <span className="font-mono text-[11px] text-red-500">{errors.project}</span>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptPrivacy}
                  onChange={(e) => setAcceptPrivacy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-accent cursor-pointer"
                />
                <span className="font-mono text-[11px] text-text-2 leading-relaxed group-hover:text-text transition-colors">
                  {dict.form.accept_privacy}
                </span>
              </label>
              {errors.acceptPrivacy && (
                <span className="font-mono text-[11px] text-red-500 -mt-1">{errors.acceptPrivacy}</span>
              )}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={acceptComms}
                  onChange={(e) => setAcceptComms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 flex-shrink-0 accent-accent cursor-pointer"
                />
                <span className="font-mono text-[11px] text-text-2 leading-relaxed group-hover:text-text transition-colors">
                  {dict.form.accept_comms}
                </span>
              </label>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary self-start disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {status === 'sending' ? dict.form.sending : dict.form.send}
              </button>
              {status === 'error' && (
                <span className="font-mono text-[11px] text-red-500">{t('server_error')}</span>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

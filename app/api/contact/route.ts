import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/schemas/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

const COOLDOWN_MS = 10 * 60 * 1000 // 10 minutes
const ipMap = new Map<string, number>()

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const lastSent = ipMap.get(ip)
  if (lastSent && Date.now() - lastSent < COOLDOWN_MS) {
    return NextResponse.json({ error: 'rate_limit' }, { status: 429 })
  }

  const body = await request.json()

  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten((i) => i.message).fieldErrors },
      { status: 400 }
    )
  }

  const { name, email, project, service, acceptPrivacy, acceptComms } = result.data

  const serviceLabels: Record<string, string> = {
    webapp: 'Software / Web App',
    native: 'Web Nativa',
    automation: 'Automatización n8n',
    landing: 'Landing Page',
  }

  const timestamp = new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? 'AV Digital Solutions <alvaro.valle.fullstack@outlook.com>',
    to: process.env.RESEND_TO ?? 'alvaro.valle.fullstack@outlook.com',
    replyTo: email,
    subject: `Nuevo contacto de ${name}${service ? ` · ${serviceLabels[service]}` : ''}`,
    html: `
      ${service ? `<p><strong>Servicio:</strong> ${serviceLabels[service]}</p>` : ''}
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Proyecto:</strong></p>
      <p>${project.replace(/\n/g, '<br>')}</p>
      <hr style="margin:16px 0;border:none;border-top:1px solid #eee"/>
      <p style="font-size:11px;color:#888"><strong>Consentimiento RGPD</strong><br/>
      Política de privacidad y términos: <strong>${acceptPrivacy ? '✓ Aceptado' : '✗ No aceptado'}</strong><br/>
      Comunicaciones comerciales: <strong>${acceptComms ? '✓ Aceptado' : '✗ No aceptado'}</strong><br/>
      Fecha y hora: ${timestamp}</p>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  ipMap.set(ip, Date.now())
  return NextResponse.json({ success: true }, { status: 200 })
}

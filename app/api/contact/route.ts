import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/schemas/contact'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()

  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.flatten().fieldErrors },
      { status: 400 }
    )
  }

  const { name, email, project, service } = result.data

  const serviceLabels: Record<string, string> = {
    webapp: 'Software / Web App',
    native: 'Web Nativa',
    automation: 'Automatización n8n',
    landing: 'Landing Page',
  }

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? 'AV Digital Solutions <web@avdigital.es>',
    to: process.env.RESEND_TO ?? 'hola@avdigital.es',
    replyTo: email,
    subject: `Nuevo contacto de ${name}${service ? ` · ${serviceLabels[service]}` : ''}`,
    html: `
      ${service ? `<p><strong>Servicio:</strong> ${serviceLabels[service]}</p>` : ''}
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Proyecto:</strong></p>
      <p>${project.replace(/\n/g, '<br>')}</p>
    `,
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

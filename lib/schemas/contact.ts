import { z } from 'zod'

export const SERVICE_IDS = ['webapp', 'native', 'automation', 'landing'] as const
export type ServiceId = typeof SERVICE_IDS[number]

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'name_min' })
    .max(100, { message: 'name_max' }),
  email: z
    .string()
    .email({ message: 'email_invalid' }),
  project: z
    .string()
    .min(10, { message: 'project_min' })
    .max(2000, { message: 'project_max' }),
  service: z.enum(SERVICE_IDS).optional(),
  acceptPrivacy: z.literal(true, { error: () => ({ message: 'accept_required' }) }),
  acceptComms: z.boolean().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>
export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>

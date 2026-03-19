import type { MetadataRoute } from 'next'

const BASE_URL = 'https://avdigital.es'
const LOCALES = ['es', 'en', 'fr', 'it'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'es' ? 1 : 0.8,
  }))
}

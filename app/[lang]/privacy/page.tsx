import { notFound } from 'next/navigation'
import { getDictionary, hasLocale, type Locale } from '../dictionaries'
import LegalPage from '@/components/LegalPage'

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang as Locale)
  const d = dict.privacy

  return (
    <LegalPage
      lang={lang}
      title={d.title}
      intro={d.intro}
      backLabel={lang === 'es' ? 'Volver' : lang === 'fr' ? 'Retour' : lang === 'it' ? 'Torna' : 'Back'}
      sections={[
        { title: d.s1_title, body: d.s1_body },
        { title: d.s2_title, body: d.s2_body },
        { title: d.s3_title, body: d.s3_body },
        { title: d.s4_title, body: d.s4_body },
      ]}
    />
  )
}

import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Languages, MapPin } from 'lucide-react'
import { useI18n } from '../i18n'
import { formatPhone, whatsappLink } from '../lib/whatsapp'
import { PageHeader, WhatsAppIcon } from '../components/ui'

export function Contact() {
  const { t, path } = useI18n()
  const c = t.contact
  const rows = [
    { icon: MapPin, label: c.address, value: c.addressValue, note: c.example },
    { icon: Clock, label: c.hours, value: c.hoursValue },
    { icon: Languages, label: c.languages, value: c.languagesValue },
  ]

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <section className="container-x grid gap-6 py-14 sm:py-20 lg:grid-cols-[1fr_1.35fr]">
        <div className="corners panel flex flex-col p-7 sm:p-10">
          <dl className="divide-y divide-line">
            {rows.map(({ icon: Icon, label, value, note }) => (
              <div key={label} className="flex gap-4 py-5 first:pt-0">
                <Icon className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <dt className="text-sm text-slate">{label}</dt>
                  <dd className="font-display mt-1 text-xl font-medium text-navy">{value}</dd>
                  {note && <dd className="mt-1.5 inline-block bg-mist px-2 py-0.5 text-xs font-medium text-navy">{note}</dd>}
                </div>
              </div>
            ))}
            <div className="flex gap-4 py-5">
              <WhatsAppIcon className="mt-0.5 size-5 shrink-0 text-gold" />
              <div>
                <dt className="text-sm text-slate">{c.whatsapp}</dt>
                <dd className="font-display mt-1 text-xl font-medium text-navy" dir="ltr">
                  {formatPhone()}
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-auto flex flex-col gap-3 border-t border-line pt-7 sm:flex-row">
            <Link to={path('/consultation')} className="btn-primary">
              {t.nav.cta}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <a href={whatsappLink(c.hello)} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <WhatsAppIcon />
              {c.whatsappCta}
            </a>
          </div>
        </div>

        <div className="panel p-2">
          <iframe
            title={c.mapTitle}
            src="https://www.openstreetmap.org/export/embed.html?bbox=-3.9420%2C35.2380%2C-3.9180%2C35.2550&layer=mapnik"
            loading="lazy"
            className="h-full min-h-96 w-full grayscale-[40%]"
          />
        </div>
      </section>
    </>
  )
}

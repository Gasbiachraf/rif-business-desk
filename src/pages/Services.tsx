import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { services } from '../data/services'
import { useI18n } from '../i18n'
import { Orientation } from '../components/Orientation'
import { PageHeader, Reveal, ServiceIcon } from '../components/ui'
import { Cta } from './Home'

export function Services() {
  const { t, l, path } = useI18n()
  return (
    <>
      <PageHeader eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} subtitle={t.servicesPage.subtitle} />

      <section className="container-x grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_400px] lg:gap-16">
        <ol className="border-t border-navy">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={i * 70} className="border-b border-line">
              <article className="group relative grid gap-5 py-8 sm:grid-cols-[3rem_1fr_auto] sm:gap-7">
                <span className="font-display text-2xl text-gold italic" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="font-display flex items-center gap-3 text-[1.75rem] leading-tight font-medium text-navy">
                    <ServiceIcon icon={service.icon} className="size-6 shrink-0 text-gold" />
                    <Link to={path(`/services/${service.slug}`)} className="after:absolute after:inset-0 focus-visible:outline-none group-hover:underline group-hover:decoration-gold group-hover:decoration-1 group-hover:underline-offset-[6px]">
                      {l(service.title)}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-slate">{l(service.summary)}</p>
                  <ul className="mt-5 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {service.included.slice(0, 4).map((item, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-ink/85">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                        {l(item)}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="hidden size-11 place-items-center self-center border border-line text-navy transition group-hover:border-navy group-hover:bg-navy group-hover:text-gold-light sm:grid">
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </span>
              </article>
            </Reveal>
          ))}
        </ol>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Orientation />
          <p className="mt-5 text-xs leading-relaxed text-slate">{t.legal.disclaimer}</p>
        </aside>
      </section>
      <Cta />
    </>
  )
}

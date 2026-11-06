import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, FileText, Languages, Plus, ReceiptText, Scale, Video } from 'lucide-react'
import { findService, services } from '../data/services'
import { useI18n } from '../i18n'
import { ServiceCard } from '../components/ServiceCard'
import { Kicker, ServiceIcon } from '../components/ui'
import { NotFound } from './NotFound'

export function ServiceDetail() {
  const { slug } = useParams()
  const { t, l, path } = useI18n()
  const service = findService(slug)

  if (!service) return <NotFound message={t.service.notFound} />

  const others = services.filter((s) => s.slug !== service.slug)
  const consult = `${path('/consultation')}?service=${service.slug}`
  const index = services.indexOf(service)

  const sections = [
    { id: 'for-who', label: t.service.forWho },
    { id: 'included', label: t.service.included },
    { id: 'documents', label: t.service.documents },
    { id: 'steps', label: t.service.steps },
    { id: 'faq', label: t.service.faq },
  ]
  const facts = [
    { icon: ReceiptText, label: t.service.fees, value: t.service.feesValue },
    { icon: Video, label: t.wa.mode, value: Object.values(t.form.modes).join(' · ') },
    { icon: Languages, label: t.contact.languages, value: t.contact.languagesValue },
  ]

  const heading = (n: number, id: string, label: string) => (
    <h2 id={id} className="font-display flex scroll-mt-28 items-baseline gap-3 text-[1.9rem] leading-tight font-medium text-navy">
      <span className="text-base text-gold italic" aria-hidden="true" dir="ltr">
        § {n}
      </span>
      {label}
    </h2>
  )

  return (
    <>
      <section className="bg-grid-dark relative overflow-hidden bg-navy text-white">
        <div className="container-x grid gap-10 py-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-16">
          <div>
            <Link to={path('/services')} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
              <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
              {t.service.back}
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <span className="grid size-12 place-items-center border border-gold-light/50 text-gold-light">
                <ServiceIcon icon={service.icon} />
              </span>
              <span className="font-display text-gold-light italic" aria-hidden="true">
                — {String(index + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
              </span>
            </div>
            <h1 className="font-display animate-rise mt-6 text-[2.6rem] leading-[1.05] font-medium tracking-[-0.015em] text-balance sm:text-[3.5rem]">
              {l(service.title)}
            </h1>
            <p className="animate-rise mt-5 max-w-xl text-lg leading-relaxed text-white/75 [animation-delay:80ms]">{l(service.intro)}</p>
            <Link to={consult} className="btn-gold mt-8">
              {t.nav.cta}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
          </div>
          <div className="corners relative">
            <img src={service.image} alt="" width={1200} height={800} fetchPriority="high" className="aspect-[3/2] w-full object-cover" />
          </div>
        </div>
        <dl className="border-t border-white/10">
          <div className="container-x grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3 py-5 sm:px-6 sm:first:ps-0">
                <Icon className="mt-0.5 size-5 shrink-0 text-gold-light" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <dt className="text-xs text-white/60">{label}</dt>
                  <dd className="mt-0.5 text-sm font-semibold">{value}</dd>
                </div>
              </div>
            ))}
          </div>
        </dl>
      </section>

      <section className="container-x grid gap-12 py-14 lg:grid-cols-[1fr_340px] lg:gap-16 lg:py-20">
        <div className="min-w-0 space-y-16">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              {heading(1, 'for-who', t.service.forWho)}
              <ul className="mt-6 space-y-3">
                {service.forWho.map((item, i) => (
                  <li key={i} className="flex gap-3 border-b border-line pb-3 text-ink/85">
                    <span className="font-display text-sm text-gold-dark italic" aria-hidden="true">
                      {['a', 'b', 'c', 'd', 'e'][i]}.
                    </span>
                    {l(item)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {heading(2, 'included', t.service.included)}
              <ul className="mt-6 space-y-3">
                {service.included.map((item, i) => (
                  <li key={i} className="flex gap-3 text-ink/85">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center bg-navy text-gold-light" aria-hidden="true">
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    {l(item)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            {heading(3, 'documents', t.service.documents)}
            <div className="corners panel mt-6 p-6 sm:p-8">
              <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {service.documents.map((doc, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink/85">
                    <FileText className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.25} aria-hidden="true" />
                    {l(doc)}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-4 text-xs text-slate">{t.service.documentsNote}</p>
            </div>
          </div>

          <div>
            {heading(4, 'steps', t.service.steps)}
            <ol className="mt-8 grid gap-6 sm:grid-cols-4 sm:gap-4">
              {service.steps.map((step, i) => (
                <li key={i} className="relative flex gap-4 sm:block">
                  <div className="flex items-center sm:mb-4">
                    <span className="font-display grid size-10 shrink-0 place-items-center border border-gold bg-ivory text-navy italic">{i + 1}</span>
                    {i < service.steps.length - 1 && <span className="ms-2 hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />}
                  </div>
                  <p className="pt-2 text-sm font-medium leading-relaxed text-navy sm:pt-0">{l(step)}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            {heading(5, 'faq', t.service.faq)}
            <div className="mt-6 space-y-3">
              {service.faq.map((item, i) => (
                <details key={i} className="group panel open:border-navy/30">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-navy [&::-webkit-details-marker]:hidden">
                    {l(item.q)}
                    <Plus className="size-5 shrink-0 text-gold transition group-open:rotate-45" aria-hidden="true" />
                  </summary>
                  <p className="-mt-1 px-5 pb-5 leading-relaxed text-slate">{l(item.a)}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <nav aria-label={t.service.onPage} className="panel hidden p-6 lg:block">
            <Kicker>{t.service.onPage}</Kicker>
            <ol className="mt-4 space-y-1">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 py-1.5 text-sm text-slate transition hover:text-navy">
                    <span className="font-display text-gold-dark italic" aria-hidden="true">
                      {i + 1}
                    </span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="corners bg-navy p-7 text-white">
            <p className="font-display text-2xl font-medium">{t.service.ctaTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{t.service.ctaText}</p>
            <Link to={consult} className="btn-gold mt-6 w-full">
              {t.nav.cta}
            </Link>
          </div>
          <p className="flex gap-3 text-xs leading-relaxed text-slate">
            <Scale className="size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
            <span>
              {t.legal.disclaimer} {t.legal.independence}
            </span>
          </p>
        </aside>
      </section>

      <section className="border-t border-line bg-mist/60 py-16 sm:py-20">
        <div className="container-x">
          <h2 className="font-display text-3xl font-medium text-navy">{t.service.others}</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <ServiceCard service={s} index={services.indexOf(s)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

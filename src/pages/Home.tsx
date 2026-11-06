import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Globe2, Languages, MessageCircle, Plus, ReceiptText, UserCheck } from 'lucide-react'
import { services, type Service } from '../data/services'
import { useI18n } from '../i18n'
import { whatsappLink } from '../lib/whatsapp'
import { Orientation } from '../components/Orientation'
import { Kicker, Reveal, SectionHeading, ServiceIcon, WhatsAppIcon } from '../components/ui'

function Hero() {
  const { t, path } = useI18n()
  const icons = [UserCheck, ReceiptText, Languages, Globe2]
  return (
    <section className="bg-grid relative overflow-hidden border-b border-line">
      <div className="container-x grid gap-12 pt-12 pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20 lg:pb-24">
        <div className="flex flex-col justify-center">
          <div className="animate-rise">
            <Kicker>{t.hero.eyebrow}</Kicker>
          </div>
          <h1 className="font-display animate-rise mt-6 text-[2.75rem] leading-[1.02] font-medium tracking-[-0.02em] text-balance text-navy [animation-delay:80ms] sm:text-[4.25rem]">
            {t.hero.title}
          </h1>
          <p className="animate-rise mt-6 max-w-xl text-lg leading-relaxed text-slate [animation-delay:160ms]">{t.hero.subtitle}</p>
          <div className="animate-rise mt-9 flex flex-wrap items-center gap-x-6 gap-y-4 [animation-delay:240ms]">
            <Link to={path('/consultation')} className="btn-primary px-7">
              {t.hero.primary}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Link>
            <Link to={path('/services')} className="link-arrow text-navy">
              {t.hero.secondary}
            </Link>
          </div>

          <ul className="animate-rise mt-12 grid gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-2 [animation-delay:320ms]">
            {t.pillars.map((pillar, i) => {
              const Icon = icons[i]
              return (
                <li key={pillar.title} className="flex gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-navy">{pillar.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate">{pillar.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="animate-rise self-center [animation-delay:200ms]">
          <Orientation />
        </div>
      </div>
    </section>
  )
}

function BentoCard({ service, index, feature = false }: { service: Service; index: number; feature?: boolean }) {
  const { t, l, path } = useI18n()
  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden border border-line bg-white transition duration-300 hover:border-navy/40 ${
        feature ? 'lg:row-span-2' : ''
      }`}
    >
      {feature && (
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:flex-1">
          <img
            src={service.image}
            alt=""
            loading="lazy"
            width={1200}
            height={800}
            className="absolute inset-0 h-full w-full object-cover grayscale-[35%] transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-navy/25 mix-blend-multiply" aria-hidden="true" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-12 place-items-center border border-line-cool bg-mist text-navy transition group-hover:border-navy group-hover:bg-navy group-hover:text-gold-light">
            <ServiceIcon icon={service.icon} />
          </span>
          <span className="font-display text-sm text-gold-dark italic" aria-hidden="true">
            — {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className={`font-display mt-6 leading-snug font-medium text-navy ${feature ? 'text-[1.85rem]' : 'text-[1.45rem]'}`}>
          <Link to={path(`/services/${service.slug}`)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {l(service.title)}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">{l(service.summary)}</p>
        {feature && (
          <ul className="mt-5 space-y-2 border-t border-line pt-5">
            {service.included.slice(0, 3).map((item, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-ink/85">
                <Check className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                {l(item)}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
          {t.services.more}
          <ArrowUpRight className="size-4 text-gold transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}

function Services() {
  const { t, path } = useI18n()
  const [first, ...rest] = services
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading n={1} eyebrow={t.services.eyebrow} title={t.services.title} className="max-w-2xl">
          <p className="mt-4 text-lg leading-relaxed text-slate">{t.services.subtitle}</p>
        </SectionHeading>
        <Link to={path('/services')} className="link-arrow text-navy">
          {t.services.all}
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>
      <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr] lg:grid-rows-[auto_auto]">
        <Reveal as="li" className="md:col-span-2 lg:col-span-1 lg:row-span-2">
          <BentoCard service={first} index={0} feature />
        </Reveal>
        {rest.map((service, i) => (
          <Reveal as="li" key={service.slug} delay={(i + 1) * 80} className={i === 2 ? 'md:col-span-2' : ''}>
            <BentoCard service={service} index={i + 1} />
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

function Process() {
  const { t, path } = useI18n()
  return (
    <section id="process" className="border-y border-line bg-white py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading n={2} eyebrow={t.process.eyebrow} title={t.process.title} />
          <p className="mt-5 max-w-md leading-relaxed text-slate">{t.cta.text}</p>
          <Link to={path('/consultation')} className="btn-primary mt-8">
            {t.nav.cta}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>

        <ol className="relative">
          <span className="absolute inset-y-6 start-[1.4rem] w-px bg-line" aria-hidden="true" />
          {t.process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="relative flex gap-6 pb-12 last:pb-0">
              <span
                className="font-display relative z-10 grid size-11 shrink-0 place-items-center border border-gold bg-white text-lg font-medium text-navy italic"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-[1.6rem] leading-tight font-medium text-navy">{step.title}</h3>
                <p className="mt-2 max-w-lg leading-relaxed text-slate">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Profiles() {
  const { t } = useI18n()
  return (
    <section id="profiles" className="bg-grid-dark bg-navy py-20 text-white sm:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading n={3} eyebrow={t.profiles.eyebrow} title={t.profiles.title} light />
          <div className="relative hidden aspect-[21/9] overflow-hidden lg:block">
            <img src="/images/meeting.webp" alt="" loading="lazy" width={1400} height={900} className="h-full w-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" aria-hidden="true" />
          </div>
        </div>

        <ul className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.profiles.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 80} className="flex flex-col bg-navy p-7 transition hover:bg-navy-2">
              <span className="font-display text-sm text-gold-light italic" aria-hidden="true">
                {['I', 'II', 'III', 'IV'][i]}.
              </span>
              <p className="font-display mt-8 text-2xl font-medium">{item.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{item.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Faq() {
  const { t, path } = useI18n()
  return (
    <section id="faq" className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHeading n={4} eyebrow={t.faq.eyebrow} title={t.faq.title} />
        <div className="corners panel mt-10 p-6">
          <p className="flex items-center gap-2.5 font-display text-xl font-medium text-navy">
            <MessageCircle className="size-5 text-gold" strokeWidth={1.5} aria-hidden="true" />
            {t.faq.moreTitle}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate">{t.faq.moreText}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={whatsappLink(t.contact.hello)} target="_blank" rel="noopener noreferrer" className="btn-wa min-h-11 px-5">
              <WhatsAppIcon />
              {t.contact.whatsappCta}
            </a>
            <Link to={path('/consultation')} className="btn-line min-h-11 px-5 text-navy">
              {t.nav.cta}
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {t.faq.items.map((item, i) => (
          <details key={item.q} className="group panel open:border-navy/30">
            <summary className="flex cursor-pointer list-none items-start gap-5 p-6 text-start [&::-webkit-details-marker]:hidden">
              <span className="font-display mt-0.5 text-sm text-gold-dark italic" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="flex-1 font-semibold text-navy">{item.q}</span>
              <Plus className="size-5 shrink-0 text-gold transition group-open:rotate-45" aria-hidden="true" />
            </summary>
            <p className="-mt-2 pe-6 pb-6 ps-[3.75rem] leading-relaxed text-slate">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function Cta() {
  const { t, path } = useI18n()
  return (
    <section className="border-t border-line bg-white">
      <div className="container-x grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <h2 className="font-display text-[2.2rem] leading-tight font-medium text-balance text-navy sm:text-5xl">{t.cta.title}</h2>
          <p className="mt-4 max-w-lg text-lg text-slate">{t.cta.text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link to={path('/consultation')} className="btn-primary px-7">
            {t.cta.button}
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
          <a href={whatsappLink(t.contact.hello)} target="_blank" rel="noopener noreferrer" className="btn-line px-6 text-navy">
            <WhatsAppIcon />
            {t.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <Profiles />
      <Faq />
      <Cta />
    </>
  )
}

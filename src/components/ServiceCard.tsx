import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { Service } from '../data/services'
import { useI18n } from '../i18n'
import { ServiceIcon } from './ui'

/** Compact card used in "other services" lists. */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { l, path } = useI18n()
  return (
    <article className="group relative flex h-full gap-4 border border-line bg-white p-6 transition hover:border-navy/40">
      <span className="grid size-11 shrink-0 place-items-center border border-line-cool bg-mist text-navy transition group-hover:bg-navy group-hover:text-gold-light">
        <ServiceIcon icon={service.icon} className="size-5" />
      </span>
      <div className="flex-1">
        <span className="font-display text-xs text-gold-dark italic" aria-hidden="true">
          — {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-display mt-1 text-lg leading-snug font-medium text-navy">
          <Link to={path(`/services/${service.slug}`)} className="after:absolute after:inset-0 focus-visible:outline-none">
            {l(service.title)}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">{l(service.summary)}</p>
      </div>
      <ArrowUpRight className="size-5 shrink-0 text-gold transition group-hover:-translate-y-0.5 rtl:-scale-x-100" aria-hidden="true" />
    </article>
  )
}

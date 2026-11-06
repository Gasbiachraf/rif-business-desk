import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass, Globe2, RotateCcw } from 'lucide-react'
import { findService } from '../data/services'
import { useI18n } from '../i18n'
import { SITUATIONS, type Situation } from '../lib/consultation'
import { PROJECTS, recommend, type Project } from '../lib/orientation'
import { ServiceIcon } from './ui'

function Choices<T extends string>({
  legend,
  name,
  options,
  labels,
  value,
  onChange,
}: {
  legend: string
  name: string
  options: T[]
  labels: Record<T, string>
  value: T | ''
  onChange: (v: T) => void
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gold-light">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option
          return (
            <label
              key={option}
              className={`cursor-pointer rounded-[3px] border px-3.5 py-2.5 text-sm font-medium transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-light ${
                active ? 'border-gold-light bg-gold-light text-navy' : 'border-white/20 text-white/85 hover:border-white/50 hover:text-white'
              }`}
            >
              <input type="radio" name={name} value={option} checked={active} onChange={() => onChange(option)} className="sr-only" />
              {labels[option]}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function Orientation({ className = '' }: { className?: string }) {
  const { t, l, path } = useI18n()
  const o = t.orient
  const id = useId()
  const [situation, setSituation] = useState<Situation | ''>('')
  const [project, setProject] = useState<Project | ''>('')

  const result = project ? recommend(project, situation || undefined) : null
  const service = result ? findService(result.service) : undefined

  return (
    <div className={`corners bg-navy p-6 text-white shadow-[0_40px_80px_-40px_rgba(11,22,48,0.7)] sm:p-8 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] text-gold-light uppercase rtl:tracking-normal">
          <Compass className="size-4" strokeWidth={1.5} aria-hidden="true" />
          {o.label}
        </p>
        {(situation || project) && (
          <button
            type="button"
            onClick={() => {
              setSituation('')
              setProject('')
            }}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 hover:text-white"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
            {o.reset}
          </button>
        )}
      </div>
      <p className="font-display mt-3 text-[1.9rem] leading-tight font-medium">{o.title}</p>

      <div className="mt-6 space-y-6">
        <Choices legend={`1 · ${o.q1}`} name={`${id}-situation`} options={SITUATIONS} labels={t.form.situations} value={situation} onChange={setSituation} />
        <Choices legend={`2 · ${o.q2}`} name={`${id}-project`} options={PROJECTS} labels={o.projects} value={project} onChange={setProject} />
      </div>

      <div className="mt-7 border-t border-white/15 pt-6" aria-live="polite">
        {result && service ? (
          <div key={`${project}-${situation}`} className="animate-swap">
            <p className="text-xs font-medium text-white/60">{o.result}</p>
            <p className="mt-2 flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center border border-gold-light/40 text-gold-light">
                <ServiceIcon icon={service.icon} className="size-5" />
              </span>
              <span className="font-display text-xl leading-snug font-medium">{l(service.title)}</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{o.reasons[project as Project]}</p>
            {result.remote && (
              <p className="mt-3 flex gap-2 text-sm text-gold-light">
                <Globe2 className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                {o.remote}
              </p>
            )}
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link to={`${path('/consultation')}${result.query}`} className="btn-gold">
                {o.cta}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              <Link to={path(`/services/${service.slug}`)} className="text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white">
                {o.details}
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/60">{o.empty}</p>
        )}
        <p className="mt-5 text-xs text-white/60">{o.note}</p>
      </div>
    </div>
  )
}

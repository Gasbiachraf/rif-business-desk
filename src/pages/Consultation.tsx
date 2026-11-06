import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AlertCircle, ArrowLeft, ArrowRight, Check, CheckCircle2, Info, Pencil, ShieldCheck } from 'lucide-react'
import { useI18n } from '../i18n'
import {
  LEGAL_FORMS,
  MESSAGE_MAX,
  MODES,
  NEEDS,
  SECTORS,
  SERVICE_NEED,
  SITUATIONS,
  SLOTS,
  STEP_FIELDS,
  TIMELINES,
  buildMessage,
  emptyConsultation,
  summaryRows,
  validate,
  type Consultation as Data,
  type Errors,
} from '../lib/consultation'
import { prefillFromQuery } from '../lib/orientation'
import { whatsappLink } from '../lib/whatsapp'
import { PageHeader, WhatsAppIcon } from '../components/ui'

function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  labels,
  value,
  error,
  columns = 'sm:grid-cols-2',
  onChange,
}: {
  name: keyof Data
  legend: string
  options: T[]
  labels: Record<T, string>
  value: T | ''
  error?: string
  columns?: string
  onChange: (value: T) => void
}) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="field-label">{legend}</legend>
      <div className={`grid gap-2.5 ${columns}`}>
        {options.map((option) => (
          <label
            key={option}
            className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-[3px] border px-4 py-3 text-sm transition has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-navy/15 ${
              value === option
                ? 'border-navy bg-navy text-white'
                : error
                  ? 'border-red-700/60 bg-white text-ink hover:border-navy/50'
                  : 'border-line-cool bg-white text-ink hover:border-navy/50'
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <span
              className={`grid size-4 shrink-0 place-items-center rounded-full border ${
                value === option ? 'border-gold bg-gold' : 'border-slate/50'
              }`}
              aria-hidden="true"
            >
              {value === option && <span className="size-1.5 rounded-full bg-white" />}
            </span>
            <span className="font-medium">{labels[option]}</span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${name}-error`} className="field-error">
          {error}
        </p>
      )}
    </fieldset>
  )
}

function Field({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-slate">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

export function Consultation() {
  const { t, lang } = useI18n()
  const [params] = useSearchParams()
  const [data, setData] = useState<Data>(() => {
    // Service pages and the orientation tool pass service / legal form / situation in the URL.
    const pre = prefillFromQuery(params)
    return {
      ...emptyConsultation,
      need: SERVICE_NEED[pre.service] ?? '',
      legalForm: pre.legalForm ?? (pre.service === 'auto-entrepreneur' ? 'ae' : ''),
      situation: pre.situation ?? '',
    }
  })
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Errors>({})
  const [done, setDone] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const f = t.form
  const total = f.steps.length

  const set = <K extends keyof Data>(key: K, value: Data[K]) => {
    setData((prev) => {
      const next = { ...prev, [key]: value }
      // Picking auto-entrepreneur implies the legal form.
      if (key === 'need' && value === 'autoEntrepreneur' && !prev.legalForm) next.legalForm = 'ae'
      return next
    })
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const err = (key: keyof Data) => (errors[key] ? f.errors[errors[key]!] : undefined)
  const aria = (key: keyof Data, withHint = false) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : withHint ? `${key}-hint` : undefined,
  })

  const top = () => formRef.current?.scrollIntoView({ behavior: 'instant', block: 'start' })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const found = validate(data, STEP_FIELDS[step])
    setErrors(found)
    const first = STEP_FIELDS[step].find((key) => found[key])
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (step < total - 1) {
      setStep(step + 1)
      top()
    } else {
      setDone(true)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }

  const hasErrors = Object.values(errors).some(Boolean)
  const message = done ? buildMessage(data, t, lang) : ''

  return (
    <>
      <PageHeader eyebrow={f.eyebrow} title={done ? f.summaryTitle : f.title} subtitle={done ? f.summaryText : f.subtitle} />

      <section className="container-x grid gap-8 py-10 pb-20 sm:py-14 lg:grid-cols-[300px_1fr] lg:gap-12">
        <aside className="hidden lg:block">
          <div className="corners bg-grid-dark sticky top-28 bg-navy p-7 text-white">
            <ol className="space-y-1">
              {f.steps.map((label, i) => {
                const state = done || i < step ? 'done' : i === step ? 'current' : 'todo'
                return (
                  <li key={label} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < total - 1 && <span className="absolute start-[0.95rem] top-9 bottom-1 w-px bg-white/15" aria-hidden="true" />}
                    <span
                      className={`font-display grid size-8 shrink-0 place-items-center border text-sm italic ${
                        state === 'done'
                          ? 'border-gold-light bg-gold-light text-navy'
                          : state === 'current'
                            ? 'border-gold-light text-gold-light'
                            : 'border-white/20 text-white/50'
                      }`}
                      aria-hidden="true"
                    >
                      {state === 'done' ? <Check className="size-4 not-italic" strokeWidth={2.5} /> : i + 1}
                    </span>
                    <span className={`pt-1 text-sm font-medium ${state === 'todo' ? 'text-white/55' : 'text-white'}`}>{label}</span>
                  </li>
                )
              })}
            </ol>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="font-display text-lg font-medium text-gold-light">{f.nextTitle}</p>
              <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-white/70">
                {f.nextSteps.map((item, i) => (
                  <li key={item} className="flex gap-2.5">
                    <span className="font-display text-gold-light italic" aria-hidden="true">
                      {i + 1}.
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>

        <div className="min-w-0 max-w-3xl">
        {done ? (
          <div className="corners panel p-6 sm:p-10">
            <p className="flex items-center gap-3 font-display text-2xl font-medium text-navy">
              <CheckCircle2 className="size-6 text-gold" aria-hidden="true" />
              {f.needs[data.need as keyof typeof f.needs]}
            </p>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {summaryRows(data, t).map(([label, value]) => (
                <div key={label} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
                  <dt className="w-44 shrink-0 text-sm text-slate">{label}</dt>
                  <dd className="font-medium break-words text-navy">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 flex gap-3 border-s-2 border-gold bg-ivory p-4 text-sm text-ink/80">
              <Info className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
              {f.summaryNote}
            </p>
            <details className="mt-6 text-sm">
              <summary className="cursor-pointer font-semibold text-gold-dark">{f.preview}</summary>
              <pre className="mt-3 bg-navy p-5 font-sans text-sm leading-relaxed whitespace-pre-wrap text-white/90">{message}</pre>
            </details>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-wa px-8">
                <WhatsAppIcon />
                {f.openWhatsApp}
              </a>
              <button type="button" onClick={() => setDone(false)} className="btn-line text-navy">
                <Pencil className="size-4" aria-hidden="true" />
                {f.edit}
              </button>
            </div>
          </div>
        ) : (
          <form ref={formRef} onSubmit={onSubmit} noValidate className="panel scroll-mt-28">
            <div className="border-b border-line p-6 sm:px-10">
              <p className="text-xs font-semibold tracking-wide text-gold-dark uppercase rtl:tracking-normal" aria-live="polite">
                {f.stepOf(step + 1, total)} — {f.steps[step]}
              </p>
              <div
                className="mt-3 h-1 overflow-hidden bg-mist"
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={total}
                aria-valuenow={step + 1}
                aria-label={f.stepOf(step + 1, total)}
              >
                <div className="h-full bg-gold transition-all duration-500" style={{ width: `${((step + 1) / total) * 100}%` }} />
              </div>
              <ol className="mt-4 hidden gap-2 text-xs sm:flex lg:hidden">
                {f.steps.map((label, i) => (
                  <li key={label} className={`flex flex-1 items-center gap-2 ${i <= step ? 'text-navy' : 'text-slate/60'}`}>
                    <span
                      className={`grid size-6 shrink-0 place-items-center text-[11px] font-bold ${
                        i < step ? 'bg-gold text-white' : i === step ? 'bg-navy text-white' : 'border border-line'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="font-medium">{label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-7 p-6 sm:p-10">
              {hasErrors && (
                <div role="alert" className="flex items-center gap-3 rounded-[3px] bg-red-50 p-4 text-sm font-medium text-red-800">
                  <AlertCircle className="size-5 shrink-0" aria-hidden="true" />
                  {f.errors.summary}
                </div>
              )}

              {step === 0 && (
                <>
                  <ChoiceGroup name="need" legend={f.need} options={NEEDS} labels={f.needs} value={data.need} error={err('need')} onChange={(v) => set('need', v)} />
                  <ChoiceGroup
                    name="legalForm"
                    legend={f.legalForm}
                    options={LEGAL_FORMS}
                    labels={f.legalForms}
                    value={data.legalForm}
                    error={err('legalForm')}
                    onChange={(v) => set('legalForm', v)}
                  />
                  <Field id="sector" label={f.sector} error={err('sector')}>
                    <select
                      id="sector"
                      name="sector"
                      value={data.sector}
                      onChange={(e) => set('sector', e.target.value as Data['sector'])}
                      className="field"
                      {...aria('sector')}
                    >
                      <option value="">{f.sectorPlaceholder}</option>
                      {SECTORS.map((s) => (
                        <option key={s} value={s}>
                          {f.sectors[s]}
                        </option>
                      ))}
                    </select>
                  </Field>
                </>
              )}

              {step === 1 && (
                <>
                  <ChoiceGroup
                    name="situation"
                    legend={f.situation}
                    options={SITUATIONS}
                    labels={f.situations}
                    value={data.situation}
                    error={err('situation')}
                    columns="sm:grid-cols-1"
                    onChange={(v) => set('situation', v)}
                  />
                  <ChoiceGroup name="timeline" legend={f.timeline} options={TIMELINES} labels={f.timelines} value={data.timeline} error={err('timeline')} onChange={(v) => set('timeline', v)} />
                  <ChoiceGroup name="mode" legend={f.mode} options={MODES} labels={f.modes} value={data.mode} error={err('mode')} columns="sm:grid-cols-3" onChange={(v) => set('mode', v)} />
                  <ChoiceGroup name="slot" legend={f.slot} options={SLOTS} labels={f.slots} value={data.slot} error={err('slot')} columns="sm:grid-cols-3" onChange={(v) => set('slot', v)} />
                </>
              )}

              {step === 2 && (
                <>
                  <Field id="name" label={f.name} error={err('name')}>
                    <input id="name" name="name" autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} className="field" {...aria('name')} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="email" label={f.email} error={err('email')}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        dir="ltr"
                        value={data.email}
                        onChange={(e) => set('email', e.target.value)}
                        className="field rtl:text-end"
                        {...aria('email')}
                      />
                    </Field>
                    <Field id="phone" label={f.phone} hint={f.phoneHint} error={err('phone')}>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        dir="ltr"
                        value={data.phone}
                        onChange={(e) => set('phone', e.target.value)}
                        className="field rtl:text-end"
                        {...aria('phone', true)}
                      />
                    </Field>
                  </div>
                  <Field id="message" label={f.message} error={err('message')}>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder={f.messagePlaceholder}
                      value={data.message}
                      onChange={(e) => set('message', e.target.value)}
                      className="field resize-y"
                      {...aria('message')}
                    />
                    <p className="mt-1 text-end text-xs text-slate" aria-hidden="true">
                      {data.message.length}/{MESSAGE_MAX}
                    </p>
                  </Field>
                  <div>
                    <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-ink/85">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={data.consent}
                        onChange={(e) => set('consent', e.target.checked)}
                        className="mt-0.5 size-5 shrink-0 accent-navy"
                        {...aria('consent')}
                      />
                      {f.consent}
                    </label>
                    {err('consent') && (
                      <p id="consent-error" className="field-error">
                        {err('consent')}
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setErrors({})
                    setStep(step - 1)
                    top()
                  }}
                  className="btn-line text-navy"
                >
                  <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />
                  {f.back}
                </button>
              ) : (
                <span />
              )}
              <button type="submit" className="btn-primary px-8">
                {step < total - 1 ? f.next : f.submit}
                {step < total - 1 && <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />}
              </button>
            </div>
            {step === total - 1 && (
              <p className="flex gap-2 px-6 pb-6 text-xs leading-relaxed text-slate sm:px-10">
                <ShieldCheck className="size-4 shrink-0 text-gold" aria-hidden="true" />
                {f.privacy}
              </p>
            )}
          </form>
        )}
        <p className="mt-6 text-xs text-slate">{t.legal.disclaimer}</p>
        </div>
      </section>
    </>
  )
}

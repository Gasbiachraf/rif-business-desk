import type { Dict } from '../i18n/fr'
import type { Lang } from '../i18n'

type Keys<T> = Extract<keyof T, string>

export type Need = Keys<Dict['form']['needs']>
export type LegalForm = Keys<Dict['form']['legalForms']>
export type Sector = Keys<Dict['form']['sectors']>
export type Situation = Keys<Dict['form']['situations']>
export type Timeline = Keys<Dict['form']['timelines']>
export type Mode = Keys<Dict['form']['modes']>
export type Slot = Keys<Dict['form']['slots']>

export const NEEDS: Need[] = ['creation', 'autoEntrepreneur', 'domiciliation', 'accompagnement', 'other']
export const LEGAL_FORMS: LegalForm[] = ['sarl', 'sarlau', 'ae', 'undecided']
export const SECTORS: Sector[] = ['commerce', 'services', 'tourism', 'construction', 'digital', 'trade', 'agriculture', 'other']
export const SITUATIONS: Situation[] = ['resident', 'mre', 'foreign']
export const TIMELINES: Timeline[] = ['asap', 'month', 'quarter', 'exploring']
export const MODES: Mode[] = ['office', 'phone', 'video']
export const SLOTS: Slot[] = ['morning', 'afternoon', 'saturday']

export interface Consultation {
  need: Need | ''
  legalForm: LegalForm | ''
  sector: Sector | ''
  situation: Situation | ''
  timeline: Timeline | ''
  mode: Mode | ''
  slot: Slot | ''
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
}

export type ErrorKey = keyof Dict['form']['errors']
export type Errors = Partial<Record<keyof Consultation, ErrorKey>>

export const emptyConsultation: Consultation = {
  need: '',
  legalForm: '',
  sector: '',
  situation: '',
  timeline: '',
  mode: '',
  slot: '',
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
}

export const MESSAGE_MAX = 800

/** Fields validated on each of the three form steps. */
export const STEP_FIELDS: Array<Array<keyof Consultation>> = [
  ['need', 'legalForm', 'sector'],
  ['situation', 'timeline', 'mode', 'slot'],
  ['name', 'email', 'phone', 'message', 'consent'],
]

// Service pages pre-select the matching need.
export const SERVICE_NEED: Record<string, Need> = {
  'creation-sarl': 'creation',
  'auto-entrepreneur': 'autoEntrepreneur',
  domiciliation: 'domiciliation',
  accompagnement: 'accompagnement',
}

export function validate(c: Consultation, fields: Array<keyof Consultation> = STEP_FIELDS.flat()): Errors {
  const all: Errors = {}
  if (!c.need) all.need = 'need'
  if (!c.legalForm) all.legalForm = 'legalForm'
  if (!c.sector) all.sector = 'sector'
  if (!c.situation) all.situation = 'situation'
  if (!c.timeline) all.timeline = 'timeline'
  if (!c.mode) all.mode = 'mode'
  if (!c.slot) all.slot = 'slot'
  if (c.name.trim().length < 2) all.name = 'name'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email.trim())) all.email = 'email'
  if (!/^\+?[\d\s().-]+$/.test(c.phone.trim()) || c.phone.replace(/\D/g, '').length < 8) all.phone = 'phone'
  if (c.message.length > MESSAGE_MAX) all.message = 'message'
  if (!c.consent) all.consent = 'consent'

  return Object.fromEntries(Object.entries(all).filter(([key]) => fields.includes(key as keyof Consultation)))
}

/** Label/value pairs shown in the summary and sent on WhatsApp. */
export function summaryRows(c: Consultation, t: Dict): Array<[string, string]> {
  const f = t.form
  const rows: Array<[string, string]> = [
    [t.wa.need, c.need ? f.needs[c.need] : ''],
    [t.wa.legalForm, c.legalForm ? f.legalForms[c.legalForm] : ''],
    [t.wa.sector, c.sector ? f.sectors[c.sector] : ''],
    [t.wa.situation, c.situation ? f.situations[c.situation] : ''],
    [t.wa.timeline, c.timeline ? f.timelines[c.timeline] : ''],
    [t.wa.mode, c.mode ? f.modes[c.mode] : ''],
    [t.wa.slot, c.slot ? f.slots[c.slot] : ''],
    [t.wa.name, c.name.trim()],
    [t.wa.email, c.email.trim()],
    [t.wa.phone, c.phone.trim()],
  ]
  if (c.message.trim()) rows.push([t.wa.message, c.message.trim()])
  return rows
}

export function buildMessage(c: Consultation, t: Dict, lang: Lang) {
  const sep = lang === 'fr' ? ' : ' : ': '
  return [
    t.wa.greeting,
    t.wa.intro,
    '',
    ...summaryRows(c, t).map(([label, value]) => `• ${label}${sep}${value}`),
    '',
    t.wa.outro,
  ].join('\n')
}

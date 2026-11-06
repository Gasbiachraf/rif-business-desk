import type { Dict } from '../i18n/fr'
import { LEGAL_FORMS, SITUATIONS, type LegalForm, type Situation } from './consultation'

export type Project = Extract<keyof Dict['orient']['projects'], string>

export const PROJECTS: Project[] = ['light', 'solo', 'partners', 'address', 'existing']

/** Which service (and legal form, when obvious) fits each kind of project. */
const ROUTES: Record<Project, { service: string; legalForm?: LegalForm }> = {
  light: { service: 'auto-entrepreneur', legalForm: 'ae' },
  solo: { service: 'creation-sarl', legalForm: 'sarlau' },
  partners: { service: 'creation-sarl', legalForm: 'sarl' },
  address: { service: 'domiciliation' },
  existing: { service: 'accompagnement' },
}

export function recommend(project: Project, situation?: Situation) {
  const route = ROUTES[project]
  const params = new URLSearchParams({ service: route.service })
  if (route.legalForm) params.set('form', route.legalForm)
  if (situation) params.set('situation', situation)
  return {
    service: route.service,
    legalForm: route.legalForm,
    remote: situation === 'mre' || situation === 'foreign',
    query: `?${params}`,
  }
}

/** Reads the pre-fill values a consultation link may carry, ignoring anything unknown. */
export function prefillFromQuery(params: URLSearchParams) {
  const form = params.get('form')
  const situation = params.get('situation')
  return {
    service: params.get('service') ?? '',
    legalForm: LEGAL_FORMS.includes(form as LegalForm) ? (form as LegalForm) : undefined,
    situation: SITUATIONS.includes(situation as Situation) ? (situation as Situation) : undefined,
  }
}

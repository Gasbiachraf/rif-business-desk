import { describe, expect, it } from 'vitest'
import { fr } from '../i18n/fr'
import { en } from '../i18n/en'
import { ar } from '../i18n/ar'
import { services } from '../data/services'
import { SERVICE_NEED, STEP_FIELDS, buildMessage, emptyConsultation, validate, type Consultation } from './consultation'

const complete: Consultation = {
  need: 'creation',
  legalForm: 'sarlau',
  sector: 'tourism',
  situation: 'mre',
  timeline: 'quarter',
  mode: 'video',
  slot: 'morning',
  name: 'Youssef A.',
  email: 'youssef@example.com',
  phone: '+33 6 12 34 56 78',
  message: '',
  consent: true,
}

describe('validate', () => {
  it('accepts a complete request', () => {
    expect(validate(complete)).toEqual({})
  })

  it('only reports the fields of the current step', () => {
    expect(Object.keys(validate(emptyConsultation, STEP_FIELDS[0]))).toEqual(['need', 'legalForm', 'sector'])
    expect(Object.keys(validate(emptyConsultation, STEP_FIELDS[1]))).toEqual(['situation', 'timeline', 'mode', 'slot'])
    expect(Object.keys(validate(emptyConsultation, STEP_FIELDS[2]))).toEqual(['name', 'email', 'phone', 'consent'])
  })

  it('checks email, phone and consent', () => {
    expect(validate({ ...complete, email: 'youssef@' }).email).toBe('email')
    expect(validate({ ...complete, phone: '06 12' }).phone).toBe('phone')
    expect(validate({ ...complete, consent: false }).consent).toBe('consent')
    expect(validate({ ...complete, message: 'x'.repeat(801) }).message).toBe('message')
  })
})

describe('buildMessage', () => {
  it('summarises the consultation in French', () => {
    const text = buildMessage({ ...complete, message: 'Projet de riad' }, fr, 'fr')
    expect(text).toContain('Bonjour Rif Business Desk,')
    expect(text).toContain('• Besoin : Créer une société')
    expect(text).toContain('• Forme juridique : SARL AU (associé unique)')
    expect(text).toContain('• Situation : Marocain résidant à l’étranger (MRE)')
    expect(text).toContain('• Rendez-vous : Visio')
    expect(text).toContain('• Projet : Projet de riad')
  })

  it('omits an empty message and localises labels', () => {
    expect(buildMessage(complete, fr, 'fr')).not.toContain('Projet :')
    expect(buildMessage(complete, en, 'en')).toContain('• Need: Set up a company')
    expect(buildMessage(complete, ar, 'ar')).toContain('تأسيس شركة')
  })
})

describe('services', () => {
  it('maps every service to a form need and has translations', () => {
    for (const s of services) {
      expect(SERVICE_NEED[s.slug]).toBeDefined()
      expect(s.title.fr && s.title.ar && s.title.en).toBeTruthy()
      expect(s.steps).toHaveLength(4)
    }
  })
})

import { describe, expect, it } from 'vitest'
import { services } from '../data/services'
import { PROJECTS, prefillFromQuery, recommend } from './orientation'

describe('recommend', () => {
  it('routes every project to an existing service', () => {
    const slugs = services.map((s) => s.slug)
    for (const project of PROJECTS) expect(slugs).toContain(recommend(project).service)
  })

  it('builds a consultation link with the legal form and situation', () => {
    expect(recommend('solo', 'mre')).toMatchObject({
      service: 'creation-sarl',
      legalForm: 'sarlau',
      remote: true,
      query: '?service=creation-sarl&form=sarlau&situation=mre',
    })
    expect(recommend('address', 'resident')).toMatchObject({ remote: false, query: '?service=domiciliation&situation=resident' })
  })
})

describe('prefillFromQuery', () => {
  it('keeps known values and drops unknown ones', () => {
    expect(prefillFromQuery(new URLSearchParams('service=creation-sarl&form=sarl&situation=foreign'))).toEqual({
      service: 'creation-sarl',
      legalForm: 'sarl',
      situation: 'foreign',
    })
    expect(prefillFromQuery(new URLSearchParams('form=sa&situation=x'))).toEqual({
      service: '',
      legalForm: undefined,
      situation: undefined,
    })
  })
})

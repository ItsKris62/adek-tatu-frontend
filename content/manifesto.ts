import type { ContentStatus } from './content-status'

export type ManifestoPillar = {
  number: string
  slug: string
  title: string
  description: string
}

export const manifestoStatus: ContentStatus = 'APPROVED'

export const manifestoPillars: ManifestoPillar[] = [
  {
    number: '01',
    slug: 'democracy-justice-rule-of-law',
    title: 'Democracy, Justice and the Rule of Law',
    description:
      'Protect constitutional institutions, civil liberties, access to justice, credible elections, independent oversight and lawful public administration.',
  },
  {
    number: '02',
    slug: 'jobs-enterprise-cost-of-living',
    title: 'Jobs, Enterprise and Cost of Living',
    description:
      'Promote productive investment, MSMEs, agriculture, manufacturing, digital enterprise, fair taxation, competition and practical measures that raise household incomes.',
  },
  {
    number: '03',
    slug: 'equal-development-and-devolution',
    title: 'Equal Development and Devolution',
    description:
      'Strengthen counties, equitable sharing of resources, infrastructure, water, roads, electricity and balanced regional development.',
  },
  {
    number: '04',
    slug: 'education-skills-and-youth-opportunity',
    title: 'Education, Skills and Youth Opportunity',
    description:
      'Improve learning outcomes, technical skills, digital capability, apprenticeships, entrepreneurship and pathways from school to work.',
  },
  {
    number: '05',
    slug: 'health-and-social-protection',
    title: 'Health and Social Protection',
    description:
      'Support accessible, affordable and accountable health services and targeted social protection for vulnerable households.',
  },
  {
    number: '06',
    slug: 'agriculture-and-food-security',
    title: 'Agriculture and Food Security',
    description:
      'Improve farmer productivity, irrigation, storage, market access, value addition and resilience to climate and price shocks.',
  },
  {
    number: '07',
    slug: 'integrity-and-public-finance',
    title: 'Integrity and Public Finance',
    description:
      'Strengthen procurement transparency, value for money, debt discipline, audit follow-up, anti-corruption enforcement and citizen access to public information.',
  },
  {
    number: '08',
    slug: 'women-pwds-minorities-and-marginalized-groups',
    title: 'Women, PWDs, Minorities and Marginalized Groups',
    description:
      'Advance substantive inclusion, accessibility, representation, safety, economic opportunity and affirmative measures consistent with the Constitution.',
  },
  {
    number: '09',
    slug: 'environment-and-climate-resilience',
    title: 'Environment and Climate Resilience',
    description:
      'Protect forests, water, land and biodiversity while supporting climate-smart agriculture, clean energy and resilient infrastructure.',
  },
  {
    number: '10',
    slug: 'national-cohesion-and-security',
    title: 'National Cohesion and Security',
    description:
      'Promote peace, lawful security services, prevention of political violence, community trust and national reconciliation.',
  },
]

export function getPillar(slug: string) {
  return manifestoPillars.find((p) => p.slug === slug)
}

export function getPillarNeighbours(slug: string) {
  const index = manifestoPillars.findIndex((p) => p.slug === slug)
  return {
    prev: index > 0 ? manifestoPillars[index - 1] : null,
    next: index < manifestoPillars.length - 1 ? manifestoPillars[index + 1] : null,
  }
}

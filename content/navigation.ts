export type NavLink = { label: string; href: string }

export const primaryNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
]

export const utilityNav: NavLink[] = [
  { label: 'Official Documents', href: '/documents' },
  { label: 'Membership', href: '/join' },
  { label: 'Contact', href: '/contact' },
]

export const footerGroups: { title: string; links: NavLink[] }[] = [
  {
    title: 'ADEK',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Ideology', href: '/ideology' },
      { label: 'Vision, Mission & Values', href: '/vision-mission-values' },
      { label: 'Leadership', href: '/leadership' },
    ],
  },
  {
    title: 'Policy',
    links: [
      { label: 'Manifesto', href: '/manifesto' },
      { label: 'Official Documents', href: '/documents' },
      { label: 'Constitution & Rules', href: '/constitution-rules' },
    ],
  },
  {
    title: 'Membership',
    links: [
      { label: 'Join ADEK', href: '/join' },
      { label: 'Eligibility', href: '/join/eligibility' },
      { label: 'Recruitment Procedure', href: '/join/recruitment-procedure' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'News', href: '/news' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Complaints', href: '/complaints' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
]

export const mobileNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About ADEK', href: '/about' },
  { label: 'Manifesto', href: '/manifesto' },
  { label: 'Leadership', href: '/leadership' },
  { label: 'News', href: '/news' },
  { label: 'Join ADEK', href: '/join' },
  { label: 'Contact', href: '/contact' },
]

export const mobileSecondaryNav: NavLink[] = [
  { label: 'Ideology', href: '/ideology' },
  { label: 'Vision, Mission & Values', href: '/vision-mission-values' },
  { label: 'TATU Values', href: '/tatu-values' },
  { label: 'Official Documents', href: '/documents' },
  { label: 'Constitution & Rules', href: '/constitution-rules' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Complaints', href: '/complaints' },
  { label: 'Accessibility', href: '/accessibility' },
]

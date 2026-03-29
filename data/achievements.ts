export interface Achievement {
  serial: string
  title: string
  note: string
}

export interface Certification {
  name: string
  issuer: string
  year?: string
}

export const achievements: Achievement[] = [
  {
    serial: '01',
    title: 'Secured College Rank 1 — Binary Blitz',
    note: 'Ranked first in a coding challenge with around 1300 participants.',
  },
  {
    serial: '02',
    title: 'Solved 350+ Problems Across Coding Platforms',
    note: 'Consistent DSA practice on GFG, LeetCode, CodeChef, and HackerRank. ',
  },
  {
    serial: '03',
    title: 'Built and Deployed Multiple Full-Stack Projects',
    note: 'Shipped practical apps spanning recruitment, collaboration, and AI-assisted use cases.',
  },
]

export const certifications: Certification[] = [
  {
    name: 'Oracle Data Platform 2025 Certified Foundations Associate',
    issuer: 'Oracle University',
    year: '2026',
  },
  {
    name: 'MongoDB Skills Badges (14 Badges)',
    issuer: 'Credly',
    year: '2025',
  },
  {
    name: 'Cloud Computing',
    issuer: 'NPTEL',
    year: '2025',
  },
  {
    name: 'Computer Communications',
    issuer: 'Coursera',
    year: '2024',
  },
]

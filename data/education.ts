export interface EducationEntry {
  serial: string
  degree: string
  field: string
  institution: string
  years: string
  note?: string
  current?: boolean
}

export const educationEntries: EducationEntry[] = [
  {
    serial: '01',
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    institution: 'Lovely Professional University, Punjab',
    years: "Aug'23 – Present",
    note: 'Current CGPA: 7.03 • Relevant coursework: DSA, DBMS, Operating Systems, OOP, System Design, Computer Networks',
    current: true,
  },
  {
    serial: '02',
    degree: 'Intermediate',
    field: 'Science (PCM)',
    institution: 'Ekalavya Educational Complex, Bihar',
    years: "Apr'21 – Mar'23",
    note: 'Percentage: 69',
  },
  {
    serial: '03',
    degree: 'Matriculation',
    field: '',
    institution: 'Ekalavya Educational Complex, Bihar',
    years: "Apr'20 – Mar'21",
    note: 'Percentage: 88',
  },
]

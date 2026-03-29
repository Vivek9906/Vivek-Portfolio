export interface Interest {
  icon: string
  title: string
  description: string
  wide?: boolean
}

export const interests: Interest[] = [
  {
    icon: '◈',
    title: 'Problem Solving',
    description:
      'I treat every bug like a puzzle. The 2am debugging sessions are a feature, not a bug.',
    wide: true,
  },
  {
    icon: '↯',
    title: 'Open Source & Collaboration',
    description:
      'I believe software built together is better. Always looking to collaborate on things that matter.',
    wide: true,
  },
  {
    icon: '△',
    title: 'DSA & Competitive Thinking',
    description:
      'Not just writing code that works — writing code that wins. Currently grinding algorithms because efficiency is a craft.',
  },
  {
    icon: '♩',
    title: 'Music & Creative Inputs',
    description:
      'Music is how I reset. Great design and great music have the same thing in common: rhythm.',
  },
  {
    icon: '✐',
    title: 'Writing & Technical Blogging',
    description:
      'I write on Medium occasionally. Explaining things clearly is half the job of engineering.',
  },
  {
    icon: '◎',
    title: 'Building in Public',
    description:
      "I like sharing what I'm working on. If it helps one person, it was worth posting.",
  },
]

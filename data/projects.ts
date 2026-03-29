import { Project, Service } from '@/types'

export const featuredProjects: Project[] = [
  {
    id: 1,
    title: 'HireMatrix',
    category: 'Full-Stack Web App',
    description:
      'Built a full-stack recruitment platform supporting 500+ listings and seamless interactions between recruiters and job seekers with real-time updates.',
    url: 'https://github.com/Vivek9906/jobPortalApp',
    year: 2025,
    image: '/projects/hirematrix.png',
  },
  {
    id: 2,
    title: 'Hoist',
    category: 'Full-Stack Platform',
    description:
      'Engineered a real-time collaborative watch platform with synchronized playback and frame-accurate co-browsing, handling high concurrency smoothly.',
    url: 'https://github.com/Vivek9906/hoist',
    year: 2026,
    image: '/projects/hoist.png',
  },
  {
    id: 3,
    title: 'College Voice Assistant',
    category: 'AI / NLP Project',
    description:
      'Designed a FastAPI-based campus voice assistant handling 200+ daily queries with speech-to-text workflows and NLP intent processing.',
    url: 'https://github.com/Vivek9906/college-voice-assistant',
    year: 2025,
    image: '/projects/college-voice-assistant.png',
  },
  {
    id: 4,
    title: 'Climate Resilience Website',
    category: 'Awareness Web Platform',
    description:
      'A climate awareness platform presenting data-driven insights on environmental resilience, built with clean UI and educational intent.',
    url: 'https://github.com/Vivek9906/Climate-resilience-website',
    year: 2024,
    image: '/projects/climate-resilience.png',
  },
  {
    id: 5,
    title: 'Music Webpage',
    category: 'Frontend / UI',
    description:
      'An interactive, visually rich music landing page with smooth animations and an immersive audio-first browsing experience.',
    url: 'https://github.com/Vivek9906/music-webpage',
    year: 2024,
    image: '/projects/music-webpage.png',
  },
]

export const services: Service[] = [
  {
    number: '01',
    title: 'Full-Stack Development',
    tags: [
      'Node.js, Express.js, REST APIs',
      'Firebase, MySQL, Python',
      'Git, GitHub, Postman',
    ],
    description:
      'From frontend to backend, I build complete web solutions. Clean architecture, RESTful design, and systems that hold up when real users show up.',
  },
  {
    number: '02',
    title: 'UI/UX & Frontend',
    tags: [
      'HTML, CSS, JavaScript',
      'Responsive, accessible design',
      'Performance-first builds',
    ],
    description:
      "Good interfaces feel invisible. I design and build responsive, intuitive frontends that work across every device — fast, accessible, and polished to the last pixel.",
  },
  {
    number: '03',
    title: 'Problem Solving & DSA',
    tags: [
      'Data Structures & Algorithms',
      'Python, C, C++',
      'OOP, DBMS, OS Fundamentals',
    ],
    description:
      "Building it is one thing. Building it efficiently is another. I apply CS fundamentals and algorithmic thinking to write code that's not just functional — but fast and maintainable at scale.",
  },
]

export const skillRows = {
  row1: [
    'JavaScript',
    'Python',
    'C',
    'C++',
    'HTML5',
    'CSS3',
    'MySQL',
    'Git',
    'GitHub',
    'Firebase',
    'Postman',
  ],
  row2: [
    'Node.js',
    'Express.js',
    'React',
    'TailwindCSS',
    'Bootstrap',
    'jQuery',
    'Flask',
  ],
  row3: ['DSA', 'DBMS', 'OOP', 'Operating Systems', 'System Design'],
}

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vivekraj09/' },
  { name: 'Instagram', url: 'https://instagram.com/baegannnnnn' },
  { name: 'GitHub', url: 'https://github.com/Vivek9906' },
  { name: 'Twitter', url: 'https://x.com/VivekRaj438647' },
  { name: 'Medium', url: 'https://medium.com/@vivekbr6541' },
  {
    name: 'StackOverflow',
    url: 'https://stackoverflow.com/users/22971562/vivek-raj',
  },
]

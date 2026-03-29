import dynamic from 'next/dynamic'
import { getGitHubUser, getGitHubRepos } from '@/lib/github'
import { featuredProjects } from '@/data/projects'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import About from '@/components/About'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Interests from '@/components/Interests'
import Achievements from '@/components/Achievements'

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
})
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), {
  ssr: false,
})

export default async function Home() {
  const [githubUser, githubRepos] = await Promise.all([
    getGitHubUser(),
    getGitHubRepos(),
  ])

  // Enrich featured projects with live data
  const enrichedProjects = featuredProjects.map((project) => {
    const repoName = project.url.split('/').pop()?.toLowerCase()
    const liveRepo = githubRepos.find(
      (r) => r.name.toLowerCase() === repoName
    )
    if (liveRepo) {
      return {
        ...project,
        stars: liveRepo.stargazers_count,
        forks: liveRepo.forks_count,
      }
    }
    return project
  })

  // E8 Order:
  // 1. Navbar
  // 2. Hero (includes HeroTicker)
  // 3. Services
  // 4. Projects
  // 5. Skills Marquee
  // 6. About
  // 7. Education
  // 8. Achievements
  // 9. Personal Interests
  // 10. Contact
  // 11. Footer

  return (
    <main>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Services />
      <Projects featuredProjects={enrichedProjects} />
      <Skills />
      <About avatarUrl={githubUser?.avatar_url} />
      <Education />
      <Achievements />
      <Interests />
      <Contact />
      <Footer />
    </main>
  )
}

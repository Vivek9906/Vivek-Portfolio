/** Return type of gsap.context() — used with dynamic import where GSAP types aren’t on the module namespace */
export type GsapContextHandle = {
  revert: () => void
}

export interface GitHubUser {
  login: string
  name: string
  avatar_url: string
  bio: string
  public_repos: number
  followers: number
  following: number
  html_url: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
}

export interface Project {
  id: number
  title: string
  category: string
  description: string
  url: string
  year: number
  image?: string
  stars?: number
  forks?: number
}

export interface Service {
  number: string
  title: string
  tags: string[]
  description: string
}

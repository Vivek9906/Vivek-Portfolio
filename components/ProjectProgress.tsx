'use client'

interface ProjectProgressProps {
  total: number
  active: number
}

export default function ProjectProgress({ total, active }: ProjectProgressProps) {
  return (
    <div className="project-progress hidden lg:flex">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`project-progress-line ${i === active ? 'active' : ''}`}
        />
      ))}
    </div>
  )
}

'use client'

import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Project } from '@/types'

interface ProjectCardProps {
  project: Project
  index: number
  isActive?: boolean
  isMobile?: boolean
  className?: string
}

export default function ProjectCard({
  project,
  index,
  isActive = false,
  isMobile = false,
  className = '',
}: ProjectCardProps) {
  const serialNumber = String(index + 1).padStart(2, '0')

  // If mobile, render the stacked version (image top, text bottom usually, or whatever fits best)
  // According to E3: left-text/right-image layout but stack vertically on mobile (image above text on small screens)
  return (
    <div
      className={`w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20 ${className}`}
      data-project={serialNumber}
    >
      {/* Left Text Content (55% on desktop, 100% mobile) */}
      <div className="w-full lg:w-[55%] flex flex-col">
        {/* Serial Number */}
        <span
          className="font-bold text-text-muted/40 mb-4"
          style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 0.9 }}
        >
          {serialNumber}
        </span>

        {/* Title */}
        <h3
          className="font-bold text-text-light uppercase tracking-tight mb-2"
          style={{
            fontSize: 'clamp(3rem, 7vw, 7rem)',
            fontFamily: 'var(--font-space-grotesk)',
            lineHeight: 0.95,
          }}
        >
          {project.title}
        </h3>

        {/* Category Tag */}
        <span className="label-text text-text-muted mb-6 block">
          ({project.category})
        </span>

        {/* Description / Note */}
        <p className="body-text text-text-light/60 max-w-lg mb-8">
          {project.description}
        </p>

        {/* Tech Tags - pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="pill-tag">
            {project.year}
          </span>
          <span className="pill-tag">
            Full-Stack
          </span>
          {project.stars !== undefined && project.stars > 0 && (
            <span className="pill-tag text-white border-white/30">
              ★ {project.stars}
            </span>
          )}
        </div>

        {/* CTA */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-text-subtle text-text-light px-8 py-3 rounded-full w-fit text-sm tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-colors"
        >
          View Project{' '}
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Right Image/Mockup (45% on desktop) */}
      <div className="w-full lg:w-[45%] h-full flex items-center justify-center">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative w-full aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/3] rounded-xl overflow-hidden border border-[#222] bg-[#111] group block transition-[transform,filter] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:scale-[1.02] hover:brightness-[1.08] ${
            isActive && !isMobile ? 'scale-[1.01] brightness-[1.06]' : ''
          }`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          ) : (
            /* CSS drawn browser mockup if no image */
            <div className="w-full h-full flex flex-col opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              {/* Browser bar */}
              <div className="h-8 border-b border-[#222] w-full flex items-center px-4 gap-2 bg-[#0a0a0a]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
              </div>
              {/* Content area placeholder */}
              <div className="flex-1 flex items-center justify-center bg-[#0d0d0d] p-8 text-center">
                <span className="font-bold text-[#333] tracking-widest uppercase text-3xl">
                  {project.title}
                </span>
              </div>
            </div>
          )}
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
        </a>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'

const projects = [
  {
    id: '01',
    title: 'Luminary',
    titleItalic: 'Brand & System',
    description:
      'End-to-end design system and marketing site for a Series A fintech startup. 200+ components, token-driven theming, and a launch that converted at 3.2×.',
    tags: ['Design System', 'Next.js', 'Figma Tokens'],
    backplateColor: '#1E2D3A',
    tagColor: 'rgba(245,240,234,0.15)',
    tagTextColor: '#F5F0EA',
    visualBg: 'linear-gradient(135deg, #1E2D3A 0%, #2d4557 40%, #4A7B9D 100%)',
    align: 'left',
    year: '2024',
  },
  {
    id: '02',
    title: 'Terrain',
    titleItalic: 'Configure & Build',
    description:
      'Real-time 3D product configurator for a sustainable furniture brand. WebGL-powered, 40+ material variants, integrated e-commerce flow.',
    tags: ['Three.js / R3F', 'React', 'Commerce'],
    backplateColor: '#4A7B9D',
    tagColor: 'rgba(30,45,58,0.2)',
    tagTextColor: '#1E2D3A',
    visualBg: 'linear-gradient(135deg, #4A7B9D 0%, #6a9bbf 50%, #F0C4B0 100%)',
    align: 'right',
    year: '2024',
  },
  {
    id: '03',
    title: 'Obsidian',
    titleItalic: 'Editorial & Craft',
    description:
      'CMS-powered editorial platform and brand presence for a luxury content studio. Cinematic transitions, bespoke animations, award shortlisted.',
    tags: ['GSAP', 'Sanity CMS', 'Tailwind'],
    backplateColor: '#D4907A',
    tagColor: 'rgba(30,45,58,0.15)',
    tagTextColor: '#1E2D3A',
    visualBg: 'linear-gradient(135deg, #D4907A 0%, #e8b89e 50%, #F5F0EA 100%)',
    align: 'left',
    year: '2023',
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const isRight = project.align === 'right'

  return (
    <div
      className={`work-item reveal relative flex items-stretch ${
        isRight ? 'flex-row-reverse' : 'flex-row'
      } gap-0`}
      data-index={index}
    >
      {/* ── Visual panel ── */}
      <div className="work-visual relative flex-1 min-h-[480px] lg:min-h-[560px]">
        <div
          className="work-visual-inner absolute inset-0"
          style={{ background: project.visualBg }}
        >
          {/* Project number watermark */}
          <span
            className="absolute bottom-6 right-8 font-epilogue font-black opacity-10 leading-none"
            style={{ fontSize: '120px', color: '#F5F0EA', letterSpacing: '-0.06em' }}
          >
            {project.id}
          </span>

          {/* Subtle grid on visual */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          {/* Mock UI element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-56 h-36 border rounded-lg opacity-20"
              style={{ borderColor: 'rgba(245,240,234,0.4)' }}
            />
          </div>
        </div>
      </div>

      {/* ── Backplate card (overlaps visual) ── */}
      <div
        className={`backplate-card relative z-10 flex flex-col justify-between p-10 lg:p-14 ${
          isRight
            ? 'mr-[-60px] lg:mr-[-80px]'
            : 'ml-[-60px] lg:ml-[-80px]'
        }`}
        style={{
          background: project.backplateColor,
          width: 'clamp(300px, 38%, 480px)',
          minHeight: '400px',
          alignSelf: 'center',
        }}
      >
        {/* Year */}
        <div className="flex justify-between items-start mb-auto">
          <span
            className="font-epilogue text-xs uppercase tracking-widest"
            style={{ color: 'rgba(245,240,234,0.4)' }}
          >
            {project.year}
          </span>
          <span
            className="font-epilogue font-black text-sm"
            style={{ color: 'rgba(245,240,234,0.15)', letterSpacing: '-0.04em' }}
          >
            {project.id}
          </span>
        </div>

        {/* Title */}
        <div className="my-8">
          <h3
            className="font-epilogue font-black leading-tight text-parchment"
            style={{
              fontSize: 'clamp(28px, 3vw, 42px)',
              letterSpacing: '-0.04em',
            }}
          >
            {project.title}
          </h3>
          <p
            className="playfair-italic"
            style={{
              fontSize: 'clamp(24px, 2.5vw, 36px)',
              color: 'rgba(245,240,234,0.7)',
            }}
          >
            {project.titleItalic}
          </p>
        </div>

        {/* Description */}
        <p
          className="font-epilogue leading-relaxed mb-8"
          style={{
            fontSize: 'clamp(13px, 1.1vw, 15px)',
            color: 'rgba(245,240,234,0.65)',
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-epilogue font-semibold uppercase tracking-wider rounded-sm"
              style={{
                background: project.tagColor,
                color: project.tagTextColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Case study link */}
        <a
          href="#"
          className="arrow-link inline-flex items-center gap-2 font-epilogue font-bold uppercase tracking-widest text-xs"
          style={{ color: 'rgba(245,240,234,0.8)' }}
        >
          Case Study <span className="arrow text-base">→</span>
        </a>
      </div>
    </div>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      const items = sectionRef.current?.querySelectorAll('.reveal')
      items?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              once: true,
            },
          }
        )
      })
    }

    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-32 overflow-hidden"
      style={{ background: '#F5F0EA' }}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Section header */}
        <div className="reveal flex items-end justify-between mb-20 flex-wrap gap-8">
          <div>
            <span
              className="block font-epilogue text-xs uppercase tracking-widest mb-4"
              style={{ color: 'rgba(30,45,58,0.4)' }}
            >
              Selected Work
            </span>
            <h2
              className="font-epilogue font-black leading-tight text-slate-navy"
              style={{
                fontSize: 'clamp(40px, 5vw, 72px)',
                letterSpacing: '-0.04em',
              }}
            >
              Projects that{' '}
              <span className="playfair-italic">move</span>
            </h2>
          </div>
          <a
            href="#"
            className="arrow-link font-epilogue font-bold uppercase tracking-widest text-xs text-slate-navy/50 hover:text-slate-navy transition-colors flex items-center gap-2"
          >
            All Work <span className="arrow">→</span>
          </a>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-24 lg:gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

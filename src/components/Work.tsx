'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: '01',
    title: 'Lustro',
    titleItalic: 'Brand & Web',
    description:
      'Brand identity and web presence for a luxury shoe restoration service targeting high-end clientele in Los Angeles. Positioning a master cobbler from $8 mall service to $40–45 bespoke craft — built around story, trust, and a content-led acquisition strategy.',
    tags: ['Brand Identity', 'Next.js', 'Content Strategy'],
    backplateColor: '#1E2D3A',
    scrimColor: '#0e1928',
    tagColor: 'rgba(245,240,234,0.12)',
    tagTextColor: '#F5F0EA',
    visualBg: 'linear-gradient(135deg, #0e1d29 0%, #1E2D3A 28%, #2a4a61 65%, #4A7B9D 100%)',
    align: 'left' as const,
    year: '2026',
    url: 'https://lustroshoecare.netlify.app/' as string | null,
    ctaLabel: 'View Site',
  },
  {
    id: '02',
    title: 'Xiomara',
    titleItalic: 'Case Study',
    description:
      'Concept UI for a women\'s wellness coaching platform — designed to carry visitors from curiosity to commitment. Editorial-style typography, a four-pillar content structure, and a mobile-first layout built entirely in HTML and CSS.',
    tags: ['HTML', 'CSS', 'Concept UI'],
    backplateColor: '#4A7B9D',
    scrimColor: '#2a4a61',
    tagColor: 'rgba(30,45,58,0.18)',
    tagTextColor: '#1E2D3A',
    visualBg: 'linear-gradient(140deg, #18384f 0%, #4A7B9D 38%, #7dc0e0 70%, #cce7f5 100%)',
    align: 'right' as const,
    year: '2025',
    url: 'https://gabriela-chirinos.github.io/fitnessCoach_casestudy/' as string | null,
    ctaLabel: 'View Case Study',
  },
  {
    id: '03',
    title: 'Portfolio',
    titleItalic: 'Design & Build',
    description:
      'This site — designed and built from scratch. Custom GSAP animations, sacred geometry visuals, cinematic scroll reveals, and a component system in Next.js and TypeScript. The brief was simple: make something that could not have been generated.',
    tags: ['Next.js', 'TypeScript', 'GSAP'],
    backplateColor: '#D4907A',
    scrimColor: '#b06b55',
    tagColor: 'rgba(30,45,58,0.15)',
    tagTextColor: '#1E2D3A',
    visualBg: 'linear-gradient(130deg, #a85d47 0%, #D4907A 34%, #eaaa88 66%, #F5F0EA 100%)',
    align: 'left' as const,
    year: '2026',
    url: null as string | null,
    ctaLabel: 'Coming Soon',
  },
]

// ── Per-project SVG illustration ─────────────────────────────────────────────

function LuminaryIllustration() {
  const cols = 6, rows = 5
  const gx = (i: number) => 60 + i * 64
  const gy = (i: number) => 60 + i * 64
  return (
    <svg viewBox="0 0 460 380" fill="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {Array.from({ length: cols }).map((_, c) =>
        Array.from({ length: rows }).map((_, r) => (
          <g key={`${c}-${r}`}>
            {c < cols - 1 && (
              <line x1={gx(c)} y1={gy(r)} x2={gx(c + 1)} y2={gy(r)}
                stroke="rgba(245,240,234,0.07)" strokeWidth="1" />
            )}
            {r < rows - 1 && (
              <line x1={gx(c)} y1={gy(r)} x2={gx(c)} y2={gy(r + 1)}
                stroke="rgba(245,240,234,0.07)" strokeWidth="1" />
            )}
          </g>
        ))
      )}
      {Array.from({ length: cols }).map((_, c) =>
        Array.from({ length: rows }).map((_, r) => (
          <circle key={`d-${c}-${r}`} cx={gx(c)} cy={gy(r)} r="3"
            fill={`rgba(245,240,234,${0.12 + (c + r) * 0.02})`} />
        ))
      )}
      <polyline points="60,60 124,124 252,124 316,188 380,188"
        stroke="rgba(240,196,176,0.45)" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      {[[60,60],[124,124],[252,124],[316,188],[380,188]].map(([cx,cy], i) => (
        <circle key={`h-${i}`} cx={cx} cy={cy} r="5"
          fill="none" stroke="rgba(240,196,176,0.6)" strokeWidth="1.5" />
      ))}
      <rect x="100" y="240" width="72" height="44" rx="3"
        stroke="rgba(245,240,234,0.14)" strokeWidth="1" fill="none" />
      <rect x="192" y="240" width="72" height="44" rx="3"
        stroke="rgba(245,240,234,0.14)" strokeWidth="1" fill="none" />
      <rect x="284" y="240" width="72" height="44" rx="3"
        stroke="rgba(245,240,234,0.14)" strokeWidth="1" fill="none" />
      <line x1="100" y1="262" x2="172" y2="262" stroke="rgba(245,240,234,0.08)" strokeWidth="0.8" />
      <line x1="192" y1="262" x2="264" y2="262" stroke="rgba(245,240,234,0.08)" strokeWidth="0.8" />
      <line x1="284" y1="262" x2="356" y2="262" stroke="rgba(245,240,234,0.08)" strokeWidth="0.8" />
    </svg>
  )
}

function TerrainIllustration() {
  const rings = [170, 140, 112, 84, 58, 34]
  return (
    <svg viewBox="0 0 460 380" fill="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {rings.map((r, i) => (
        <ellipse key={i} cx="260" cy="210" rx={r * 1.55} ry={r}
          stroke={`rgba(30,45,58,${0.06 + i * 0.04})`}
          strokeWidth={i === 0 ? 0.8 : 1} fill="none" />
      ))}
      {rings.map((r, i) => (
        <text key={`t-${i}`} x={260 + r * 1.55 + 6} y={212}
          fontSize="8" fill={`rgba(30,45,58,${0.18 + i * 0.04})`}
          fontFamily="monospace" letterSpacing="0.05em">
          {(rings.length - i) * 100}m
        </text>
      ))}
      <path d="M60,290 Q140,220 200,180 Q260,140 320,155 Q370,165 400,145"
        stroke="rgba(30,45,58,0.2)" strokeWidth="1.2" fill="none" strokeDasharray="5 3" />
      <line x1="258" y1="202" x2="262" y2="218" stroke="rgba(30,45,58,0.45)" strokeWidth="1.5" />
      <line x1="251" y1="210" x2="269" y2="210" stroke="rgba(30,45,58,0.45)" strokeWidth="1.5" />
      <circle cx="260" cy="210" r="3" fill="rgba(30,45,58,0.5)" />
      {[60,130,200,270,340,410].map(x => (
        <line key={`gx-${x}`} x1={x} y1="40" x2={x} y2="340"
          stroke="rgba(30,45,58,0.04)" strokeWidth="1" />
      ))}
    </svg>
  )
}

function ObsidianIllustration() {
  const lines = [
    { y: 80,  w: 320, h: 2.5 },
    { y: 116, w: 260, h: 1   },
    { y: 140, w: 280, h: 1   },
    { y: 164, w: 220, h: 1   },
    { y: 200, w: 300, h: 1.5 },
    { y: 224, w: 240, h: 1   },
    { y: 248, w: 260, h: 1   },
    { y: 284, w: 180, h: 2   },
    { y: 308, w: 200, h: 1   },
    { y: 332, w: 140, h: 1   },
  ]
  return (
    <svg viewBox="0 0 460 420" fill="none" className="absolute inset-0 w-full h-full" aria-hidden="true">
      {lines.map((l, i) => (
        <rect key={i} x="70" y={l.y} width={l.w} height={l.h}
          fill={`rgba(30,45,58,${i === 0 ? 0.25 : 0.09 + (i % 3) * 0.03})`}
          rx="1" />
      ))}
      <line x1="50" y1="190" x2="50" y2="260" stroke="rgba(30,45,58,0.3)" strokeWidth="1.5" />
      <line x1="50" y1="190" x2="60" y2="190" stroke="rgba(30,45,58,0.3)" strokeWidth="1.5" />
      <line x1="50" y1="260" x2="60" y2="260" stroke="rgba(30,45,58,0.3)" strokeWidth="1.5" />
      <rect x="70" y="42" width="36" height="28" fill="rgba(30,45,58,0.14)" rx="1" />
      <line x1="380" y1="70" x2="380" y2="360" stroke="rgba(30,45,58,0.07)" strokeWidth="1" />
      <rect x="390" y="335" width="30" height="10" fill="rgba(30,45,58,0.06)" rx="1" />
    </svg>
  )
}

const illustrations = {
  '01': LuminaryIllustration,
  '02': TerrainIllustration,
  '03': ObsidianIllustration,
}

// ── Live site preview (scaled iframe) ────────────────────────────────────────
function LivePreview({ url }: { url: string }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.35)

  useEffect(() => {
    const calc = () => {
      if (!wrapRef.current) return
      const { width } = wrapRef.current.getBoundingClientRect()
      setScale(Math.max(0.22, width / 1440))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <iframe
        src={url}
        style={{
          width: '1440px',
          height: '900px',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          pointerEvents: 'none',
          border: 'none',
          display: 'block',
        }}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  )
}

// ── Desktop full-bleed card ───────────────────────────────────────────────────
function DesktopCard({ project }: { project: (typeof projects)[number] }) {
  const isRight = project.align === 'right'
  const Illustration = illustrations[project.id as keyof typeof illustrations]
  const isLight = project.id === '03' // Obsidian has light bg

  const textColor      = isLight ? 'rgba(30,45,58,0.92)'  : 'rgba(245,240,234,0.92)'
  const textMuted      = isLight ? 'rgba(30,45,58,0.52)'  : 'rgba(245,240,234,0.52)'
  const textDim        = isLight ? 'rgba(30,45,58,0.28)'  : 'rgba(245,240,234,0.28)'
  const dividerColor   = isLight ? 'rgba(30,45,58,0.12)'  : 'rgba(245,240,234,0.12)'
  const bracketColor   = isLight ? 'rgba(30,45,58,0.22)'  : 'rgba(245,240,234,0.22)'
  const ctaColor       = isLight ? 'rgba(30,45,58,0.75)'  : 'rgba(245,240,234,0.8)'
  const ghostId        = isLight ? 'rgba(30,45,58,0.05)'  : 'rgba(245,240,234,0.038)'

  // Gradient scrim direction
  const scrimGradient = isRight
    ? `linear-gradient(to left, transparent 0%, ${project.scrimColor}dd 52%, ${project.scrimColor} 100%)`
    : `linear-gradient(to right, transparent 0%, ${project.scrimColor}dd 52%, ${project.scrimColor} 100%)`

  return (
    <div
      className="work-item reveal relative overflow-hidden group"
      style={{ minHeight: '640px', cursor: project.url ? 'pointer' : 'default' }}
      onClick={() => project.url && window.open(project.url, '_blank', 'noopener,noreferrer')}
    >
      {/* ── Base gradient (always present as fallback) ── */}
      <div className="absolute inset-0" style={{ background: project.visualBg }} />

      {/* ── Live site preview ── */}
      {project.url ? (
        <LivePreview url={project.url} />
      ) : (
        <>
          {/* ── SVG illustration — only for cards without a live URL ── */}
          <div
            className="absolute inset-y-0 pointer-events-none"
            style={{ [isRight ? 'left' : 'right']: 0, width: '55%', opacity: 0.9 }}
          >
            <Illustration />
          </div>
        </>
      )}

      {/* ── Colour tint so iframe blends with brand palette ── */}
      {project.url && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `${project.scrimColor}55`, mixBlendMode: 'multiply' }}
        />
      )}

      {/* ── Scanlines ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 5px)' }} />

      {/* ── Fine grid ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '52px 52px' }} />

      {/* ── Gradient scrim — text side ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: scrimGradient }} />

      {/* ── Giant ghost project number — bleeds across centre ── */}
      <div
        className="absolute pointer-events-none select-none flex items-center"
        style={{
          [isRight ? 'right' : 'left']: '34%',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <span
          className="font-epilogue font-black leading-none"
          style={{
            fontSize: 'clamp(280px, 28vw, 520px)',
            color: ghostId,
            letterSpacing: '-0.1em',
            lineHeight: 0.8,
          }}
        >
          {project.id}
        </span>
      </div>

      {/* ── Top accent stripe ── */}
      <div className="absolute top-0 left-0 right-0" style={{ height: '2px', background: 'rgba(212,144,122,0.65)' }} />

      {/* ── Card corner brackets (all four corners) ── */}
      <div className="absolute top-6 left-6 visual-bracket" style={{ width: '16px', height: '16px', borderTop: `1.5px solid ${bracketColor}`, borderLeft: `1.5px solid ${bracketColor}` }} />
      <div className="absolute top-6 right-6 visual-bracket" style={{ width: '16px', height: '16px', borderTop: `1.5px solid ${bracketColor}`, borderRight: `1.5px solid ${bracketColor}` }} />
      <div className="absolute bottom-6 left-6 visual-bracket" style={{ width: '16px', height: '16px', borderBottom: `1.5px solid ${bracketColor}`, borderLeft: `1.5px solid ${bracketColor}` }} />
      <div className="absolute bottom-6 right-6 visual-bracket" style={{ width: '16px', height: '16px', borderBottom: `1.5px solid ${bracketColor}`, borderRight: `1.5px solid ${bracketColor}` }} />

      {/* ── Inset frame ── */}
      <div className="absolute pointer-events-none" style={{ inset: '18px', border: `1px solid ${isLight ? 'rgba(30,45,58,0.07)' : 'rgba(245,240,234,0.05)'}` }} />

      {/* ── Text content ── */}
      <div
        className={`relative z-10 h-full flex flex-col justify-between ${isRight ? 'items-end' : 'items-start'}`}
        style={{ padding: '56px 64px', minHeight: '640px' }}
      >
        {/* Top row */}
        <div className={`flex items-center gap-6 ${isRight ? 'flex-row-reverse' : ''}`}>
          <span
            className="font-epilogue text-xs uppercase"
            style={{ letterSpacing: '0.22em', color: textDim }}
          >
            {project.year}
          </span>
          <div style={{ width: '32px', height: '1px', background: dividerColor }} />
          <span
            className="font-epilogue font-semibold"
            style={{ fontSize: '10px', letterSpacing: '0.18em', color: textDim }}
          >
            {project.id} / 03
          </span>
        </div>

        {/* Main text block */}
        <div style={{ maxWidth: '520px', ...(isRight ? { textAlign: 'right' } : {}) }}>
          <p
            className="font-epilogue font-semibold uppercase mb-5"
            style={{ fontSize: '9px', letterSpacing: '0.3em', color: textDim }}
          >
            Selected Work
          </p>

          <h3
            className="font-epilogue font-black leading-[0.88] mb-4"
            style={{
              fontSize: 'clamp(58px, 6.5vw, 104px)',
              letterSpacing: '-0.055em',
              color: textColor,
            }}
          >
            {project.title}
          </h3>

          <p
            className="playfair-italic mb-7"
            style={{
              fontSize: 'clamp(22px, 2.6vw, 38px)',
              color: textMuted,
              letterSpacing: '-0.01em',
            }}
          >
            {project.titleItalic}
          </p>

          <p
            className="font-epilogue leading-relaxed mb-8"
            style={{
              fontSize: 'clamp(13px, 1.1vw, 16px)',
              color: textMuted,
              lineHeight: 1.75,
            }}
          >
            {project.description}
          </p>

          <div className={`flex flex-wrap gap-2 mb-7 ${isRight ? 'justify-end' : ''}`}>
            {project.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 font-epilogue font-semibold uppercase rounded-sm"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.12em',
                  background: project.tagColor,
                  color: project.tagTextColor,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className={`flex items-center gap-8 ${isRight ? 'flex-row-reverse' : ''}`}>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link inline-flex items-center gap-2 font-epilogue font-bold uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.2em', color: ctaColor }}
              onClick={(e) => e.stopPropagation()}
            >
              {project.ctaLabel} <span className="arrow">→</span>
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-2 font-epilogue font-bold uppercase"
              style={{ fontSize: '11px', letterSpacing: '0.2em', color: textDim, opacity: 0.5 }}
            >
              {project.ctaLabel}
            </span>
          )}
          <div style={{ width: '40px', height: '1px', background: dividerColor }} />
          <span
            className="font-epilogue"
            style={{ fontSize: '9px', letterSpacing: '0.2em', color: textDim, textTransform: 'uppercase' }}
          >
            {project.tags[0]}
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Mobile / tablet card ──────────────────────────────────────────────────────
function MobileCard({ project }: { project: (typeof projects)[number] }) {
  const isRight = project.align === 'right'

  return (
    <div
      className={`work-item reveal relative flex flex-col sm:flex-row sm:items-stretch ${
        isRight ? 'sm:flex-row-reverse' : ''
      } gap-0`}
      style={{ cursor: project.url ? 'pointer' : 'default' }}
      onClick={() => project.url && window.open(project.url, '_blank', 'noopener,noreferrer')}
    >
      {/* Visual panel */}
      <div className="work-visual relative w-full sm:flex-1 min-h-[200px] sm:min-h-[380px] md:min-h-[460px]">
        <div className="work-visual-inner absolute inset-0" style={{ background: project.visualBg }}>
          {project.url ? (
            <>
              <LivePreview url={project.url} />
              {/* Colour tint */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `${project.scrimColor}55`, mixBlendMode: 'multiply' }}
              />
            </>
          ) : (
            <>
              <div className="absolute inset-0 opacity-[0.07]"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              <span className="absolute bottom-4 right-5 sm:bottom-6 sm:right-8 font-epilogue font-black leading-none select-none"
                style={{ fontSize: 'clamp(60px, 10vw, 120px)', color: '#F5F0EA', opacity: 0.1, letterSpacing: '-0.06em' }}>
                {project.id}
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2" style={{ opacity: 0.14 }}>
                  <div style={{ width: 'clamp(80px, 12vw, 140px)', height: '2px', background: 'rgba(245,240,234,0.9)', borderRadius: '1px' }} />
                  <div style={{ width: 'clamp(60px, 9vw, 100px)', height: '1px', background: 'rgba(245,240,234,0.7)', borderRadius: '1px' }} />
                  <div style={{ width: 'clamp(40px, 6vw, 70px)',  height: '1px', background: 'rgba(245,240,234,0.5)', borderRadius: '1px' }} />
                  <div className="mt-1" style={{ width: 'clamp(44px, 7vw, 80px)', height: 'clamp(28px, 4vw, 48px)', border: '1.5px solid rgba(245,240,234,0.55)', borderRadius: '3px' }} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Backplate card */}
      <div
        className={`backplate-card relative z-10 flex flex-col justify-between p-6 sm:p-10 w-full sm:backplate-sm-width ${
          isRight ? 'sm:mr-[-60px]' : 'sm:ml-[-60px]'
        }`}
        style={{ background: project.backplateColor, minHeight: '280px' }}
      >
        <div className="flex justify-between items-start mb-auto">
          <span className="font-epilogue text-xs uppercase tracking-widest" style={{ color: 'rgba(245,240,234,0.4)' }}>{project.year}</span>
          <span className="font-epilogue font-black text-sm" style={{ color: 'rgba(245,240,234,0.15)', letterSpacing: '-0.04em' }}>{project.id}</span>
        </div>
        <div className="my-5 sm:my-8">
          <h3 className="font-epilogue font-black leading-tight text-parchment" style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.04em' }}>{project.title}</h3>
          <p className="playfair-italic" style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', color: 'rgba(245,240,234,0.7)' }}>{project.titleItalic}</p>
        </div>
        <p className="font-epilogue leading-relaxed mb-5 sm:mb-8" style={{ fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'rgba(245,240,234,0.65)' }}>{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-xs font-epilogue font-semibold uppercase tracking-wider rounded-sm"
              style={{ background: project.tagColor, color: project.tagTextColor }}>{tag}</span>
          ))}
        </div>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link inline-flex items-center gap-2 font-epilogue font-bold uppercase tracking-widest text-xs"
            style={{ color: 'rgba(245,240,234,0.8)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {project.ctaLabel} <span className="arrow text-base">→</span>
          </a>
        ) : (
          <span
            className="inline-flex items-center gap-2 font-epilogue font-bold uppercase tracking-widest text-xs"
            style={{ color: 'rgba(245,240,234,0.35)' }}
          >
            {project.ctaLabel}
          </span>
        )}
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.06,
            scrollTrigger: { trigger: el, start: 'top 82%', once: true } }
        )
      })
    }
    initGSAP()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="py-14 sm:py-24 lg:py-32 overflow-hidden"
      style={{ background: '#F5F0EA' }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16">
        <div className="reveal flex items-end justify-between mb-10 sm:mb-14 lg:mb-16 flex-wrap gap-4 sm:gap-8">
          <div>
            <span className="block font-epilogue text-xs uppercase tracking-widest mb-3 sm:mb-4"
              style={{ color: 'rgba(30,45,58,0.4)' }}>Work</span>
            <h2 className="font-epilogue font-black leading-tight text-slate-navy"
              style={{ fontSize: 'clamp(31px, 5vw, 72px)', letterSpacing: '-0.04em' }}>
              Projects that{' '}
              <span className="playfair-italic">have inspired me</span>
            </h2>
          </div>
          <a href="#" className="arrow-link font-epilogue font-bold uppercase tracking-widest text-xs text-slate-navy/50 hover:text-slate-navy transition-colors flex items-center gap-2">
            All Work <span className="arrow">→</span>
          </a>
        </div>
      </div>

      {/* ── Mobile / tablet cards (< lg) — inside container ── */}
      <div className="lg:hidden max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col gap-10 sm:gap-16">
          {projects.map((project) => (
            <MobileCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* ── Desktop cards (lg+) — full-bleed cinematic, stacked ── */}
      <div className="hidden lg:block">
        {projects.map((project, i) => (
          <div key={project.id}>
            <DesktopCard project={project} />
            {i < projects.length - 1 && (
              <div style={{ height: '3px', background: '#F5F0EA' }} />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import TargetCursor from './TargetCursor'

// ── Email obfuscation ──────────────────────────────────────────────────────
const EP = ['chirinos', 'outlook', 'com']
function getEmail() { return `${EP[0]}@${EP[1]}.${EP[2]}` }
function openMailto() {
  const a = document.createElement('a')
  a.href = `mailto:${getEmail()}`
  a.click()
}
// ──────────────────────────────────────────────────────────────────────────

function wordCount(str: string) {
  return str.trim().split(/\s+/).filter(Boolean).length
}

// ── Paper plane (form success) ─────────────────────────────────────────────
function PaperPlane({ color = '#F0C4B0' }: { color?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <path d="M4 32 L60 6 L44 58 L30 38 Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" fill="none" />
      <path d="M30 38 L60 6" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
      <path d="M4 32 L30 38" stroke={color} strokeWidth="1" strokeLinejoin="round" />
      <path d="M44 58 L30 38 L36 48" stroke={color} strokeWidth="1" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

// ── Fishing hook (email button) ────────────────────────────────────────────
function FishingHook({ color = '#F0C4B0' }: { color?: string }) {
  return (
    <svg viewBox="0 0 80 180" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {/* Fishing line — dashed, drops from top */}
      <line id="hook-line" x1="40" y1="0" x2="40" y2="108" stroke={color} strokeWidth="1" strokeDasharray="5 3" />
      {/* Small hook eye at top */}
      <circle cx="40" cy="4" r="4" stroke={color} strokeWidth="1" fill="none" />
      {/* Hook shaft */}
      <line x1="40" y1="108" x2="40" y2="138" stroke={color} strokeWidth="2" strokeLinecap="round" />
      {/* Hook curve (J bend) */}
      <path d="M40 138 C40 162 68 162 68 144" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Barb point */}
      <path d="M68 144 L60 152" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      {/* Glint on hook */}
      <circle cx="54" cy="154" r="1.5" fill={color} opacity="0.5" />
      {/* Lure body */}
      <ellipse cx="40" cy="122" rx="6" ry="10" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      {/* Lure stripe */}
      <line x1="34" y1="122" x2="46" y2="122" stroke={color} strokeWidth="0.8" opacity="0.4" />
    </svg>
  )
}
// ──────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef    = useRef<HTMLElement>(null)
  const planeRef      = useRef<HTMLDivElement>(null)
  const successRef    = useRef<HTMLDivElement>(null)
  const hookRef       = useRef<HTMLDivElement>(null)

  const [phase,       setPhase]       = useState<'form' | 'done'>('form')
  const [planeActive, setPlaneActive] = useState(false)
  const [hookActive,  setHookActive]  = useState(false)
  const [error,       setError]       = useState('')
  const [form,        setForm]        = useState({ name: '', email: '', message: '' })

  // ── Scroll reveals ──────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      sectionRef.current?.querySelectorAll('.reveal').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.1,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }
    init()
  }, [])

  // ── Paper plane animation (form submit) ─────────────────────────────────
  useEffect(() => {
    if (!planeActive) return
    const run = async () => {
      const { gsap } = await import('gsap')
      const plane   = planeRef.current
      const success = successRef.current
      if (!plane || !success) return

      gsap.set(plane,   { opacity: 1, scale: 0, rotation: 0, x: 0, y: 0 })
      gsap.set(success, { opacity: 0, y: 24 })

      const tl = gsap.timeline()
      tl.to(plane, { scale: 1, duration: 0.45, ease: 'back.out(1.7)' })
      tl.to(plane, { rotation: -20, duration: 0.22, ease: 'power1.inOut' })
      tl.to(plane, { rotation:  16, duration: 0.22, ease: 'power1.inOut' })
      tl.to(plane, { rotation:  -8, duration: 0.18, ease: 'power1.inOut' })
      tl.to(plane, { rotation:   0, duration: 0.18, ease: 'power1.inOut' })
      tl.to(plane, {
        rotation: 720, x: 200, y: -240, scale: 0.1, opacity: 0,
        duration: 1.05, ease: 'power2.in',
      })
      tl.call(() => {
        setPlaneActive(false)
        if (success) {
          success.style.display = 'block'
          success.style.opacity = '0'
        }
      })
      tl.to(success, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
      tl.call(() => { setPhase('done') })
    }
    run()
  }, [planeActive])

  // ── Fishing hook animation (Drop me a line button) ──────────────────────
  useEffect(() => {
    if (!hookActive) return
    const run = async () => {
      const { gsap } = await import('gsap')
      const hook = hookRef.current
      if (!hook) return

      // Reset: start above viewport, invisible
      gsap.set(hook, { opacity: 0, y: -120, x: 0, rotation: 0, scaleY: 0.3 })

      const tl = gsap.timeline()

      // 1. Drop in from top
      tl.to(hook, { opacity: 1, y: 0, scaleY: 1, duration: 0.6, ease: 'power2.out' })

      // 2. Gentle sway — like the hook is dangling on a line
      tl.to(hook, { rotation:  12, x:  14, duration: 0.4, ease: 'sine.inOut' })
      tl.to(hook, { rotation: -10, x: -12, duration: 0.4, ease: 'sine.inOut' })
      tl.to(hook, { rotation:   6, x:   8, duration: 0.3, ease: 'sine.inOut' })
      tl.to(hook, { rotation:  -4, x:  -5, duration: 0.3, ease: 'sine.inOut' })
      tl.to(hook, { rotation:   0, x:   0, duration: 0.2, ease: 'sine.out'   })

      // 3. Nibble — quick jerk down, like a bite
      tl.to(hook, { y: 18,  duration: 0.08, ease: 'power4.out' })
      tl.to(hook, { y:  0,  duration: 0.12, ease: 'power2.inOut' })
      tl.to(hook, { y: 12,  duration: 0.08, ease: 'power4.out' })
      tl.to(hook, { y:  0,  duration: 0.1,  ease: 'power2.inOut' })

      // 4. Got one! Reel up fast
      tl.to(hook, {
        y: -280, opacity: 0, scaleY: 0.4, rotation: -20,
        duration: 0.55, ease: 'power3.in',
      })

      // 5. Open email and reset
      tl.call(() => { openMailto(); setHookActive(false) })
    }
    run()
  }, [hookActive])

  // ── Form submit ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (wordCount(form.message) < 10) {
      setError('Please share a little more — at least 10 words so I understand your project.')
      return
    }
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '9b203a29-e412-41ae-ab87-202703f0d7df',
          subject: `New message from ${form.name} — Gabriela Chirinos Portfolio`,
          name: form.name, email: form.email, message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPlaneActive(true)
      } else {
        setError(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error — please check your connection and try again.')
    }
  }

  const words    = wordCount(form.message)
  const needMore = form.message.length > 0 && words < 10

  const inputBase: React.CSSProperties = {
    background: 'transparent',
    borderBottom: '1px solid rgba(74,123,157,0.35)',
    color: '#F5F0EA', outline: 'none', width: '100%',
    padding: '10px 0', fontFamily: 'var(--font-epilogue)',
    fontSize: '16px', transition: 'border-color 0.25s ease',
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden contact-grid flex flex-col justify-between"
      style={{ background: '#17242F', minHeight: '100vh' }}
    >

      {/* ── Paper plane — section-level, form trigger only ── */}
      {planeActive && (
        <div ref={planeRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '88px', height: '88px', zIndex: 50,
          opacity: 0, pointerEvents: 'none',
        }}>
          <PaperPlane color="#F0C4B0" />
        </div>
      )}

      {/* ── Fishing hook — section-level, email button trigger only ── */}
      {hookActive && (
        <div ref={hookRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: '140px', height: '300px', zIndex: 50,
          opacity: 0, pointerEvents: 'none',
          transformOrigin: 'top center',
        }}>
          <FishingHook color="#F0C4B0" />
        </div>
      )}

      {/* ── Target cursor — activates only on .cursor-target elements ── */}
      <TargetCursor targetSelector=".cursor-target" spinDuration={2.5} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 w-full pt-14 sm:pt-20 lg:pt-24 pb-12 lg:pb-16 flex flex-col flex-1">

        {/* Eyebrow */}
        <div className="reveal mb-6 sm:mb-10">
          <p className="playfair-italic" style={{ fontSize: 'clamp(17px, 1.8vw, 24px)', color: '#F0C4B0' }}>
            Got an idea? Need some spark?
          </p>
        </div>

        {/* Two-column */}
        <div className="flex flex-col md:flex-row gap-10 sm:gap-14 md:gap-16 lg:gap-24 flex-1">

          {/* ── Left ── */}
          <div className="md:w-5/12 lg:w-5/12 flex flex-col justify-between gap-6 sm:gap-0">
            <h2 className="reveal reach-out font-epilogue font-black leading-none text-dusty-blush"
              style={{ fontSize: 'clamp(48px, 9vw, 140px)', letterSpacing: '-0.05em' }}>
              Let's<br />Chat.
            </h2>

            <div className="reveal mt-6 sm:mt-12 space-y-4 sm:space-y-6">
              {/* Looping availability ticker */}
              <div className="overflow-hidden py-1 w-full" aria-label="Availability status">
                <div
                  style={{
                    display: 'flex',
                    width: 'max-content',
                    animation: 'marquee 16s linear infinite',
                  }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center flex-shrink-0"
                      style={{
                        paddingRight: '28px',
                        fontSize: '9px',
                        letterSpacing: '0.22em',
                        color: '#F0C4B0',
                        fontFamily: 'var(--font-epilogue)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        gap: '8px',
                      }}
                    >
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#D4907A', display: 'inline-block', flexShrink: 0 }} />
                      Available · Open to New Work
                    </span>
                  ))}
                </div>
              </div>

              {/* Drop me a line — hidden on mobile */}
              <div className="hidden sm:block">
                <button
                  onClick={() => setHookActive(true)}
                  disabled={hookActive || planeActive}
                  className="cursor-target btn-sweep inline-flex items-center gap-3 px-8 py-4 border font-epilogue font-bold uppercase tracking-widest text-sm text-parchment transition-colors duration-300"
                  style={{ borderColor: 'rgba(74,123,157,0.4)', opacity: hookActive ? 0.5 : 1 }}
                  aria-label="Open email client"
                >
                  <span className="relative z-10">Drop me a line →</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right: form / success ── */}
          <div className="md:w-7/12 lg:w-7/12 reveal relative flex items-center">

            <div ref={successRef} style={{
              textAlign: 'center', width: '100%',
              display: 'none',
            }}>
              <div className="mx-auto mb-8 rounded-full flex items-center justify-center"
                style={{ width: '72px', height: '72px', border: '1px solid rgba(240,196,176,0.3)' }}>
                <div style={{ width: '36px', height: '36px' }}>
                  <PaperPlane color="#F0C4B0" />
                </div>
              </div>
              <p className="playfair-italic mb-3" style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: '#F0C4B0' }}>
                Message sent.
              </p>
              <p className="font-epilogue" style={{ color: 'rgba(245,240,234,0.5)', fontSize: '15px' }}>
                I'll reach out shortly.
              </p>
            </div>

            {phase === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-10 w-full">

                <div>
                  <label className="block font-epilogue font-black uppercase tracking-widest mb-3"
                    style={{ fontSize: '11px', color: 'rgba(245,240,234,0.4)', letterSpacing: '0.18em' }}>
                    Your Name
                  </label>
                  <input type="text" required placeholder="Jane Smith"
                    value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={inputBase}
                    onFocus={e => (e.target.style.borderBottomColor = '#F0C4B0')}
                    onBlur={e  => (e.target.style.borderBottomColor = 'rgba(74,123,157,0.35)')} />
                </div>

                <div>
                  <label className="block font-epilogue font-black uppercase tracking-widest mb-3"
                    style={{ fontSize: '11px', color: 'rgba(245,240,234,0.4)', letterSpacing: '0.18em' }}>
                    Your Email
                  </label>
                  <input type="email" required placeholder="jane@company.com"
                    value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputBase}
                    onFocus={e => (e.target.style.borderBottomColor = '#F0C4B0')}
                    onBlur={e  => (e.target.style.borderBottomColor = 'rgba(74,123,157,0.35)')} />
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-3">
                    <label className="block font-epilogue font-black uppercase tracking-widest"
                      style={{ fontSize: '11px', color: 'rgba(245,240,234,0.4)', letterSpacing: '0.18em' }}>
                      What are you building?
                    </label>
                    <span className="font-epilogue text-xs tabular-nums"
                      style={{ color: needMore ? '#D4907A' : 'rgba(245,240,234,0.25)' }}>
                      {words}/10 words
                    </span>
                  </div>
                  <textarea required rows={4}
                    placeholder="Tell me about your project — what it is, who it's for, and what you're hoping to achieve..."
                    value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ ...inputBase, resize: 'none', borderBottom: 'none', border: '1px solid rgba(74,123,157,0.35)', padding: '14px' }}
                    onFocus={e => (e.target.style.borderColor = '#F0C4B0')}
                    onBlur={e  => (e.target.style.borderColor = 'rgba(74,123,157,0.35)')} />
                  {needMore && (
                    <p className="font-epilogue text-xs mt-2" style={{ color: '#D4907A' }}>
                      {10 - words} more word{10 - words !== 1 ? 's' : ''} needed
                    </p>
                  )}
                </div>

                {error && (
                  <p className="font-epilogue text-sm" style={{ color: '#D4907A' }}>{error}</p>
                )}

                <button type="submit" disabled={planeActive || hookActive}
                  className="btn-sweep w-full py-4 font-epilogue font-bold uppercase tracking-widest text-sm text-parchment"
                  style={{ background: 'rgba(74,123,157,0.25)', border: '1px solid rgba(74,123,157,0.4)' }}>
                  <span className="relative z-10">Send Message</span>
                </button>

              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t" style={{ borderColor: 'rgba(74,123,157,0.15)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 py-6 sm:py-8 flex items-center justify-center sm:justify-between">
          <span className="font-epilogue text-xs uppercase tracking-widest"
            style={{ color: 'rgba(245,240,234,0.3)' }}>
            © {new Date().getFullYear()} Gabriela Chirinos. All rights reserved.
          </span>
        </div>
      </footer>
    </section>
  )
}

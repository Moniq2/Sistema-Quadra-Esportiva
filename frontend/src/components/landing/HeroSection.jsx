import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import LandingIcon from './LandingIcon'

const COURT_COUNT = 4
const TRANSITION_TIME = 1344
const AUTO_PLAY_TIME = 7000
const nextTimes = ['18:00', '16:30', '19:00', '20:30']

function CourtPerson({ className, team = 'primary' }) {
  return <span className={`court-person team-${team} ${className}`}><span className="person-icon-head" /><span className="person-icon-body" /></span>
}

function CourtMessages({ courtIndex }) {
  return (
    <div className={`court-messages messages-court-${courtIndex + 1}`}>
      <div className="float-card scene-card scene-card-available"><span className="status-dot bg-secondary" /><div><strong>Quadra disponível</strong><small>Pronta para o seu time</small></div></div>
      <div className="float-card scene-card scene-card-time"><LandingIcon name="calendar" className="h-5 w-5 text-accent" /><div><small>Próximo horário</small><strong>{nextTimes[courtIndex]}</strong></div></div>
      <div className="float-card scene-card scene-card-confirmed"><span className="grid h-8 w-8 place-items-center rounded-full bg-secondary/15 text-secondary"><LandingIcon name="check" className="h-4 w-4" /></span><div><strong>Reserva confirmada</strong><small>Agora é só jogar</small></div></div>
    </div>
  )
}

export default function HeroSection() {
  const [currentCourt, setCurrentCourt] = useState(0)
  const [previousCourt, setPreviousCourt] = useState(null)
  const [direction, setDirection] = useState('next')
  const touchStart = useRef(null)
  const transitionTimer = useRef(null)

  const navigateCourt = useCallback((step) => {
    if (previousCourt !== null) return
    setDirection(step > 0 ? 'next' : 'previous')
    setPreviousCourt(currentCourt)
    setCurrentCourt((currentCourt + step + COURT_COUNT) % COURT_COUNT)
    clearTimeout(transitionTimer.current)
    transitionTimer.current = setTimeout(() => setPreviousCourt(null), TRANSITION_TIME)
  }, [currentCourt, previousCourt])

  useEffect(() => {
    if (previousCourt !== null) return undefined

    const autoPlayTimer = setTimeout(() => navigateCourt(1), AUTO_PLAY_TIME)

    return () => clearTimeout(autoPlayTimer)
  }, [navigateCourt, previousCourt])

  useEffect(() => () => clearTimeout(transitionTimer.current), [])

  const sceneClass = (index) => {
    const classes = [`court-scene court-scene-${index + 1}`]
    if (index === currentCourt) classes.push(previousCourt === null ? 'scene-active' : `scene-enter-${direction}`)
    if (index === previousCourt) classes.push(`scene-exit-${direction}`)
    return classes.join(' ')
  }

  const movimentarQuadra = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const area = event.currentTarget
    const limites = area.getBoundingClientRect()
    const posicaoX = (event.clientX - limites.left) / limites.width - 0.5
    const posicaoY = (event.clientY - limites.top) / limites.height - 0.5
    area.style.setProperty('--mouse-x', `${posicaoX * 12}px`)
    area.style.setProperty('--mouse-y', `${posicaoY * 10}px`)
    area.style.setProperty('--mouse-rotate-x', `${posicaoY * -5}deg`)
    area.style.setProperty('--mouse-rotate-y', `${posicaoX * 7}deg`)
  }

  const centralizarQuadra = (event) => {
    const area = event.currentTarget
    area.style.setProperty('--mouse-x', '0px'); area.style.setProperty('--mouse-y', '0px')
    area.style.setProperty('--mouse-rotate-x', '0deg'); area.style.setProperty('--mouse-rotate-y', '0deg')
  }

  const finalizarToque = (event) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(distance) > 45) navigateCourt(distance < 0 ? 1 : -1)
    touchStart.current = null
  }

  return (
    <section className="landing-hero overflow-hidden" aria-labelledby="hero-title">
      <div className="landing-shell relative grid min-h-[720px] items-center gap-14 py-10 lg:grid-cols-[1.02fr_.98fr] lg:py-16">
        <div className="hero-copy relative z-10">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-white/70 px-4 py-2 text-xs font-extrabold tracking-[.18em] text-primary shadow-sm"><span className="h-2 w-2 animate-pulse rounded-full bg-accent" aria-hidden="true" />ESPORTE QUE APROXIMA</p>
          <h1 id="hero-title" className="max-w-3xl text-5xl font-black leading-[.98] tracking-[-.055em] text-primary sm:text-6xl lg:text-7xl">Todo mundo <span className="hero-color-cycle whitespace-nowrap">entra em quadra.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">Encontre quadras, consulte horários e organize sua próxima partida de forma simples, rápida e sem conflitos.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link to="/quadras" className="btn h-14 rounded-full border-0 bg-accent px-8 text-base font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600">Ver quadras <LandingIcon name="arrow" className="h-5 w-5" /></Link><a href="#como-funciona" className="btn h-14 rounded-full border-primary/20 bg-white/80 px-8 text-base font-bold text-primary hover:border-primary hover:bg-white">Como funciona</a></div>
          <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary/70"><LandingIcon name="check" className="h-4 w-4 text-secondary" /> Menos mensagens. Mais jogo.</p>
        </div>

        <div className="hero-visual relative mx-auto w-full max-w-[580px]" aria-label={`Quadra ${currentCourt + 1} de ${COURT_COUNT}`} onPointerMove={movimentarQuadra} onPointerLeave={centralizarQuadra} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={finalizarToque}>
          <div className="court-glow" aria-hidden="true" />
          <div className={`court-stage direction-${direction}`}>
            <div className={sceneClass(0)} aria-hidden={currentCourt !== 0}><div className="court-frame court-poliesportiva"><span className="court-center-line" /><span className="court-center-circle" /><span className="court-area court-area-left" /><span className="court-area court-area-right" />{Array.from({ length: 8 }, (_, index) => <CourtPerson key={index} className={`court-player court-player-${index + 1}`} team={index % 2 ? 'secondary' : 'accent'} />)}<span className="moving-ball" /></div><CourtMessages courtIndex={0} /></div>
            <div className={sceneClass(1)} aria-hidden={currentCourt !== 1}><div className="court-frame beach-court"><span className="sand-texture" /><span className="beach-boundary" /><span className="volley-net"><i /><i /><i /><i /><i /></span>{Array.from({ length: 4 }, (_, index) => <CourtPerson key={index} className={`beach-player beach-player-${index + 1}`} team={index < 2 ? 'secondary' : 'accent'} />)}<span className="volley-ball" /></div><CourtMessages courtIndex={1} /></div>
            <div className={sceneClass(2)} aria-hidden={currentCourt !== 2}><div className="court-frame football-field"><span className="football-midline" /><span className="football-circle" /><span className="football-box football-box-left" /><span className="football-box football-box-right" /><span className="football-goal football-goal-left" /><span className="football-goal football-goal-right" />{Array.from({ length: 10 }, (_, index) => <CourtPerson key={index} className={`football-player football-player-${index + 1}`} team={index < 5 ? 'primary' : 'accent'} />)}<span className="football-ball" /></div><CourtMessages courtIndex={2} /></div>
            <div className={sceneClass(3)} aria-hidden={currentCourt !== 3}><div className="court-frame basketball-court"><span className="basketball-midline" /><span className="basketball-circle" /><span className="basketball-paint basketball-paint-left" /><span className="basketball-paint basketball-paint-right" /><span className="basketball-arc basketball-arc-left" /><span className="basketball-arc basketball-arc-right" /><span className="basket basketball-hoop-left" /><span className="basket basketball-hoop-right" />{Array.from({ length: 6 }, (_, index) => <CourtPerson key={index} className={`basket-player basket-player-${index + 1}`} team={index < 3 ? 'primary' : 'secondary'} />)}<span className="basketball-ball" /></div><CourtMessages courtIndex={3} /></div>
          </div>
          <button type="button" className="court-arrow court-arrow-left" onClick={() => navigateCourt(-1)} aria-label="Ver quadra anterior"><LandingIcon name="arrow" /></button>
          <button type="button" className="court-arrow court-arrow-right" onClick={() => navigateCourt(1)} aria-label="Ver próxima quadra"><LandingIcon name="arrow" /></button>
          <div className="court-dots" aria-label="Posição no carrossel">{Array.from({ length: COURT_COUNT }, (_, index) => <span key={index} className={index === currentCourt ? 'active' : ''} />)}</div>
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import LandingIcon from './LandingIcon'

const steps = [
  { number: '01', icon: 'search', title: 'Encontre sua quadra', text: 'Consulte os espaços disponíveis e escolha a modalidade que combina com o seu jogo.' },
  { number: '02', icon: 'calendar', title: 'Escolha o horário', text: 'Visualize a agenda e encontre rapidamente os períodos livres.' },
  { number: '03', icon: 'users', title: 'Reúna a galera', text: 'Confirme a reserva, compartilhe com o time e prepare-se para jogar.' },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const [trailVisible, setTrailVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTrailVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.18 })

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="como-funciona" className="how-section landing-section bg-[#f5fefe]" aria-labelledby="how-title">
      <div className={`transition-trail ${trailVisible ? 'trail-visible' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 320 90" preserveAspectRatio="none">
          <path d="M8 16 C72 82 206 2 312 64" />
        </svg>
        <span className="transition-ball" />
      </div>
      <div className="landing-shell">
        <div className="section-heading">
          <p className="eyebrow">COMO FUNCIONA</p>
          <h2 id="how-title">Da vontade de jogar à quadra reservada.</h2>
          <p>Em poucos passos, você encontra o espaço ideal e organiza sua partida.</p>
        </div>
        <ol className="steps-grid">
          {steps.map((step, index) => (
            <li key={step.number} className="step-card">
              <span className="step-number">{step.number}</span>
              <span className="step-icon"><LandingIcon name={step.icon} /></span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              {index < steps.length - 1 && <LandingIcon name="arrow" className="step-arrow" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

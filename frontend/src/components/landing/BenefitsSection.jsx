import LandingIcon from './LandingIcon'

const benefits = [
  { icon: 'calendar', title: 'Agenda em tempo real', text: 'Veja horários livres e ocupados de maneira clara.' },
  { icon: 'shield', title: 'Reservas sem conflito', text: 'O sistema impede dois agendamentos no mesmo período e na mesma quadra.', featured: true },
  { icon: 'grid', title: 'Tudo em um só lugar', text: 'Quadras, jogadores e reservas organizados em uma única experiência.' },
  { icon: 'heart', title: 'Feito para a comunidade', text: 'Uma solução simples para bairros, escolas e condomínios.' },
]

export default function BenefitsSection() {
  return (
    <section className="landing-section bg-white" aria-labelledby="benefits-title">
      <div className="landing-shell">
        <div className="section-heading section-heading-left">
          <p className="eyebrow">POR QUE USAR O TMJ?</p>
          <h2 id="benefits-title">Organização fora da quadra.<br />Energia dentro dela.</h2>
          <p>O TMJ simplifica a agenda para que jogadores e comunidades possam dedicar mais tempo ao que realmente importa: jogar.</p>
        </div>
        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article key={benefit.title} className={`benefit-card ${benefit.featured ? 'benefit-card-featured' : ''}`}>
              <span className="benefit-icon"><LandingIcon name={benefit.icon} /></span>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import LandingIcon from './LandingIcon'

const sports = ['Futebol', 'Futebol de areia', 'Futsal', 'Vôlei', 'Vôlei de praia', 'Basquete', 'Tênis', 'Beach tennis']

export default function SportsSection() {
  return (
    <section className="landing-section overflow-hidden bg-white" aria-labelledby="sports-title">
      <div className="landing-shell">
        <div className="section-heading">
          <p className="eyebrow">ENCONTRE SEU JOGO</p>
          <h2 id="sports-title">Uma quadra para cada paixão.</h2>
          <p>Do primeiro passe ao ponto decisivo, encontre o espaço certo para reunir seu time.</p>
        </div>
        <div className="sports-track">
          {sports.map((sport, index) => (
            <article key={sport} className="sport-card">
              <span className="sport-index">{String(index + 1).padStart(2, '0')}</span>
              <LandingIcon name="ball" className="h-9 w-9" />
              <h3>{sport}</h3>
              <span>Consulte horários</span>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/quadras" className="btn h-14 rounded-full border-primary bg-transparent px-7 text-primary hover:border-primary hover:bg-primary hover:text-white">
            Explorar quadras <LandingIcon name="arrow" className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

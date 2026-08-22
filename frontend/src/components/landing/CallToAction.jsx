import { Link } from 'react-router-dom'
import LandingIcon from './LandingIcon'

export default function CallToAction() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6" aria-labelledby="cta-title">
      <div className="cta-panel mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-primary px-6 py-16 text-center text-white sm:px-12 lg:py-20">
        <span className="cta-ring cta-ring-one" aria-hidden="true" />
        <span className="cta-ring cta-ring-two" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="eyebrow eyebrow-light">BORA JOGAR?</p>
          <h2 id="cta-title" className="text-4xl font-black tracking-tight text-white sm:text-6xl">Seu próximo jogo começa aqui.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">Escolha a quadra, encontre o melhor horário e chame a galera.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/quadras" className="btn h-14 rounded-full border-0 bg-accent px-8 text-base text-white hover:bg-orange-600">Ver quadras disponíveis <LandingIcon name="arrow" className="h-5 w-5" /></Link>
            <Link to="/cadastro" className="btn h-14 rounded-full border-white/40 bg-transparent px-8 text-base text-white hover:border-white hover:bg-white hover:text-primary">Cadastre-se</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

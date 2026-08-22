const highlights = ['Mais encontros.', 'Mais movimento.', 'Mais comunidade.', 'Mais gente jogando.']

export default function CommunitySection() {
  return (
    <section className="landing-section overflow-hidden bg-white" aria-labelledby="community-title">
      <div className="landing-shell grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
        <div className="community-visual" aria-hidden="true">
          <span className="community-orbit community-orbit-one" />
          <span className="community-orbit community-orbit-two" />
          <span className="community-person person-one" />
          <span className="community-person person-two" />
          <span className="community-person person-three" />
          <span className="community-ball" />
          <strong>TMJ</strong>
        </div>
        <div>
          <p className="eyebrow">NOSSA COMUNIDADE</p>
          <h2 id="community-title" className="text-4xl font-black leading-tight tracking-tight text-primary sm:text-5xl">Mais que uma reserva.<br />Um ponto de encontro.</h2>
          <p className="mt-6 max-w-2xl text-lg text-slate-600">O esporte movimenta pessoas, fortalece vínculos e transforma espaços da comunidade. O TMJ ajuda cada partida a começar de forma mais simples.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {highlights.map((text, index) => <li key={text} className="community-highlight"><span>{index + 1}</span>{text}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

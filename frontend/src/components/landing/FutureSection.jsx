import LandingIcon from './LandingIcon'

const futures = [
  {
    icon: 'compass',
    tag: 'PARA QUEM JOGA',
    title: 'Encontre sua próxima turma',
    description: 'Uma comunidade para descobrir jogos e atividades abertas perto de você, entrar em partidas com vagas e conhecer pessoas por meio do esporte.',
    points: ['Reservas públicas ou por convite', 'Vagas e limite de participantes', 'Filtros por esporte, bairro e data'],
    accent: 'secondary',
  },
  {
    icon: 'camera',
    tag: 'PARA QUEM GESTIONA',
    title: 'Da quadra para as redes',
    description: 'Câmeras parceiras poderão transformar grandes lances em replays prontos para compartilhar, criando uma nova experiência para atletas e uma nova oportunidade para arenas.',
    points: ['Clipes de lances e jogadas', 'Compartilhamento nas redes sociais', 'Privacidade e gravação autorizada'],
    accent: 'accent',
  },
]

export default function FutureSection() {
  return (
    <section id="futuro" className="landing-section overflow-hidden bg-primary px-4 text-white sm:px-6" aria-labelledby="future-title">
      <div className="landing-shell">
        <div className="section-heading">
          <p className="eyebrow eyebrow-light">PRÓXIMOS LANCES</p>
          <h2 id="future-title" className="!text-white">Muito além do agendamento.</h2>
          <p className="text-white/70">O TMJ começa organizando quadras e evolui para conectar pessoas, experiências e novas oportunidades para arenas.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {futures.map((item) => (
            <article key={item.title} className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/15 sm:p-8">
              <span className={`grid h-14 w-14 place-items-center rounded-2xl ${item.accent === 'accent' ? 'bg-accent' : 'bg-secondary'} text-white shadow-lg`}><LandingIcon name={item.icon} className="h-7 w-7" /></span>
              <p className="mt-7 text-xs font-extrabold tracking-[.18em] text-white/55">{item.tag} · EM BREVE</p>
              <h3 className="mt-3 text-2xl font-black text-white sm:text-3xl">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-white/70">{item.description}</p>
              <ul className="mt-6 space-y-3">{item.points.map((point) => <li key={point} className="flex items-center gap-3 text-sm font-semibold text-white/85"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/10 text-secondary"><LandingIcon name="check" className="h-3.5 w-3.5" /></span>{point}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

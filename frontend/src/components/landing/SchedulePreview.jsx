import LandingIcon from './LandingIcon'

const slots = [
  { time: '08:00', status: 'Disponível', available: true },
  { time: '10:00', status: 'Ocupado', available: false },
  { time: '14:00', status: 'Disponível', available: true },
  { time: '18:00', status: 'Ocupado', available: false },
  { time: '20:00', status: 'Disponível', available: true },
]

export default function SchedulePreview() {
  return (
    <section className="landing-section bg-primary text-white" aria-labelledby="schedule-title">
      <div className="landing-shell grid items-center gap-14 lg:grid-cols-2">
        <div className="max-w-xl">
          <p className="eyebrow eyebrow-light">AGENDA INTELIGENTE</p>
          <h2 id="schedule-title" className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">Bateu a vontade de jogar? Veja quando a quadra está livre.</h2>
          <p className="mt-6 text-lg text-white/75">Consulte a agenda por quadra e data. Os horários ocupados e disponíveis aparecem de forma simples e objetiva.</p>
          <a href="#agenda-preview" className="btn mt-8 h-14 rounded-full border-0 bg-accent px-7 text-white hover:bg-orange-600">Consultar prévia <LandingIcon name="arrow" className="h-5 w-5" /></a>
        </div>
        <div id="agenda-preview" className="schedule-card">
          <div className="flex items-center justify-between border-b border-slate-200 pb-5">
            <div><p className="text-xs font-extrabold uppercase tracking-widest text-secondary">Hoje</p><h3 className="mt-1 text-xl font-extrabold text-primary">Quadra Comunitária</h3></div>
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-base-200 text-primary"><LandingIcon name="calendar" /></span>
          </div>
          <ul className="mt-3" aria-label="Exemplo de horários da quadra">
            {slots.map((slot) => (
              <li key={slot.time} className="schedule-slot">
                <time className="font-extrabold text-primary">{slot.time}</time>
                <span className={slot.available ? 'slot-available' : 'slot-busy'}><span aria-hidden="true" />{slot.status}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-5 border-t border-slate-200 pt-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-secondary" /> Disponível</span>
            <span className="flex items-center gap-2"><i className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Ocupado</span>
          </div>
        </div>
      </div>
    </section>
  )
}

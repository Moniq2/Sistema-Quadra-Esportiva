import { useState } from 'react'
import { Link } from 'react-router-dom'
import LandingIcon from './LandingIcon'

const plans = [
  {
    name: 'Jogador', audience: 'Para quem quer entrar em quadra', price: 'Grátis', suffix: 'para sempre', icon: 'users',
    features: ['Encontre quadras e modalidades', 'Consulte horários disponíveis', 'Faça e acompanhe suas reservas', 'No futuro, encontre partidas abertas'],
    action: 'Criar conta grátis', to: '/cadastro',
  },
  {
    name: 'Gestor de Quadras', audience: 'Para organizar sua operação', annualPrice: 'R$ 79,90', monthlyPrice: 'R$ 99,90', savings: 'Economize R$ 240 por ano', icon: 'building', featured: true,
    features: ['Dashboard e agenda de reservas', 'Gestão de jogadores e horários', 'Divulgação de localização e modalidades', 'R$ 20,00 por quadra cadastrada'],
    action: 'Testar 14 dias grátis', to: '/cadastro',
  },
  {
    name: 'TMJ Replay', audience: 'A experiência completa da arena', annualPrice: 'R$ 129,90', monthlyPrice: 'R$ 149,90', savings: 'Economize R$ 240 por ano', icon: 'camera', comingSoon: true,
    features: ['Todos os recursos de gestão', 'Integração com câmeras da arena', 'Replays de lances e jogadas', 'Clipes prontos para redes sociais'],
    action: 'Em breve',
  },
]

export default function PricingSection() {
  const [billing, setBilling] = useState('annual')
  const annual = billing === 'annual'

  return (
    <section id="planos" className="landing-section bg-[#eaf9fa] px-4 sm:px-6" aria-labelledby="pricing-title">
      <div className="landing-shell">
        <div className="section-heading">
          <p className="eyebrow">PLANOS TMJ</p>
          <h2 id="pricing-title">Um plano para cada lado do jogo.</h2>
          <p>Jogadores entram de graça. Gestores organizam a operação hoje e acompanham a evolução do esporte conectado.</p>
        </div>
        <div className="mx-auto mb-6 flex w-fit rounded-full border border-primary/10 bg-white p-1.5 shadow-sm" role="group" aria-label="Período de contratação">
          <button type="button" aria-pressed={!annual} onClick={() => setBilling('monthly')} className={`min-w-28 rounded-full px-5 py-2.5 text-sm font-extrabold transition ${!annual ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}>Mensal</button>
          <button type="button" aria-pressed={annual} onClick={() => setBilling('annual')} className={`min-w-28 rounded-full px-5 py-2.5 text-sm font-extrabold transition ${annual ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-primary'}`}>Anual <span className={`ml-1 text-[10px] ${annual ? 'text-secondary' : 'text-accent'}`}>-20%</span></button>
        </div>
        {annual && <div className="mx-auto mb-8 flex max-w-3xl items-center justify-center gap-3 rounded-2xl border border-accent/20 bg-accent/10 px-5 py-4 text-center text-sm font-bold text-primary"><span className="rounded-full bg-accent px-3 py-1 text-xs text-white">PLANO ANUAL</span>Garanta 12 meses e economize R$ 240,00 em relação à contratação mensal.</div>}
        <div className="grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan) => {
            const paidPlan = Boolean(plan.annualPrice)
            const displayedPrice = paidPlan ? (annual ? plan.annualPrice : plan.monthlyPrice) : plan.price
            const displayedSuffix = paidPlan ? (annual ? '/mês no plano anual' : '/mês') : plan.suffix
            return (
            <article key={plan.name} className={`relative flex flex-col rounded-[2rem] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-8 ${plan.featured ? 'border-primary bg-primary text-white lg:-translate-y-3' : 'border-primary/10 bg-white'}`}>
              {plan.featured && <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-accent px-4 py-1.5 text-xs font-extrabold text-white shadow-lg">MAIS ESCOLHIDO</span>}
              {plan.comingSoon && <span className="absolute right-6 top-0 -translate-y-1/2 rounded-full bg-secondary px-4 py-1.5 text-xs font-extrabold text-white shadow-lg">PLANO FUTURO</span>}
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${plan.featured ? 'bg-white/10 text-secondary' : 'bg-secondary/10 text-secondary'}`}><LandingIcon name={plan.icon} /></span>
              <p className={`mt-6 text-xs font-bold uppercase tracking-wider ${plan.featured ? 'text-white/55' : 'text-slate-400'}`}>{plan.audience}</p>
              <h3 className={`mt-2 text-2xl font-black ${plan.featured ? 'text-white' : 'text-primary'}`}>{plan.name}</h3>
              {annual && paidPlan && <p className={`mt-5 text-sm line-through ${plan.featured ? 'text-white/45' : 'text-slate-400'}`}>{plan.monthlyPrice}/mês no plano mensal</p>}
              <div className={`${annual && paidPlan ? 'mt-1' : 'mt-5'} flex flex-wrap items-end gap-x-2`}><strong className={`text-4xl font-black tracking-tight ${plan.featured ? 'text-white' : 'text-primary'}`}>{displayedPrice}</strong><span className={`max-w-28 pb-1 text-xs leading-tight ${plan.featured ? 'text-white/60' : 'text-slate-400'}`}>{displayedSuffix}</span></div>
              {annual && plan.savings && <p className={`mt-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-extrabold ${plan.featured ? 'bg-white/10 text-secondary' : 'bg-secondary/10 text-secondary'}`}>{plan.savings}</p>}
              <ul className="my-7 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className={`flex gap-3 text-sm ${plan.featured ? 'text-white/80' : 'text-slate-600'}`}><LandingIcon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? 'text-secondary' : 'text-secondary'}`} />{feature}</li>)}</ul>
              {plan.comingSoon ? <button type="button" className="btn h-12 cursor-not-allowed rounded-full border border-primary/10 bg-slate-100 text-slate-400" disabled>{plan.action}</button> : <Link to={plan.to} className={`btn h-12 rounded-full border-0 ${plan.featured ? 'bg-accent text-white hover:bg-orange-600' : 'bg-primary text-white hover:bg-secondary'}`}>{plan.action}</Link>}
            </article>
          )})}
        </div>
        <p className="mt-7 text-center text-sm text-slate-500">{annual ? 'Os valores exibidos são equivalentes mensais na contratação anual.' : 'Os valores exibidos correspondem à contratação mês a mês.'} No plano Gestor de Quadras, acrescentam-se R$ 20,00 por quadra cadastrada.</p>
      </div>
    </section>
  )
}

import { BadgeCheck, RotateCcw, ShieldCheck, Truck } from 'lucide-react'

const benefits = [
  { icon: Truck, title: 'Entrega rápida', description: 'Para todo o Brasil' },
  { icon: BadgeCheck, title: 'Retire na loja', description: 'Sem custo adicional' },
  { icon: ShieldCheck, title: 'Compra segura', description: 'Seus dados protegidos' },
  { icon: RotateCcw, title: 'Troca facilitada', description: 'Até 7 dias após a compra' },
]

export function BenefitsBar() {
  return (
    <section className="border-y border-gray-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
              <b.icon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-900">{b.title}</p>
              <p className="text-xs text-gray-500">{b.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

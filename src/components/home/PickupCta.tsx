import { Clock, MapPin, Store } from 'lucide-react'
import { useStoreConfig } from '@/context/StoreConfigContext'

export function PickupCta() {
  const { settings } = useStoreConfig()
  const mainUnit = settings.units.find((u) => u.isMain) ?? settings.units[0]

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-brand-50 p-6 sm:flex-row sm:p-10">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
          <Store className="h-8 w-8" />
        </span>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-brand-900 sm:text-2xl">Prefere retirar na loja?</h2>
          <p className="mt-1 text-sm text-brand-800">
            Compre online e retire grátis em nossa loja física, sem taxa de entrega e sem espera.
          </p>
          <div className="mt-3 flex flex-col items-center gap-2 text-sm text-brand-700 sm:flex-row sm:gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {mainUnit?.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> Seg. a Sáb., 9h às 19h
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

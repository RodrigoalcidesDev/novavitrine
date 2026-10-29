import { MapPin, Phone, Truck } from 'lucide-react'
import { useStoreConfig } from '@/context/StoreConfigContext'

export function TopBar() {
  const { settings } = useStoreConfig()
  const mainUnit = settings.units.find((u) => u.isMain) ?? settings.units[0]

  return (
    <div className="hidden bg-brand-900 text-white sm:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5" /> Frete grátis em compras acima de R$ 199
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> Retire grátis em {mainUnit?.name ?? settings.storeName}
          </span>
        </div>
        <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 hover:text-brand-200">
          <Phone className="h-3.5 w-3.5" /> {settings.phone}
        </a>
      </div>
    </div>
  )
}

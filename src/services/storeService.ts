// Camada de serviço com assinatura preparada para troca futura por chamadas HTTP a uma API real.
import { defaultStoreSettings } from '@/data/store'
import { readStorage, writeStorage } from '@/services/storage'
import type { StoreSettings } from '@/types'

const KEY = 'store-settings'

export function getStoreSettings(): StoreSettings {
  return readStorage<StoreSettings>(KEY, defaultStoreSettings)
}

export function updateStoreSettings(patch: Partial<StoreSettings>): StoreSettings {
  const next = { ...getStoreSettings(), ...patch }
  writeStorage(KEY, next)
  return next
}

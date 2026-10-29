import { createContext, useContext, useState, type ReactNode } from 'react'
import * as storeService from '@/services/storeService'
import type { StoreSettings } from '@/types'

interface StoreConfigContextValue {
  settings: StoreSettings
  updateSettings: (patch: Partial<StoreSettings>) => void
}

const StoreConfigContext = createContext<StoreConfigContextValue | null>(null)

export function StoreConfigProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(() => storeService.getStoreSettings())

  function updateSettings(patch: Partial<StoreSettings>) {
    setSettings(storeService.updateStoreSettings(patch))
  }

  return <StoreConfigContext.Provider value={{ settings, updateSettings }}>{children}</StoreConfigContext.Provider>
}

export function useStoreConfig() {
  const ctx = useContext(StoreConfigContext)
  if (!ctx) throw new Error('useStoreConfig deve ser usado dentro de StoreConfigProvider')
  return ctx
}

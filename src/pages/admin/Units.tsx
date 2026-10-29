import { Plus, Star, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { useStoreConfig } from '@/context/StoreConfigContext'
import { useToast } from '@/context/ToastContext'
import { makeId } from '@/services/storage'

export function Units() {
  const { settings, updateSettings } = useStoreConfig()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  function handleAdd(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !address.trim()) {
      showToast('Informe nome e endereço da unidade.', 'error')
      return
    }
    updateSettings({
      units: [
        ...settings.units,
        { id: makeId('unidade'), name: name.trim(), address: address.trim(), phone: phone.trim(), isMain: false, stockNote: 'Unidade demonstrativa recém-cadastrada' },
      ],
    })
    setName('')
    setAddress('')
    setPhone('')
    showToast('Unidade adicionada à demonstração.', 'success')
  }

  function handleRemove(id: string) {
    updateSettings({ units: settings.units.filter((u) => u.id !== id) })
    showToast('Unidade removida.', 'info')
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-900">Unidades</h1>
      <p className="mb-6 text-sm text-gray-500">
        Prepare a expansão da marca para múltiplas lojas. Área demonstrativa para gestão de filiais.
      </p>

      <div className="flex flex-col gap-3">
        {settings.units.map((unit) => (
          <div key={unit.id} className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                {unit.name}
                {unit.isMain && (
                  <span className="flex items-center gap-1 rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold text-accent-700">
                    <Star className="h-3 w-3 fill-accent-700" /> Matriz
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500">{unit.address}</p>
              <p className="text-xs text-gray-400">{unit.stockNote}</p>
            </div>
            {!unit.isMain && (
              <button
                onClick={() => handleRemove(unit.id)}
                aria-label="Remover unidade"
                className="focus-ring rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleAdd} className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 font-semibold text-gray-900">Adicionar nova unidade (demonstrativo)</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            placeholder="Nome da unidade"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
          <input
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2 text-sm sm:col-span-2"
          />
          <input
            placeholder="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="focus-ring rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <Button type="submit" className="mt-3">
          <Plus className="h-4 w-4" /> Adicionar unidade
        </Button>
      </form>
    </div>
  )
}

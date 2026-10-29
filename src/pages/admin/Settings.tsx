import { Save } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { useStoreConfig } from '@/context/StoreConfigContext'
import { useToast } from '@/context/ToastContext'

export function Settings() {
  const { settings, updateSettings } = useStoreConfig()
  const { showToast } = useToast()

  const [form, setForm] = useState({
    storeName: settings.storeName,
    tagline: settings.tagline,
    email: settings.email,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    address: settings.address,
    cnpj: settings.cnpj,
    instagram: settings.instagram,
  })

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    updateSettings(form)
    showToast('Configurações da loja atualizadas.', 'success')
  }

  function field(key: keyof typeof form, label: string, fullWidth = false) {
    return (
      <div className={fullWidth ? 'sm:col-span-2' : ''}>
        <label className="mb-1 block text-xs font-medium text-gray-600">{label}</label>
        <input
          value={form[key]}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
          className="focus-ring w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-bold text-gray-900">Configurações da loja</h1>
      <p className="mb-6 text-sm text-gray-500">Informações demonstrativas exibidas na vitrine e no rodapé.</p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:grid-cols-2">
        {field('storeName', 'Nome da loja')}
        {field('tagline', 'Slogan')}
        {field('email', 'E-mail de contato')}
        {field('phone', 'Telefone')}
        {field('whatsapp', 'WhatsApp')}
        {field('cnpj', 'CNPJ (demonstrativo)')}
        {field('address', 'Endereço comercial', true)}
        {field('instagram', 'Instagram', true)}

        <div className="sm:col-span-2">
          <Button type="submit">
            <Save className="h-4 w-4" /> Salvar configurações
          </Button>
        </div>
      </form>
    </div>
  )
}

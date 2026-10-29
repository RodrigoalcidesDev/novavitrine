import { Banknote, CreditCard, QrCode, ShieldCheck, Store, Truck } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useStoreConfig } from '@/context/StoreConfigContext'
import { useToast } from '@/context/ToastContext'
import { createOrder } from '@/services/orderService'
import type { Address, DeliveryMethod, PaymentMethod } from '@/types'
import { formatBRL } from '@/utils/format'

const FREE_SHIPPING_THRESHOLD = 199
const SHIPPING_COST = 19.9

export function Checkout() {
  const { lines, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const { settings } = useStoreConfig()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [delivery, setDelivery] = useState<DeliveryMethod>('entrega')
  const [unitId, setUnitId] = useState(settings.units.find((u) => u.isMain)?.id ?? settings.units[0]?.id ?? '')
  const [payment, setPayment] = useState<PaymentMethod>('pix')
  const [address, setAddress] = useState<Address>({ street: '', number: '', complement: '', neighborhood: '', city: '', state: '', zip: '' })
  const [submitting, setSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  useEffect(() => {
    if (user) {
      setName((v) => v || user.name)
      setEmail((v) => v || user.email)
      setPhone((v) => v || user.phone || '')
    }
  }, [user])

  if (lines.length === 0 && !orderPlaced) {
    return <Navigate to="/carrinho" replace />
  }

  const shippingCost = delivery === 'retirada' ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shippingCost

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !phone.trim()) {
      showToast('Preencha seus dados de identificação.', 'error')
      return
    }

    if (delivery === 'entrega') {
      const requiredFields: (keyof Address)[] = ['street', 'number', 'neighborhood', 'city', 'state', 'zip']
      if (requiredFields.some((field) => !address[field]?.trim())) {
        showToast('Preencha o endereço completo para entrega.', 'error')
        return
      }
    } else if (!unitId) {
      showToast('Selecione uma unidade para retirada.', 'error')
      return
    }

    setSubmitting(true)
    const order = createOrder({
      customerId: user?.id,
      customerName: name.trim(),
      customerEmail: email.trim(),
      items: lines.map((l) => ({ productId: l.product.id, name: l.product.name, image: l.product.images[0], price: l.product.promoPrice ?? l.product.price, quantity: l.quantity })),
      subtotal,
      shippingCost,
      total,
      deliveryMethod: delivery,
      address: delivery === 'entrega' ? address : undefined,
      paymentMethod: payment,
      unitId: delivery === 'retirada' ? unitId : settings.units[0]?.id ?? '',
    })

    setOrderPlaced(true)
    clearCart()
    navigate(`/checkout/sucesso/${order.id}`, { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Finalizar compra</h1>
      <p className="mb-6 flex items-center gap-2 text-sm text-amber-700">
        <ShieldCheck className="h-4 w-4" /> Este é um checkout demonstrativo. Nenhuma cobrança real será realizada.
      </p>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 font-semibold text-gray-900">1. Identificação</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                required
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus-ring rounded-lg border border-gray-300 px-3 py-2 text-sm sm:col-span-2"
              />
              <input
                required
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <input
                required
                placeholder="Telefone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="focus-ring rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 font-semibold text-gray-900">2. Entrega</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDelivery('entrega')}
                className={`focus-ring flex items-center gap-3 rounded-lg border p-3 text-left ${delivery === 'entrega' ? 'border-brand-600 bg-brand-50' : 'border-gray-300'}`}
              >
                <Truck className="h-5 w-5 text-brand-700" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Receber em casa</p>
                  <p className="text-xs text-gray-500">{subtotal >= FREE_SHIPPING_THRESHOLD ? 'Frete grátis' : formatBRL(SHIPPING_COST)}</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setDelivery('retirada')}
                className={`focus-ring flex items-center gap-3 rounded-lg border p-3 text-left ${delivery === 'retirada' ? 'border-brand-600 bg-brand-50' : 'border-gray-300'}`}
              >
                <Store className="h-5 w-5 text-brand-700" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Retirar na loja</p>
                  <p className="text-xs text-gray-500">Grátis</p>
                </div>
              </button>
            </div>

            {delivery === 'entrega' ? (
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-6">
                <input
                  required
                  placeholder="CEP"
                  value={address.zip}
                  onChange={(e) => setAddress((a) => ({ ...a, zip: e.target.value }))}
                  className="focus-ring col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  required
                  placeholder="Rua"
                  value={address.street}
                  onChange={(e) => setAddress((a) => ({ ...a, street: e.target.value }))}
                  className="focus-ring col-span-4 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  required
                  placeholder="Número"
                  value={address.number}
                  onChange={(e) => setAddress((a) => ({ ...a, number: e.target.value }))}
                  className="focus-ring col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  placeholder="Complemento"
                  value={address.complement}
                  onChange={(e) => setAddress((a) => ({ ...a, complement: e.target.value }))}
                  className="focus-ring col-span-4 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  required
                  placeholder="Bairro"
                  value={address.neighborhood}
                  onChange={(e) => setAddress((a) => ({ ...a, neighborhood: e.target.value }))}
                  className="focus-ring col-span-3 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  required
                  placeholder="Cidade"
                  value={address.city}
                  onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))}
                  className="focus-ring col-span-2 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <input
                  required
                  placeholder="UF"
                  maxLength={2}
                  value={address.state}
                  onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value.toUpperCase() }))}
                  className="focus-ring col-span-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            ) : (
              <div className="mt-4 flex flex-col gap-2">
                {settings.units.map((unit) => (
                  <label
                    key={unit.id}
                    className={`focus-ring flex cursor-pointer items-start gap-3 rounded-lg border p-3 ${unitId === unit.id ? 'border-brand-600 bg-brand-50' : 'border-gray-300'}`}
                  >
                    <input type="radio" name="unit" checked={unitId === unit.id} onChange={() => setUnitId(unit.id)} className="mt-1" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{unit.name}</p>
                      <p className="text-xs text-gray-500">{unit.address}</p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-4 font-semibold text-gray-900">3. Pagamento</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPayment('pix')}
                className={`focus-ring flex items-center gap-3 rounded-lg border p-3 text-left ${payment === 'pix' ? 'border-brand-600 bg-brand-50' : 'border-gray-300'}`}
              >
                <QrCode className="h-5 w-5 text-brand-700" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Pix</p>
                  <p className="text-xs text-gray-500">Aprovação demonstrativa imediata</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPayment('cartao')}
                className={`focus-ring flex items-center gap-3 rounded-lg border p-3 text-left ${payment === 'cartao' ? 'border-brand-600 bg-brand-50' : 'border-gray-300'}`}
              >
                <CreditCard className="h-5 w-5 text-brand-700" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Cartão de crédito</p>
                  <p className="text-xs text-gray-500">Simulação — nenhum dado real é solicitado</p>
                </div>
              </button>
            </div>
            <p className="mt-3 flex items-center gap-2 text-xs text-gray-400">
              <Banknote className="h-3.5 w-3.5" /> Protótipo comercial — nenhum gateway de pagamento real está conectado.
            </p>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 font-semibold text-gray-900">Resumo do pedido</h2>
          <div className="flex max-h-56 flex-col gap-3 overflow-y-auto pr-1">
            {lines.map(({ product, quantity, lineTotal }) => (
              <div key={product.id} className="flex items-center gap-3">
                <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="line-clamp-1 text-xs font-medium text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-500">Qtd: {quantity}</p>
                </div>
                <span className="text-xs font-semibold text-gray-900">{formatBRL(lineTotal)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-1.5 border-t border-gray-100 pt-4 text-sm text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatBRL(subtotal)}</span></div>
            <div className="flex justify-between"><span>Frete</span><span>{shippingCost === 0 ? 'Grátis' : formatBRL(shippingCost)}</span></div>
          </div>
          <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </div>
          <Button type="submit" fullWidth size="lg" className="mt-5" disabled={submitting}>
            Confirmar pedido (demonstrativo)
          </Button>
        </aside>
      </form>
    </div>
  )
}

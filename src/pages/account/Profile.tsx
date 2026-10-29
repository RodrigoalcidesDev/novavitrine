import { useAuth } from '@/context/AuthContext'
import { formatDate } from '@/utils/format'

export function Profile() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-4 font-semibold text-gray-900">Dados do perfil</h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-gray-500">Nome</dt>
          <dd className="text-sm font-medium text-gray-900">{user.name}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500">E-mail</dt>
          <dd className="text-sm font-medium text-gray-900">{user.email}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500">Telefone</dt>
          <dd className="text-sm font-medium text-gray-900">{user.phone || 'Não informado'}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-gray-500">Cliente desde</dt>
          <dd className="text-sm font-medium text-gray-900">{formatDate(user.createdAt)}</dd>
        </div>
      </dl>
      <p className="mt-5 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
        Dados demonstrativos. A edição de perfil deverá ser conectada a um backend na versão de produção.
      </p>
    </div>
  )
}

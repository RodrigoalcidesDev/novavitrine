import { CompassIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'

export function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <EmptyState
        icon={CompassIcon}
        title="Página não encontrada"
        description="O endereço acessado não existe ou foi movido."
        action={
          <Link to="/">
            <Button>Voltar à página inicial</Button>
          </Link>
        }
      />
    </div>
  )
}

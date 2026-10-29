import { Outlet } from 'react-router-dom'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { TopBar } from '@/components/layout/TopBar'

export function StorefrontLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f5]">
      <TopBar />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

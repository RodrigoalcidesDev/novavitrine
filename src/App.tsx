import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AccountLayout } from '@/components/account/AccountLayout'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { StorefrontLayout } from '@/components/layout/StorefrontLayout'
import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ProductsProvider } from '@/context/ProductsContext'
import { StoreConfigProvider } from '@/context/StoreConfigContext'
import { ToastProvider } from '@/context/ToastContext'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { Cart } from '@/pages/Cart'
import { Catalog } from '@/pages/Catalog'
import { Checkout } from '@/pages/Checkout'
import { Favorites } from '@/pages/Favorites'
import { ForgotPassword } from '@/pages/ForgotPassword'
import { Home } from '@/pages/Home'
import { Login } from '@/pages/Login'
import { NotFound } from '@/pages/NotFound'
import { OrderSuccess } from '@/pages/OrderSuccess'
import { ProductDetail } from '@/pages/ProductDetail'
import { Register } from '@/pages/Register'
import { Profile } from '@/pages/account/Profile'
import { OrderHistory } from '@/pages/account/OrderHistory'
import { CustomersList } from '@/pages/admin/CustomersList'
import { Dashboard } from '@/pages/admin/Dashboard'
import { OrderDetail } from '@/pages/admin/OrderDetail'
import { OrdersList } from '@/pages/admin/OrdersList'
import { ProductForm } from '@/pages/admin/ProductForm'
import { ProductsList } from '@/pages/admin/ProductsList'
import { Settings } from '@/pages/admin/Settings'
import { Units } from '@/pages/admin/Units'

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ToastProvider>
        <StoreConfigProvider>
          <ProductsProvider>
            <AuthProvider>
              <CartProvider>
                <FavoritesProvider>
                  <Routes>
                    <Route element={<StorefrontLayout />}>
                      <Route index element={<Home />} />
                      <Route path="produtos" element={<Catalog />} />
                      <Route path="produto/:slug" element={<ProductDetail />} />
                      <Route path="favoritos" element={<Favorites />} />
                      <Route path="carrinho" element={<Cart />} />
                      <Route path="checkout" element={<Checkout />} />
                      <Route path="checkout/sucesso/:orderId" element={<OrderSuccess />} />
                      <Route path="login" element={<Login />} />
                      <Route path="cadastro" element={<Register />} />
                      <Route path="recuperar-senha" element={<ForgotPassword />} />
                      <Route element={<RequireAuth />}>
                        <Route path="conta" element={<AccountLayout />}>
                          <Route index element={<Profile />} />
                          <Route path="pedidos" element={<OrderHistory />} />
                        </Route>
                      </Route>
                    </Route>

                    <Route path="admin" element={<AdminLayout />}>
                      <Route index element={<Dashboard />} />
                      <Route path="produtos" element={<ProductsList />} />
                      <Route path="produtos/novo" element={<ProductForm />} />
                      <Route path="produtos/:id/editar" element={<ProductForm />} />
                      <Route path="pedidos" element={<OrdersList />} />
                      <Route path="pedidos/:id" element={<OrderDetail />} />
                      <Route path="clientes" element={<CustomersList />} />
                      <Route path="unidades" element={<Units />} />
                      <Route path="configuracoes" element={<Settings />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <ToastContainer />
                </FavoritesProvider>
              </CartProvider>
            </AuthProvider>
          </ProductsProvider>
        </StoreConfigProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

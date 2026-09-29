import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from "./AppRouter"
import AuthProvider from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
      <RouterProvider router={router} />

    </AuthProvider>
)

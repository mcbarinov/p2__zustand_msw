import type { ReactNode } from "react"
import { Navigate } from "react-router"
import { useAuth } from "@/stores/useAuth"

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuth((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

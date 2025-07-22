import { createBrowserRouter } from "react-router"
import { LoginPage } from "@/pages/LoginPage"
import { TodoPage } from "@/pages/TodoPage"
import { ProtectedRoute } from "./ProtectedRoute"

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <TodoPage />
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <LoginPage /> },
])

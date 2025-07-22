import { useState } from "react"
import { useNavigate } from "react-router"
import { loginRequest } from "@/api/auth"
import { useAuth } from "@/stores/useAuth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function LoginPage() {
  const navigate = useNavigate()
  const login = useAuth((s) => s.login)

  const [username, setUsername] = useState("admin")
  const [password, setPassword] = useState("admin")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    try {
      const user = await loginRequest(username, password)
      login(user) // save to zustand
      localStorage.setItem("token", user.token) // for ky
      navigate("/")
    } catch {
      setError("Invalid credentials")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoFocus />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  )
}

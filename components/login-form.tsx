"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, AlertCircle } from "lucide-react"

const users = [
  {
    username: "admin",
    password: "admin123",
    company: "moto-express",
    companyName: "Moto Express",
    theme: {
      primary: "red",
      secondary: "black",
      accent: "white",
    },
  },
  {
    username: "manager",
    password: "manager123",
    company: "speed-motors",
    companyName: "Speed Motors",
    theme: {
      primary: "red",
      secondary: "black",
      accent: "white",
    },
  },
]

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña")
      return
    }

    setIsLoading(true)

    const user = users.find((u) => u.username === username && u.password === password)

    if (!user) {
      setError("Usuario o contraseña incorrectos")
      setIsLoading(false)
      return
    }

    setTimeout(() => {
      localStorage.setItem("selectedCompany", user.company)
      localStorage.setItem(
        "userSession",
        JSON.stringify({
          username: user.username,
          company: user.company,
          companyName: user.companyName,
          theme: user.theme,
          loginTime: new Date().toISOString(),
        }),
      )

      router.push(`/dashboard/${user.company}`)
    }, 1500)
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-work-sans">Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder al sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <Input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading || !username || !password}>
            {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>

        <div className="mt-6 p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Credenciales de prueba</p>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Usuario: manager | Contraseña: manager123</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

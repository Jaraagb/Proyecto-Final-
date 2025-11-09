"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  Settings,
  LogOut,
  Menu,
  Building2,
  Wrench,
  ClipboardList,
  Moon,
  Sun,
  UserCog,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  companyId?: string
}

export function DashboardLayout({ children, companyId }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userSession, setUserSession] = useState<any>(null)
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const session = localStorage.getItem("userSession")
    const selectedCompany = localStorage.getItem("selectedCompany")
    const savedDarkMode = localStorage.getItem("darkMode") === "true"

    if (!session || (companyId && selectedCompany !== companyId)) {
      router.push("/")
      return
    }

    setUserSession(JSON.parse(session))
    setDarkMode(savedDarkMode)

    if (savedDarkMode) {
      document.documentElement.classList.add("dark")
    }
  }, [companyId, router])

  const handleLogout = () => {
    localStorage.removeItem("userSession")
    localStorage.removeItem("selectedCompany")
    router.push("/")
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem("darkMode", newDarkMode.toString())

    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const navigateTo = (path: string) => {
    const currentCompanyId = companyId || userSession?.company
    router.push(`/dashboard/${currentCompanyId}${path}`)
  }

  const company = userSession
    ? {
        name: userSession.companyName,
        location: "Sistema de Gestión",
      }
    : null

  if (!userSession || !company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  const currentCompanyId = companyId || userSession.company

  return (
    <div className="min-h-screen bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/*header*/}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">MS</span>
              </div>
              <div>
                <h2 className="font-work-sans font-bold text-lg">{company.name}</h2>
                <p className="text-sm text-muted-foreground">{company.location}</p>
              </div>
            </div>
          </div>

          {/*nav */}
          <nav className="flex-1 p-4 space-y-2">
            <Button
              variant={pathname === `/dashboard/${currentCompanyId}` ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => navigateTo("")}
            >
              <ClipboardList className="h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={pathname.includes("/calendar") ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => navigateTo("/calendar")}
            >
              <Calendar className="h-4 w-4" />
              Calendario
            </Button>
            <Button
              variant={pathname.includes("/clients") ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => navigateTo("/clients")}
            >
              <Users className="h-4 w-4" />
              Clientes
            </Button>
            <Button
              variant={pathname.includes("/services") ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => navigateTo("/services")}
            >
              <Wrench className="h-4 w-4" />
              Servicios
            </Button>
            <Button
              variant={pathname.includes("/users") ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => navigateTo("/users")}
            >
              <UserCog className="h-4 w-4" />
              Usuarios
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Settings className="h-4 w-4" />
              Configuración
            </Button>
          </nav>

          {/*control uesr*/}
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Modo Oscuro</span>
              <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{userSession.username}</p>
                <p className="text-sm text-muted-foreground">Administrador</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/*main*/}
      <div className={`transition-all duration-200 ease-in-out ${sidebarOpen ? "lg:ml-64" : "lg:ml-0"} ml-0`}>
        {/*barra - no sirve */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-sm text-muted-foreground sm:hidden">{new Date().toLocaleDateString("es-ES")}</span>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Palette } from "lucide-react"

interface DashboardUser {
  id: string
  username: string
  password: string
  company: string
  companyName: string
  theme: {
    primary: string
    secondary: string
    accent: string
  }
  createdAt: string
}

const initialUsers: DashboardUser[] = [
  {
    id: "1",
    username: "admin",
    password: "admin123",
    company: "moto-express",
    companyName: "Moto Express",
    theme: { primary: "red", secondary: "black", accent: "white" },
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    username: "manager",
    password: "manager123",
    company: "speed-motors",
    companyName: "Speed Motors",
    theme: { primary: "red", secondary: "black", accent: "white" },
    createdAt: "2024-01-20",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<DashboardUser[]>(initialUsers)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<DashboardUser | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    companyName: "",
    company: "",
    primaryColor: "#ef4444",
    secondaryColor: "#000000",
    accentColor: "#ffffff",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newUser: DashboardUser = {
      id: editingUser?.id || Date.now().toString(),
      username: formData.username,
      password: formData.password,
      company: formData.company || formData.companyName.toLowerCase().replace(/\s+/g, "-"),
      companyName: formData.companyName,
      theme: {
        primary: formData.primaryColor,
        secondary: formData.secondaryColor,
        accent: formData.accentColor,
      },
      createdAt: editingUser?.createdAt || new Date().toISOString().split("T")[0],
    }

    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? newUser : u)))
    } else {
      setUsers([...users, newUser])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      companyName: "",
      company: "",
      primaryColor: "#ef4444",
      secondaryColor: "#000000",
      accentColor: "#ffffff",
    })
    setEditingUser(null)
    setIsModalOpen(false)
  }

  const handleEdit = (user: DashboardUser) => {
    setEditingUser(user)
    setFormData({
      username: user.username,
      password: user.password,
      companyName: user.companyName,
      company: user.company,
      primaryColor: user.theme.primary,
      secondaryColor: user.theme.secondary,
      accentColor: user.theme.accent,
    })
    setIsModalOpen(true)
  }

  const handleDelete = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">Administra los usuarios y sus configuraciones de dashboard</p>
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingUser(null)}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo Usuario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
                <DialogDescription>Configura las credenciales y personalización del dashboard</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Usuario</Label>
                    <Input
                      id="username"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label>Paleta de Colores del Dashboard</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary" className="text-sm">
                        Color Primario
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="primary"
                          type="color"
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          className="w-12 h-8 p-1"
                        />
                        <Input
                          value={formData.primaryColor}
                          onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                          className="flex-1 text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary" className="text-sm">
                        Color Secundario
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="secondary"
                          type="color"
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                          className="w-12 h-8 p-1"
                        />
                        <Input
                          value={formData.secondaryColor}
                          onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                          className="flex-1 text-xs"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accent" className="text-sm">
                        Color de Acento
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="accent"
                          type="color"
                          value={formData.accentColor}
                          onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                          className="w-12 h-8 p-1"
                        />
                        <Input
                          value={formData.accentColor}
                          onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                          className="flex-1 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancelar
                  </Button>
                  <Button type="submit">{editingUser ? "Actualizar" : "Crear"} Usuario</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {users.map((user) => (
            <Card key={user.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                      <Palette className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.username}</h3>
                      <p className="text-sm text-muted-foreground">{user.companyName}</p>
                      <p className="text-xs text-muted-foreground">Creado: {user.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-muted-foreground" />
                      <div className="flex gap-1">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: user.theme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: user.theme.secondary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: user.theme.accent }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

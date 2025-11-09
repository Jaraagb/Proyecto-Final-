"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ClientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client?: any
  companyId: string
}

const motorcycleBrands = ["Yamaha", "Honda", "Suzuki", "Kawasaki", "Bajaj", "TVS", "Hero", "KTM", "BMW", "Ducati", "Harley-Davidson", "AKT"]

export function ClientModal({ open, onOpenChange, client, companyId }: ClientModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    brand: "",
    model: "",
    year: "",
    plate: "",
  })

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name,
        phone: client.phone,
        email: client.email,
        brand: client.motorcycle.brand,
        model: client.motorcycle.model,
        year: client.motorcycle.year.toString(),
        plate: client.motorcycle.plate,
      })
    } else {
      setFormData({
        name: "",
        phone: "",
        email: "",
        brand: "",
        model: "",
        year: "",
        plate: "",
      })
    }
  }, [client])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log(client ? "Updating client:" : "Creating client:", formData)

    setFormData({
      name: "",
      phone: "",
      email: "",
      brand: "",
      model: "",
      year: "",
      plate: "",
    })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{client ? "Editar Cliente" : "Nuevo Cliente"}</DialogTitle>
          <DialogDescription>
            {client ? "Actualiza la información del cliente" : "Registra un nuevo cliente en el sistema"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre Completo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ej: Carlos Rodríguez"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Ej: 300-123-4567"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Ej: carlos@email.com"
              required
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Información de la Motocicleta</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona marca" />
                  </SelectTrigger>
                  <SelectContent>
                    {motorcycleBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => handleInputChange("model", e.target.value)}
                  placeholder="Ej: FZ16"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Input
                  id="year"
                  type="number"
                  min="1990"
                  max="2026"
                  value={formData.year}
                  onChange={(e) => handleInputChange("year", e.target.value)}
                  placeholder="Ej: 2020"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plate">Placa</Label>
                <Input
                  id="plate"
                  value={formData.plate}
                  onChange={(e) => handleInputChange("plate", e.target.value.toUpperCase())}
                  placeholder="Ej: ABC123"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{client ? "Actualizar Cliente" : "Crear Cliente"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface ServiceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: any
  companyId: string
}

const serviceCategories = [
  "Mantenimiento básico",
  "Mantenimiento general",
  "Reparaciones",
  "Certificaciones",
  "Diagnóstico",
  "Personalización",
]

export function ServiceModal({ open, onOpenChange, service, companyId }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    estimatedTime: "",
    category: "",
    isActive: true,
  })

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name,
        description: service.description,
        price: service.price.toString(),
        estimatedTime: service.estimatedTime.toString(),
        category: service.category,
        isActive: service.isActive,
      })
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        estimatedTime: "",
        category: "",
        isActive: true,
      })
    }
  }, [service])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const serviceData = {
      ...formData,
      price: Number.parseInt(formData.price),
      estimatedTime: Number.parseInt(formData.estimatedTime),
    }

    console.log(service ? "Updating service:" : "Creating service:", serviceData)

    setFormData({
      name: "",
      description: "",
      price: "",
      estimatedTime: "",
      category: "",
      isActive: true,
    })
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{service ? "Editar Servicio" : "Nuevo Servicio"}</DialogTitle>
          <DialogDescription>
            {service ? "Actualiza la información del servicio" : "Crea un nuevo servicio para tu taller"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Servicio</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ej: Cambio de aceite"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe qué incluye este servicio..."
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoría</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Precio (COP)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="45000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedTime">Tiempo Estimado (min)</Label>
              <Input
                id="estimatedTime"
                type="number"
                min="1"
                value={formData.estimatedTime}
                onChange={(e) => handleInputChange("estimatedTime", e.target.value)}
                placeholder="30"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked)}
            />
            <Label htmlFor="isActive">Servicio activo</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">{service ? "Actualizar Servicio" : "Crear Servicio"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

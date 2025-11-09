"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Mail, Calendar, Bike, Wrench, Clock, CheckCircle, XCircle } from "lucide-react"

interface ClientDetailModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  client: any
}

const mockServiceHistory = [
  {
    id: "1",
    date: "2024-01-10",
    service: "Cambio de aceite",
    status: "completed",
    cost: 45000,
    notes: "Cambio de aceite y filtro. Todo en orden.",
  },
  {
    id: "2",
    date: "2023-12-15",
    service: "Mantenimiento",
    status: "completed",
    cost: 120000,
    notes: "Mantenimiento general, ajuste de frenos y cadena.",
  },
  {
    id: "3",
    date: "2023-11-20",
    service: "Revisión Técnico-mecánica",
    status: "completed",
    cost: 80000,
    notes: "Revisión técnico-mecánica aprobada.",
  },
  {
    id: "4",
    date: "2024-01-20",
    service: "Cambio de aceite",
    status: "scheduled",
    cost: 45000,
    notes: "Próximo cambio de aceite programado.",
  },
]

export function ClientDetailModal({ open, onOpenChange, client }: ClientDetailModalProps) {
  if (!client) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado"
      case "scheduled":
        return "Programado"
      case "cancelled":
        return "Cancelado"
      default:
        return "Desconocido"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detalle del Cliente</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/*cleinte info*/}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-lg">{getInitials(client.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-xl">{client.name}</CardTitle>
                  <CardDescription>
                    Cliente desde {new Date(client.registrationDate).toLocaleDateString("es-ES")}
                  </CardDescription>
                  <Badge variant={client.status === "active" ? "default" : "secondary"} className="mt-2">
                    {client.status === "active" ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/*Moto informacion*/}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bike className="h-5 w-5" />
                Motocicleta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Marca y Modelo</p>
                  <p className="font-medium">
                    {client.motorcycle.brand} {client.motorcycle.model}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Año</p>
                  <p className="font-medium">{client.motorcycle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Placa</p>
                  <p className="font-medium">{client.motorcycle.plate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Servicios</p>
                  <p className="font-medium">{client.totalServices}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/*Servicio Hisotrial*/}
          <Card>
            <CardHeader> 
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Historial de Servicios
              </CardTitle>
              <CardDescription>Últimos servicios realizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockServiceHistory.map((service) => (
                  <div key={service.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(service.status)}
                        <span className="font-medium">{service.service}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{getStatusLabel(service.status)}</Badge>
                        <span className="text-sm font-medium">${service.cost.toLocaleString("es-CO")}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(service.date).toLocaleDateString("es-ES")}</span>
                    </div>
                    {service.notes && <p className="text-sm text-muted-foreground">{service.notes}</p>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}

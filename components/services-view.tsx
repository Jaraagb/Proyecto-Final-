"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Wrench, Clock, DollarSign, TrendingUp } from "lucide-react"
import { ServiceModal } from "@/components/service-modal"

interface ServicesViewProps {
  companyId: string
}

interface Service {
  id: string
  name: string
  description: string
  price: number
  estimatedTime: number 
  category: string
  isActive: boolean
  timesUsed: number
  createdDate: string
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Cambio de aceite",
    description: "Cambio de aceite del motor y filtro de aceite",
    price: 45000,
    estimatedTime: 30,
    category: "Mantenimiento básico",
    isActive: true,
    timesUsed: 156,
    createdDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Mantenimiento",
    description: "Mantenimiento general: revisión de frenos, cadena, luces y fluidos",
    price: 120000,
    estimatedTime: 90,
    category: "Mantenimiento general",
    isActive: true,
    timesUsed: 89,
    createdDate: "2023-01-15",
  },
  {
    id: "3",
    name: "Revisión Técnico-mecánica",
    description: "Revisión técnico-mecánica completa según normativas vigentes",
    price: 80000,
    estimatedTime: 60,
    category: "Certificaciones",
    isActive: true,
    timesUsed: 234,
    createdDate: "2023-01-15",
  },
  {
    id: "4",
    name: "Cambio de llantas",
    description: "Cambio e instalación de llantas nuevas",
    price: 25000,
    estimatedTime: 20,
    category: "Reparaciones",
    isActive: true,
    timesUsed: 67,
    createdDate: "2023-03-20",
  },
  {
    id: "5",
    name: "Reparación de frenos",
    description: "Reparación y ajuste del sistema de frenos",
    price: 85000,
    estimatedTime: 45,
    category: "Reparaciones",
    isActive: false,
    timesUsed: 23,
    createdDate: "2023-05-10",
  },
]

const categories = ["Todos", "Mantenimiento básico", "Mantenimiento general", "Reparaciones", "Certificaciones"]

export function ServicesView({ companyId }: ServicesViewProps) {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("Todos")
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = categoryFilter === "Todos" || service.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setShowServiceModal(true)
  }

  const handleNewService = () => {
    setEditingService(null)
    setShowServiceModal(true)
  }

  const handleToggleService = (serviceId: string) => {
    setServices((prev) =>
      prev.map((service) => (service.id === serviceId ? { ...service, isActive: !service.isActive } : service)),
    )
  }

  const handleDeleteService = (serviceId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este servicio?")) {
      setServices((prev) => prev.filter((service) => service.id !== serviceId))
    }
  }

  const totalRevenue = services.reduce((sum, service) => sum + service.price * service.timesUsed, 0)
  const activeServices = services.filter((s) => s.isActive).length
  const totalUsages = services.reduce((sum, service) => sum + service.timesUsed, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-work-sans font-bold">Gestión de Servicios</h1>
          <p className="text-muted-foreground">Administra los servicios que ofrece tu taller</p>
        </div>
        <Button onClick={handleNewService}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Servicio
        </Button>
      </div>

      {/*targetas servicios*/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Servicios</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Wrench className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Servicios Activos</p>
                <p className="text-2xl font-bold">{activeServices}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">{activeServices}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Usos Totales</p>
                <p className="text-2xl font-bold">{totalUsages}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ingresos Totales</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString("es-CO")}</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/*filtro*/}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar servicios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Servicio</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Tiempo Est.</TableHead>
                <TableHead>Usos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{service.price.toLocaleString("es-CO")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{service.estimatedTime} min</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{service.timesUsed}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch checked={service.isActive} onCheckedChange={() => handleToggleService(service.id)} />
                      <span className="text-sm">{service.isActive ? "Activo" : "Inactivo"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredServices.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron servicios</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ServiceModal
        open={showServiceModal}
        onOpenChange={setShowServiceModal}
        service={editingService}
        companyId={companyId}
      />
    </div>
  )
}

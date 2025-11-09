"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Phone, Calendar, Bike, Eye, Edit } from "lucide-react"
import { ClientModal } from "@/components/client-modal"
import { ClientDetailModal } from "@/components/client-detail-modal"

interface ClientsViewProps {
  companyId: string
}

interface Client {
  id: string
  name: string
  phone: string
  email: string
  motorcycle: {
    brand: string
    model: string
    year: number
    plate: string
  }
  totalServices: number
  lastService: string
  status: "active" | "inactive"
  registrationDate: string
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Cliente X",
    phone: "300-123-4567",
    email: "asdwadwad@email.com",
    motorcycle: {
      brand: "Yamaha",
      model: "FZ16",
      year: 2020,
      plate: "ABC123",
    },
    totalServices: 8,
    lastService: "2024-01-10",
    status: "active",
    registrationDate: "2023-03-15",
  },
  {
    id: "2",
    name: "Clainte y",
    phone: "301-234-5678",
    email: "awdawdasd@email.com",
    motorcycle: {
      brand: "Honda",
      model: "CB160F",
      year: 2019,
      plate: "DEF456",
    },
    totalServices: 12,
    lastService: "2024-01-08",
    status: "active",
    registrationDate: "2023-01-20",
  },
  {
    id: "3",
    name: "Cliente z",
    phone: "302-345-6789",
    email: "24fesdwa@email.com",
    motorcycle: {
      brand: "Suzuki",
      model: "GN125",
      year: 2018,
      plate: "GHI789",
    },
    totalServices: 5,
    lastService: "2023-12-20",
    status: "inactive",
    registrationDate: "2023-06-10",
  },
  {
    id: "4",
    name: "Cliente b",
    phone: "303-456-7890",
    email: "wdqeawd2e@email.com",
    motorcycle: {
      brand: "Bajaj",
      model: "Pulsar 180",
      year: 2021,
      plate: "JKL012",
    },
    totalServices: 6,
    lastService: "2024-01-05",
    status: "active",
    registrationDate: "2023-08-25",
  },
]

export function ClientsView({ companyId }: ClientsViewProps) {
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [showClientModal, setShowClientModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm) ||
      client.motorcycle.plate.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || client.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewClient = (client: Client) => {
    setSelectedClient(client)
    setShowDetailModal(true)
  }

  const handleEditClient = (client: Client) => {
    setEditingClient(client)
    setShowClientModal(true)
  }

  const handleNewClient = () => {
    setEditingClient(null)
    setShowClientModal(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-work-sans font-bold">Gestión de Clientes</h1>
          <p className="text-muted-foreground">Administra la información de tus clientes</p>
        </div>
        <Button onClick={handleNewClient}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </Button>
      </div>

      {/*targetas cleinte*/}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Clientes</p>
                <p className="text-2xl font-bold">{clients.length}</p>
              </div>
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{clients.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clientes Activos</p>
                <p className="text-2xl font-bold">{clients.filter((c) => c.status === "active").length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">
                  {clients.filter((c) => c.status === "active").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Servicios Total</p>
                <p className="text-2xl font-bold">{clients.reduce((sum, c) => sum + c.totalServices, 0)}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">
                  {clients.reduce((sum, c) => sum + c.totalServices, 0)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nuevos Este Mes</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600 font-bold text-sm">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nombre, teléfono o placa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                Todos
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("active")}
              >
                Activos
              </Button>
              <Button
                variant={statusFilter === "inactive" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("inactive")}
              >
                Inactivos
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Motocicleta</TableHead>
                <TableHead>Servicios</TableHead>
                <TableHead>Último Servicio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{getInitials(client.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{client.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Bike className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">
                          {client.motorcycle.brand} {client.motorcycle.model}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {client.motorcycle.year} - {client.motorcycle.plate}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{client.totalServices}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{new Date(client.lastService).toLocaleDateString("es-ES")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={client.status === "active" ? "default" : "secondary"}>
                      {client.status === "active" ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No se encontraron clientes</p>
            </div>
          )}
        </CardContent>
      </Card>

      <ClientModal
        open={showClientModal}
        onOpenChange={setShowClientModal}
        client={editingClient}
        companyId={companyId}
      />

      <ClientDetailModal open={showDetailModal} onOpenChange={setShowDetailModal} client={selectedClient} />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, Clock, User, Wrench } from "lucide-react"
import { AppointmentModal } from "@/components/appointment-modal"

interface CalendarViewProps {
  companyId: string
}

interface Appointment {
  id: string
  clientName: string
  service: string
  time: string
  status: "scheduled" | "cancelled" | "in-progress"
  phone: string
  motorcycle: string
}

const mockAppointments: Record<string, Appointment[]> = {
  "2024-01-15": [
    {
      id: "1",
      clientName: "Cliante X",
      service: "Cambio de aceite",
      time: "09:00",
      status: "scheduled",
      phone: "300-123-4567",
      motorcycle: "Yamaha FZ16",
    },
    {
      id: "2",
      clientName: "Cliente y ",
      service: "Mantenimiento",
      time: "11:00",
      status: "in-progress",
      phone: "301-234-5678",
      motorcycle: "Honda CB160F",
    },
  ],
  "2024-01-16": [
    {
      id: "3",
      clientName: "Cleinte z",
      service: "Revisión Técnico-mecánica",
      time: "10:00",
      status: "scheduled",
      phone: "302-345-6789",
      motorcycle: "Suzuki GN125",
    },
    {
      id: "4",
      clientName: "Cleinte v",
      service: "Cambio de aceite",
      time: "14:00",
      status: "cancelled",
      phone: "303-456-7890",
      motorcycle: "Bajaj Pulsar 180",
    },
  ],
}

const statusColors = {
  scheduled: "bg-green-500",
  cancelled: "bg-red-500",
  "in-progress": "bg-yellow-500",
}

const statusLabels = {
  scheduled: "Agendada",
  cancelled: "Cancelada",
  "in-progress": "En Proceso",
}

export function CalendarView({ companyId }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(year, month + (direction === "next" ? 1 : -1), 1))
  }

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getAppointmentsForDate = (date: string) => {
    return mockAppointments[date] || []
  }

  const renderCalendarDays = () => {
    const days = []

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-border bg-muted/20"></div>)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDate(day)
      const appointments = getAppointmentsForDate(dateString)
      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

      days.push(
        <div
          key={day}
          className={`h-24 border border-border bg-card hover:bg-accent/50 cursor-pointer transition-colors ${
            isToday ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => setSelectedDate(dateString)}
        >
          <div className="p-2 h-full flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-medium ${isToday ? "text-primary" : "text-foreground"}`}>{day}</span>
              {appointments.length > 0 && (
                <Badge variant="secondary" className="text-xs px-1 py-0">
                  {appointments.length}
                </Badge>
              )}
            </div>
            <div className="flex-1 space-y-1 overflow-hidden">
              {appointments.slice(0, 2).map((appointment) => (
                <div
                  key={appointment.id}
                  className={`text-xs p-1 rounded text-white truncate ${statusColors[appointment.status]}`}
                >
                  {appointment.time} - {appointment.clientName}
                </div>
              ))}
              {appointments.length > 2 && (
                <div className="text-xs text-muted-foreground">+{appointments.length - 2} más</div>
              )}
            </div>
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-work-sans font-bold">Calendario de Citas</h1>
          <p className="text-muted-foreground">Gestiona las citas de tu taller</p>
        </div>
        <Button onClick={() => setShowAppointmentModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nueva Cita
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  {monthNames[month]} {year}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-0 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground border-b">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
            </CardContent>
          </Card>
        </div>

        
        <div className="space-y-4">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(statusLabels).map(([status, label]) => (
                <div key={status} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${statusColors[status as keyof typeof statusColors]}`}></div>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </CardContent>
          </Card>

        
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {new Date(selectedDate).toLocaleDateString("es-ES", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </CardTitle>
                <CardDescription>Citas del día</CardDescription>
              </CardHeader>
              <CardContent>
                {getAppointmentsForDate(selectedDate).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hay citas programadas</p>
                ) : (
                  <div className="space-y-3">
                    {getAppointmentsForDate(selectedDate).map((appointment) => (
                      <div key={appointment.id} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{appointment.time}</span>
                          </div>
                          <Badge variant="secondary" className={`text-white ${statusColors[appointment.status]}`}>
                            {statusLabels[appointment.status]}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.clientName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{appointment.service}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{appointment.motorcycle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AppointmentModal open={showAppointmentModal} onOpenChange={setShowAppointmentModal} companyId={companyId} />
    </div>
  )
}

import { DashboardLayout } from "@/components/dashboard-layout"
import { CalendarView } from "@/components/calendar-view"

interface CalendarPageProps {
  params: {
    company: string
  }
}

export default function CalendarPage({ params }: CalendarPageProps) {
  return (
    <DashboardLayout companyId={params.company}>
      <CalendarView companyId={params.company} />
    </DashboardLayout>
  )
}

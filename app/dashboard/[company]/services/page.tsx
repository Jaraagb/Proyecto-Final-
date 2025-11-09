import { DashboardLayout } from "@/components/dashboard-layout"
import { ServicesView } from "@/components/services-view"

interface ServicesPageProps {
  params: {
    company: string
  }
}

export default function ServicesPage({ params }: ServicesPageProps) {
  return (
    <DashboardLayout companyId={params.company}>
      <ServicesView companyId={params.company} />
    </DashboardLayout>
  )
}

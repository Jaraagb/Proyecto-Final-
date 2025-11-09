import { DashboardLayout } from "@/components/dashboard-layout"
import { ClientsView } from "@/components/Module-client"

interface ClientsPageProps {
  params: {
    company: string
  }
}

export default function ClientsPage({ params }: ClientsPageProps) {
  return (
    <DashboardLayout companyId={params.company}>
      <ClientsView companyId={params.company} />
    </DashboardLayout>
  )
}

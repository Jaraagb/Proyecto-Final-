import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"

interface DashboardPageProps {
  params: {
    company: string
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  return (
    <DashboardLayout companyId={params.company}>
      <DashboardOverview companyId={params.company} />
    </DashboardLayout>
  )
}

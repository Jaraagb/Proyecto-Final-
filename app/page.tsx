import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">WD</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground font-work-sans">WillDevp</h1>
          <p className="text-muted-foreground mt-2">Sistema de Gestion Administrativo</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

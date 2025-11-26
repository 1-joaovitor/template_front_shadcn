import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4 sm:p-6">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}


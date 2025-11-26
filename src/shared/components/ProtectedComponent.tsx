import { ReactNode } from "react"
import { usePermissions } from "@/shared/hooks/use-permissions"
import { Permission } from "@/shared/types"

interface ProtectedComponentProps {
  children: ReactNode
  permission: Permission
  fallback?: ReactNode
}

export function ProtectedComponent({
  children,
  permission,
  fallback = null,
}: ProtectedComponentProps) {
  const { hasPermission } = usePermissions()

  if (!hasPermission(permission)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}


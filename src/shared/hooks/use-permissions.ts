import { useSelector } from "react-redux"
import { RootState } from "@/infrastructure/store"
import { Permission } from "@/shared/types"

export function usePermissions() {
  const user = useSelector((state: RootState) => state.auth.user)

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false
    return user.permissions.includes(permission)
  }

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false
    return permissions.some((permission) => user.permissions.includes(permission))
  }

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false
    return permissions.every((permission) => user.permissions.includes(permission))
  }

  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissions: user?.permissions || [],
  }
}


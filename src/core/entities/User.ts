import { UserRole, Permission } from "@/shared/types"

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly role: UserRole,
    public readonly permissions: Permission[],
    public readonly avatar?: string
  ) {}

  hasPermission(permission: Permission): boolean {
    return this.permissions.includes(permission)
  }

  hasAnyPermission(permissions: Permission[]): boolean {
    return permissions.some((permission) => this.hasPermission(permission))
  }

  hasAllPermissions(permissions: Permission[]): boolean {
    return permissions.every((permission) => this.hasPermission(permission))
  }

  isAdmin(): boolean {
    return this.role === "admin"
  }
}


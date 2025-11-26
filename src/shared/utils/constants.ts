export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/users",
  SETTINGS: "/dashboard/settings",
} as const

export const PERMISSIONS = {
  READ: "read" as const,
  WRITE: "write" as const,
  DELETE: "delete" as const,
  MANAGE: "manage" as const,
} as const

export const ROLES = {
  ADMIN: "admin" as const,
  USER: "user" as const,
  GUEST: "guest" as const,
} as const


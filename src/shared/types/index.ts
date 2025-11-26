export type UserRole = 'admin' | 'user' | 'guest'
export type Permission = 'read' | 'write' | 'delete' | 'manage'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  avatar?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}


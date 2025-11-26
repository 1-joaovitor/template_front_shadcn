import { User } from "@/shared/types"

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>
  logout(): Promise<void>
  getCurrentUser(): Promise<User>
}


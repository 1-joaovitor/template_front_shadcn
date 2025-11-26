// Mock para desenvolvimento - remover em produção
import { User } from "@/shared/types"
import { LoginRequest, LoginResponse } from "./authApi"

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    permissions: ["read", "write", "delete", "manage"],
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    permissions: ["read", "write"],
  },
]

export const mockAuthApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === credentials.email)

    if (!user || credentials.password !== "admin123") {
      throw new Error("Credenciais inválidas")
    }

    return {
      user,
      token: `mock-token-${user.id}-${Date.now()}`,
    }
  },

  getCurrentUser: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return mockUsers[0]
  },
}


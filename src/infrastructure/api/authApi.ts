import { apiClient } from "./client"
import { User } from "@/shared/types"
import { mockAuthApi } from "./mockAuth"

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

// Use mock em desenvolvimento, API real em produção
const USE_MOCK = import.meta.env.DEV

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    if (USE_MOCK) {
      return mockAuthApi.login(credentials)
    }
    return apiClient.post<LoginResponse>("/auth/login", credentials)
  },

  logout: async (): Promise<void> => {
    if (USE_MOCK) {
      return Promise.resolve()
    }
    return apiClient.post("/auth/logout")
  },

  getCurrentUser: async (): Promise<User> => {
    if (USE_MOCK) {
      return mockAuthApi.getCurrentUser()
    }
    return apiClient.get<User>("/auth/me")
  },
}


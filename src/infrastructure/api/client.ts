import { RootState } from "../store"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem("token")
    
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config)

      if (!response.ok) {
        // Tentar parsear erro da API
        let errorMessage = "Erro na requisição"
        
        try {
          const error = await response.json()
          errorMessage = error.message || error.error || errorMessage
        } catch {
          // Se não conseguir parsear JSON, usar status text
          errorMessage = response.statusText || errorMessage
        }

        // Tratar erros específicos
        if (response.status === 401) {
          // Token inválido ou expirado
          localStorage.removeItem("token")
          window.location.href = "/auth/login"
          // Mensagem será traduzida no componente que captura o erro
          throw new Error("SESSION_EXPIRED")
        }

        if (response.status === 403) {
          throw new Error("NO_PERMISSION")
        }

        if (response.status === 404) {
          throw new Error("NOT_FOUND")
        }

        if (response.status >= 500) {
          throw new Error("SERVER_ERROR")
        }

        throw new Error(errorMessage)
      }

      // Se a resposta estiver vazia, retornar void
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        return undefined as T
      }

      return response.json()
    } catch (error) {
      // Se já for um Error, apenas relançar
      if (error instanceof Error) {
        throw error
      }
      // Caso contrário, criar um novo Error
      throw new Error("CONNECTION_ERROR")
    }
  }

  get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" })
  }

  post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)


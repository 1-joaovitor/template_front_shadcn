import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authApi, LoginRequest } from "@/infrastructure/api/authApi"
import { setCredentials, logout as logoutAction } from "@/infrastructure/store/slices/authSlice"
import { useToast } from "./use-toast"

export function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authApi.login(credentials),
    onSuccess: (data) => {
      dispatch(setCredentials(data))
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta!",
      })
      navigate("/dashboard")
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Credenciais inválidas",
        variant: "destructive",
      })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      dispatch(logoutAction())
      queryClient.clear()
      navigate("/auth/login")
      toast({
        title: "Logout realizado",
        description: "Até logo!",
      })
    },
  })

  const currentUserQuery = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => authApi.getCurrentUser(),
    enabled: !!localStorage.getItem("token"),
  })

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    user: currentUserQuery.data,
    isFetchingUser: currentUserQuery.isFetching,
  }
}


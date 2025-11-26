import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/ui/card"
import { Button } from "@/ui/components/ui/button"
import { Input } from "@/ui/components/ui/input"
import { Label } from "@/ui/components/ui/label"
import { authApi } from "@/infrastructure/api/authApi"
import { setCredentials } from "@/infrastructure/store/slices/authSlice"
import { useToast } from "@/shared/hooks/use-toast"

type LoginFormData = {
  email: string
  password: string
}

export function LoginPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const loginSchema = z.object({
    email: z.string().email(t("auth.login.errorDescription")),
    password: z.string().min(6, t("auth.login.errorDescription")),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      dispatch(setCredentials(data))
      toast({
        title: t("auth.login.success"),
        description: t("auth.login.successDescription"),
      })
      navigate("/dashboard")
    },
    onError: (error: Error) => {
      toast({
        title: t("auth.login.error"),
        description: error.message || t("auth.login.errorDescription"),
        variant: "destructive",
      })
    },
    onSettled: () => {
      setIsLoading(false)
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    loginMutation.mutate(data)
  }

  return (
    <Card className="border-2 shadow-2xl animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {t("auth.login.title")}
        </CardTitle>
        <CardDescription className="text-center">
          {t("auth.login.subtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.login.email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("auth.login.emailPlaceholder")}
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("auth.login.password")}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("auth.login.passwordPlaceholder")}
              {...register("password")}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? t("auth.login.submitting") : t("auth.login.submit")}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>
            {t("auth.login.demoCredentials")}{" "}
            <strong>{t("auth.login.demoEmail")}</strong> /{" "}
            <strong>{t("auth.login.demoPassword")}</strong>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}


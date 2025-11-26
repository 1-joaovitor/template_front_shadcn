import { Link } from "react-router-dom"
import { Button } from "@/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/ui/card"
import { AlertTriangle, Home } from "lucide-react"
import { useTranslation } from "react-i18next"

interface ErrorPageProps {
  statusCode?: number
  message?: string
}

export function ErrorPage({ statusCode = 500, message }: ErrorPageProps) {
  const { t } = useTranslation()

  const errorMessages: Record<number, string> = {
    404: t("errors.404.title"),
    403: t("errors.403.title"),
    500: t("errors.500.title"),
    503: t("errors.500.title"),
  }

  const errorMessage = message || errorMessages[statusCode] || t("errors.generic.title")

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-6xl font-bold">{statusCode}</CardTitle>
          <CardDescription className="text-lg mt-2">
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            {statusCode === 404
              ? t("errors.404.description")
              : t("errors.500.description")}
          </p>
          <div className="flex gap-2 justify-center">
            <Button asChild>
              <Link to="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                {t("navigation.dashboard")}
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              {t("errors.generic.reload")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


import { useToast } from "./use-toast"
import { useTranslation } from "react-i18next"

export function useErrorHandler() {
  const { toast } = useToast()
  const { t } = useTranslation()

  const handleError = (error: unknown) => {
    let message = t("errors.generic.description")

    if (error instanceof Error) {
      const errorKey = error.message
      // Mapear códigos de erro para traduções
      const errorMap: Record<string, string> = {
        SESSION_EXPIRED: t("errors.sessionExpired"),
        NO_PERMISSION: t("errors.noPermission"),
        NOT_FOUND: t("errors.notFound"),
        SERVER_ERROR: t("errors.serverError"),
        CONNECTION_ERROR: t("errors.connectionError"),
      }

      message = errorMap[errorKey] || error.message || message
    } else if (typeof error === "string") {
      message = error
    } else if (
      error &&
      typeof error === "object" &&
      "message" in error
    ) {
      message = String(error.message)
    }

    toast({
      title: t("errors.generic.title"),
      description: message,
      variant: "destructive",
    })
  }

  return { handleError }
}


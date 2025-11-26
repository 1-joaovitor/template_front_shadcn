import { useTranslation } from "react-i18next"

export type Language = "pt-BR" | "en"

export function useLanguage() {
  const { i18n } = useTranslation()

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language)
    localStorage.setItem("language", language)
  }

  const currentLanguage: Language = (i18n.language as Language) || "pt-BR"

  return {
    currentLanguage,
    changeLanguage,
    languages: [
      { code: "pt-BR" as Language, label: "Português" },
      { code: "en" as Language, label: "English" },
    ],
  }
}


import "react-i18next"

import ptBR from "./locales/pt-BR.json"
import en from "./locales/en.json"

declare module "react-i18next" {
    interface CustomTypeOptions {
        defaultNS: "translation"
        resources: {
            translation: typeof ptBR & typeof en
        }
    }
}


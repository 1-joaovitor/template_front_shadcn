# Guia de Contribuição

Obrigado por considerar contribuir para este template! 🎉

## 🚀 Como Adicionar Novos Componentes shadcn/ui

1. Execute o comando:
```bash
npx shadcn-ui@latest add [component-name]
```

2. Os componentes serão adicionados em `src/ui/components/ui/`

3. Exemplos de componentes disponíveis:
   - `accordion`
   - `alert`
   - `checkbox`
   - `command`
   - `popover`
   - `progress`
   - `radio-group`
   - `scroll-area`
   - `slider`
   - `switch`
   - `textarea`
   - E muitos outros!

## 📝 Adicionando Novas Traduções

1. Edite os arquivos em `src/shared/i18n/locales/`:
   - `pt-BR.json` - Português
   - `en.json` - Inglês

2. Use a mesma estrutura de chaves em ambos os arquivos

3. Exemplo:
```json
{
  "minhaFeature": {
    "titulo": "Meu Título",
    "descricao": "Minha Descrição"
  }
}
```

## 🎨 Personalizando Temas

Edite as variáveis CSS em `src/index.css`:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  /* ... outras variáveis */
}
```

## 🧪 Adicionando Testes (Opcional)

1. Instale as dependências:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

2. Crie `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
  },
})
```

3. Adicione script no `package.json`:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

## 📦 Estrutura de Features

Ao adicionar uma nova feature:

1. Crie a estrutura em `src/features/[nome-feature]/`
2. Siga o padrão:
   - `pages/` - Páginas da feature
   - `components/` - Componentes específicos
   - `hooks/` - Hooks específicos (opcional)
3. Adicione rotas em `src/infrastructure/router/index.tsx`

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run lint` - Verifica erros de lint
- `npm run lint:fix` - Corrige erros de lint automaticamente
- `npm run format` - Formata código com Prettier
- `npm run format:check` - Verifica formatação
- `npm run type-check` - Verifica tipos TypeScript

## 📚 Boas Práticas

1. **Sempre use TypeScript** - Tipagem forte em todos os lugares
2. **Siga a arquitetura** - Respeite as camadas (core, features, infrastructure)
3. **Componentes pequenos** - Mantenha componentes focados e reutilizáveis
4. **Hooks customizados** - Extraia lógica reutilizável
5. **Traduções** - Sempre adicione traduções para pt-BR e en
6. **Acessibilidade** - Use componentes shadcn/ui que já são acessíveis

## 🐛 Reportando Problemas

Se encontrar algum problema:
1. Verifique se já existe uma issue aberta
2. Crie uma nova issue com:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs atual
   - Screenshots (se aplicável)

## 💡 Sugestões

Tem uma ideia para melhorar o template? Abra uma issue ou pull request!


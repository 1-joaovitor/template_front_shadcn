# Template Frontend - Shadcn UI

Template completo de frontend seguindo **SOLID principles** e **Clean Architecture**, com React, shadcn/ui, Redux, React Query e muito mais!

## ✨ Características

- 🏗️ **Clean Architecture** - Separação clara de responsabilidades
- 🎯 **SOLID Principles** - Código limpo e manutenível
- 🎨 **UI Moderna** - Design futurista com shadcn/ui
- 🌓 **Temas Adaptativos** - Dark/Light mode com detecção automática
- 🔐 **Sistema de Permissões** - Controle de acesso baseado em roles e permissões
- 🛡️ **Rotas Protegidas** - Autenticação e autorização
- ⚡ **Performance** - Otimizado com React Query e Redux
- 📱 **Responsivo** - Design adaptável a todos os dispositivos
- 🎭 **TypeScript** - Tipagem estática completa
- 🧩 **Modular** - Estrutura escalável e extensível

## 🚀 Tecnologias

### Core
- **React 18** - Biblioteca UI moderna
- **TypeScript** - Tipagem estática
- **Vite** - Build tool ultra-rápido

### UI & Estilização
- **shadcn/ui** - Componentes UI acessíveis
- **Tailwind CSS** - Framework CSS utility-first
- **Radix UI** - Primitivos UI acessíveis
- **Lucide React** - Ícones modernos

### Estado & Dados
- **Redux Toolkit** - Gerenciamento de estado global
- **React Query** - Gerenciamento de dados do servidor
- **React Hook Form** - Formulários performáticos
- **Zod** - Validação de schemas

### Roteamento
- **React Router DOM** - Roteamento declarativo

## 📁 Estrutura do Projeto

```
src/
├── core/                    # Camada de Domínio (Regras de Negócio)
│   ├── entities/           # Entidades do domínio
│   ├── repositories/       # Interfaces de repositórios
│   └── use-cases/          # Casos de uso
│
├── features/               # Features da Aplicação
│   ├── auth/              # Feature de autenticação
│   └── dashboard/         # Feature de dashboard
│
├── infrastructure/         # Camada de Infraestrutura
│   ├── api/               # Cliente API e serviços
│   ├── store/             # Redux store e slices
│   └── router/            # Configuração de rotas
│
├── shared/                # Código Compartilhado
│   ├── components/        # Componentes compartilhados
│   ├── hooks/             # Hooks customizados
│   ├── utils/             # Utilitários
│   └── types/             # Tipos TypeScript
│
└── ui/                    # Camada de Interface
    ├── components/        # Componentes UI (shadcn)
    ├── layouts/           # Layouts da aplicação
    └── pages/             # Páginas genéricas
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Ou com yarn
yarn install

# Ou com pnpm
pnpm install
```

## 🚀 Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# O projeto estará disponível em http://localhost:5173
```

### Credenciais de Teste

O projeto inclui um sistema de mock para desenvolvimento. Use:

- **Email**: `admin@example.com`
- **Senha**: `admin123`

## 📦 Build

```bash
# Criar build de produção
npm run build

# Preview do build
npm run preview
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Adicionar Componentes shadcn/ui

```bash
npx shadcn-ui@latest add [component-name]
```

## 🎨 Sistema de Temas

O tema é gerenciado automaticamente com suporte a:
- 🌞 Modo Claro
- 🌙 Modo Escuro
- 💻 Modo Sistema (detecta preferência do SO)

Use o hook `useTheme()` para controlar o tema:

```tsx
import { useTheme } from "@/shared/hooks/use-theme"

const { theme, setTheme } = useTheme()
```

## 🔐 Sistema de Permissões

### Roles
- `admin` - Acesso total
- `user` - Acesso limitado
- `guest` - Acesso mínimo

### Permissions
- `read` - Leitura
- `write` - Escrita
- `delete` - Exclusão
- `manage` - Gerenciamento completo

### Uso

```tsx
import { usePermissions } from "@/shared/hooks/use-permissions"

const { hasPermission } = usePermissions()

if (hasPermission("manage")) {
  // Renderizar conteúdo administrativo
}
```

## 📚 Documentação

- [Arquitetura](./ARCHITECTURE.md) - Detalhes sobre a arquitetura do projeto
- [shadcn/ui](https://ui.shadcn.com) - Documentação dos componentes UI

## 🎯 Próximos Passos

1. Configure sua API backend
2. Ajuste as variáveis de ambiente
3. Personalize os temas em `src/index.css`
4. Adicione suas features em `src/features/`
5. Configure autenticação real (remova o mock)

## 🤝 Contribuindo

Este é um template base. Sinta-se livre para:
- Adicionar novas features
- Melhorar componentes existentes
- Adicionar testes
- Otimizar performance

## 📝 Licença

MIT - Sinta-se livre para usar em seus projetos!

## 🙏 Créditos

- [shadcn/ui](https://ui.shadcn.com) - Componentes UI incríveis
- [Vite](https://vitejs.dev) - Build tool
- [React](https://react.dev) - Biblioteca UI
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS

# template_front_shadcn

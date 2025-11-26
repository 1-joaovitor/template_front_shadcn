# Arquitetura do Projeto

Este projeto segue os princípios **SOLID** e **Clean Architecture** para garantir código limpo, testável e manutenível.

## 📐 Estrutura de Pastas

```
src/
├── core/                    # Camada de Domínio (Regras de Negócio)
│   ├── entities/           # Entidades do domínio
│   ├── repositories/       # Interfaces de repositórios (contratos)
│   └── use-cases/          # Casos de uso (lógica de negócio)
│
├── features/               # Features da Aplicação
│   ├── auth/              # Feature de autenticação
│   │   ├── pages/         # Páginas da feature
│   │   ├── components/    # Componentes específicos
│   │   └── hooks/         # Hooks específicos
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
│   └── types/             # Tipos TypeScript compartilhados
│
└── ui/                    # Camada de Interface
    ├── components/        # Componentes UI (shadcn)
    ├── layouts/           # Layouts da aplicação
    └── pages/             # Páginas genéricas
```

## 🏗️ Princípios SOLID

### Single Responsibility Principle (SRP)
Cada classe/componente tem uma única responsabilidade:
- `UserEntity`: Representa a entidade usuário
- `AuthenticateUserUseCase`: Executa apenas a autenticação
- `ApiClient`: Gerencia apenas requisições HTTP

### Open/Closed Principle (OCP)
- Interfaces permitem extensão sem modificação
- `IAuthRepository` pode ser implementada de diferentes formas

### Liskov Substitution Principle (LSP)
- Implementações de repositórios são intercambiáveis
- Componentes seguem contratos definidos

### Interface Segregation Principle (ISP)
- Interfaces específicas e focadas
- `IAuthRepository` contém apenas métodos de autenticação

### Dependency Inversion Principle (DIP)
- Dependências apontam para abstrações (interfaces)
- Use cases dependem de interfaces, não de implementações

## 🎯 Clean Architecture

### Camadas

1. **Core (Domínio)**
   - Entidades puras
   - Casos de uso
   - Interfaces de repositórios
   - Sem dependências externas

2. **Infrastructure**
   - Implementações concretas
   - API clients
   - Redux store
   - Router

3. **Features**
   - Organização por feature
   - Combina todas as camadas
   - Páginas e componentes específicos

4. **UI**
   - Componentes reutilizáveis
   - Layouts
   - Componentes shadcn/ui

5. **Shared**
   - Código compartilhado entre features
   - Utilitários
   - Hooks genéricos

## 🔐 Sistema de Permissões

O sistema de permissões é baseado em:
- **Roles**: `admin`, `user`, `guest`
- **Permissions**: `read`, `write`, `delete`, `manage`

### Uso

```tsx
import { usePermissions } from "@/shared/hooks/use-permissions"

function MyComponent() {
  const { hasPermission } = usePermissions()
  
  if (hasPermission("manage")) {
    return <AdminPanel />
  }
  
  return <UserPanel />
}
```

### Componente Protegido

```tsx
import { ProtectedComponent } from "@/shared/components/ProtectedComponent"

<ProtectedComponent permission="write">
  <EditButton />
</ProtectedComponent>
```

## 🎨 Sistema de Temas

O tema é gerenciado via:
- CSS Variables
- Tailwind CSS
- Hook `useTheme`

### Cores

As cores são definidas em `src/index.css` usando variáveis CSS que se adaptam ao tema claro/escuro.

## 📦 Gerenciamento de Estado

### Redux Toolkit
- Store centralizado
- Slices para cada domínio
- Hooks tipados (`useAppDispatch`, `useAppSelector`)

### React Query
- Cache de dados do servidor
- Sincronização automática
- Estados de loading/error

## 🛣️ Roteamento

### Rotas Protegidas
- `ProtectedRoute`: Requer autenticação
- `PublicRoute`: Redireciona se autenticado

### Estrutura
```tsx
{
  path: "/dashboard",
  element: <ProtectedRoute />,
  children: [...]
}
```

## 🧪 Testes (Recomendado)

Para adicionar testes:
1. Instalar: `npm install -D vitest @testing-library/react`
2. Criar testes em `__tests__` ou `*.test.tsx`
3. Configurar `vitest.config.ts`

## 📝 Boas Práticas

1. **Separação de Responsabilidades**: Cada arquivo tem um propósito claro
2. **Tipagem Forte**: Use TypeScript em todos os lugares
3. **Hooks Customizados**: Extraia lógica reutilizável
4. **Componentes Pequenos**: Mantenha componentes focados
5. **Nomenclatura Clara**: Use nomes descritivos
6. **DRY**: Não repita código, use utilitários

## 🚀 Adicionando Novas Features

1. Criar pasta em `features/`
2. Definir entidades em `core/entities/`
3. Criar interfaces em `core/repositories/`
4. Implementar casos de uso em `core/use-cases/`
5. Implementar API em `infrastructure/api/`
6. Criar páginas em `features/[feature]/pages/`
7. Adicionar rotas em `infrastructure/router/`


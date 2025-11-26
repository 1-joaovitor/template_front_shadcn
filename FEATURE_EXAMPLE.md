# Exemplo: Como Criar uma Nova Feature

Este guia mostra como criar uma nova feature seguindo a arquitetura do projeto.

## 📋 Passos

### 1. Criar Estrutura de Pastas

```
src/features/minha-feature/
├── pages/
│   └── MinhaFeaturePage.tsx
├── components/
│   └── MeuComponente.tsx
└── hooks/
    └── useMinhaFeature.ts
```

### 2. Definir Entidade (se necessário)

```typescript
// src/core/entities/MinhaEntidade.ts
export class MinhaEntidade {
  constructor(
    public readonly id: string,
    public readonly nome: string
  ) {}
}
```

### 3. Criar Interface de Repositório

```typescript
// src/core/repositories/IMinhaFeatureRepository.ts
export interface IMinhaFeatureRepository {
  buscarTodos(): Promise<MinhaEntidade[]>
  buscarPorId(id: string): Promise<MinhaEntidade>
  criar(dados: CriarDados): Promise<MinhaEntidade>
}
```

### 4. Criar Caso de Uso

```typescript
// src/core/use-cases/BuscarMinhaFeatureUseCase.ts
export class BuscarMinhaFeatureUseCase {
  constructor(
    private repository: IMinhaFeatureRepository
  ) {}

  async execute(id: string): Promise<MinhaEntidade> {
    return this.repository.buscarPorId(id)
  }
}
```

### 5. Implementar API

```typescript
// src/infrastructure/api/minhaFeatureApi.ts
import { apiClient } from "./client"

export const minhaFeatureApi = {
  buscarTodos: async () => {
    return apiClient.get<MinhaEntidade[]>("/minha-feature")
  },
  
  buscarPorId: async (id: string) => {
    return apiClient.get<MinhaEntidade>(`/minha-feature/${id}`)
  },
}
```

### 6. Criar Hook Customizado

```typescript
// src/features/minha-feature/hooks/useMinhaFeature.ts
import { useQuery } from "@tanstack/react-query"
import { minhaFeatureApi } from "@/infrastructure/api/minhaFeatureApi"

export function useMinhaFeature(id: string) {
  return useQuery({
    queryKey: ["minha-feature", id],
    queryFn: () => minhaFeatureApi.buscarPorId(id),
  })
}
```

### 7. Criar Componente

```typescript
// src/features/minha-feature/components/MeuComponente.tsx
import { useMinhaFeature } from "../hooks/useMinhaFeature"
import { Loading } from "@/ui/components/Loading"
import { Card } from "@/ui/components/ui/card"

export function MeuComponente({ id }: { id: string }) {
  const { data, isLoading } = useMinhaFeature(id)

  if (isLoading) return <Loading />

  return (
    <Card>
      <h2>{data?.nome}</h2>
    </Card>
  )
}
```

### 8. Criar Página

```typescript
// src/features/minha-feature/pages/MinhaFeaturePage.tsx
import { MeuComponente } from "../components/MeuComponente"
import { useParams } from "react-router-dom"

export function MinhaFeaturePage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div>
      <h1>Minha Feature</h1>
      {id && <MeuComponente id={id} />}
    </div>
  )
}
```

### 9. Adicionar Rota

```typescript
// src/infrastructure/router/index.tsx
import { MinhaFeaturePage } from "@/features/minha-feature/pages/MinhaFeaturePage"

// Dentro do router:
{
  path: "/minha-feature/:id",
  element: <ProtectedRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <MinhaFeaturePage />,
        },
      ],
    },
  ],
}
```

### 10. Adicionar ao Sidebar (opcional)

```typescript
// src/ui/components/Sidebar.tsx
const navigation = [
  // ... outros itens
  {
    name: "Minha Feature",
    href: "/minha-feature",
    icon: MeuIcone,
    permission: "read" as const,
  },
]
```

## 🎯 Boas Práticas

1. **Separe responsabilidades**: Cada arquivo tem um propósito único
2. **Use TypeScript**: Tipagem forte em todos os lugares
3. **Siga a arquitetura**: Respeite as camadas (core, infrastructure, features)
4. **Reutilize código**: Use componentes e hooks compartilhados
5. **Teste suas features**: Adicione testes quando possível

## 📚 Exemplos de Features

- ✅ Autenticação (`features/auth/`)
- ✅ Dashboard (`features/dashboard/`)

Siga esses exemplos como referência!


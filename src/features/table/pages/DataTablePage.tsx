import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/ui/card"
import { Input } from "@/ui/components/ui/input"
import { Button } from "@/ui/components/ui/button"
import { Badge } from "@/ui/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/components/ui/pagination"
import { useDebounce } from "@/shared/hooks/use-debounce"
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  ArrowUpDown
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu"
import { formatCurrency, formatDate } from "@/shared/utils/format"

// Tipos
type Status = "active" | "inactive" | "pending" | "suspended"
type Role = "admin" | "user" | "manager" | "guest"

interface TableData {
  id: string
  name: string
  email: string
  role: Role
  status: Status
  createdAt: string
  lastLogin: string
  revenue: number
  orders: number
}

// Dados mock
const generateMockData = (count: number): TableData[] => {
  const roles: Role[] = ["admin", "user", "manager", "guest"]
  const statuses: Status[] = ["active", "inactive", "pending", "suspended"]
  const names = [
    "João Silva", "Maria Santos", "Pedro Oliveira", "Ana Costa",
    "Carlos Souza", "Julia Ferreira", "Lucas Almeida", "Fernanda Lima",
    "Rafael Pereira", "Beatriz Rodrigues", "Gabriel Martins", "Isabela Gomes"
  ]

  return Array.from({ length: count }, (_, i) => ({
    id: `ID-${String(i + 1).padStart(4, "0")}`,
    name: names[i % names.length] + ` ${Math.floor(i / names.length) + 1}`,
    email: `user${i + 1}@example.com`,
    role: roles[i % roles.length],
    status: statuses[i % statuses.length],
    createdAt: new Date(2024, 0, i + 1).toISOString(),
    lastLogin: new Date(2024, 11, i + 1).toISOString(),
    revenue: Math.floor(Math.random() * 100000) + 1000,
    orders: Math.floor(Math.random() * 100) + 1,
  }))
}

const ITEMS_PER_PAGE = 10

export function DataTablePage() {
  const { t } = useTranslation()
  const [data] = useState<TableData[]>(generateMockData(150))
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<keyof TableData | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const debouncedSearch = useDebounce(searchTerm, 300)

  // Função de ordenação
  const handleSort = (field: keyof TableData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filtrar e ordenar dados
  const filteredAndSortedData = useMemo(() => {
    let filtered = data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        item.id.toLowerCase().includes(debouncedSearch.toLowerCase())

      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      const matchesRole = roleFilter === "all" || item.role === roleFilter

      return matchesSearch && matchesStatus && matchesRole
    })

    // Ordenação
    if (sortField) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortField]
        const bValue = b[sortField]

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortDirection === "asc" ? aValue - bValue : bValue - aValue
        }

        return 0
      })
    }

    return filtered
  }, [data, debouncedSearch, statusFilter, roleFilter, sortField, sortDirection])

  // Paginação
  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedData = filteredAndSortedData.slice(startIndex, endIndex)

  // Resetar página quando filtros mudarem
  const handleFilterChange = (filterType: "status" | "role", value: string) => {
    if (filterType === "status") {
      setStatusFilter(value)
    } else {
      setRoleFilter(value)
    }
    setCurrentPage(1)
  }

  const getStatusBadge = (status: Status) => {
    const variants: Record<Status, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
      suspended: "destructive",
    }

    const labels: Record<Status, string> = {
      active: "Ativo",
      inactive: "Inativo",
      pending: "Pendente",
      suspended: "Suspenso",
    }

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    )
  }

  const getRoleBadge = (role: Role) => {
    const labels: Record<Role, string> = {
      admin: "Admin",
      user: "Usuário",
      manager: "Gerente",
      guest: "Visitante",
    }

    return (
      <Badge variant="secondary" className="capitalize">
        {labels[role]}
      </Badge>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Tabela de Dados</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Exemplo completo com paginação, filtros e ordenação
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
            <span className="sm:hidden">Export</span>
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Novo Item
          </Button>
        </div>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Filtros e Busca</CardTitle>
          <CardDescription>
            Total de registros: {filteredAndSortedData.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou ID..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="suspended">Suspenso</SelectItem>
              </SelectContent>
            </Select>
            <Select value={roleFilter} onValueChange={(value) => handleFilterChange("role", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Função" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Funções</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">Usuário</SelectItem>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="guest">Visitante</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setRoleFilter("all")
                setCurrentPage(1)
              }}
            >
              <Filter className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Dados</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Mostrando {startIndex + 1} - {Math.min(endIndex, filteredAndSortedData.length)} de{" "}
            {filteredAndSortedData.length} registros
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden lg:block rounded-md border">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleSort("id")}
                      >
                        ID
                        {sortField === "id" && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleSort("name")}
                      >
                        Nome
                        {sortField === "name" && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleSort("email")}
                      >
                        Email
                        {sortField === "email" && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleSort("revenue")}
                      >
                        Receita
                        {sortField === "revenue" && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleSort("orders")}
                      >
                        Pedidos
                        {sortField === "orders" && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2"
                        onClick={() => handleSort("createdAt")}
                      >
                        Criado em
                        {sortField === "createdAt" && (
                          <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[70px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.length > 0 ? (
                    paginatedData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-mono text-sm">{item.id}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{getRoleBadge(item.role)}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>{formatCurrency(item.revenue)}</TableCell>
                        <TableCell>{item.orders}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <Card key={item.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <CardDescription className="text-xs">{item.email}</CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">ID</p>
                        <p className="font-mono text-xs">{item.id}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Função</p>
                        <div className="mt-1">{getRoleBadge(item.role)}</div>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Status</p>
                        <div className="mt-1">{getStatusBadge(item.status)}</div>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Pedidos</p>
                        <p className="font-medium">{item.orders}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Receita</p>
                        <p className="font-medium">{formatCurrency(item.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Criado em</p>
                        <p className="text-xs">{formatDate(item.createdAt)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Nenhum registro encontrado
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Paginação */}
      {totalPages > 1 && (
        <Card>
          <CardContent className="py-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {(() => {
                  const pages: (number | "ellipsis")[] = []

                  // Sempre mostrar primeira página
                  pages.push(1)

                  // Adicionar ellipsis se necessário
                  if (currentPage > 3) {
                    pages.push("ellipsis")
                  }

                  // Adicionar páginas ao redor da atual
                  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                    if (!pages.includes(i)) {
                      pages.push(i)
                    }
                  }

                  // Adicionar ellipsis se necessário
                  if (currentPage < totalPages - 2) {
                    pages.push("ellipsis")
                  }

                  // Sempre mostrar última página
                  if (totalPages > 1 && !pages.includes(totalPages)) {
                    pages.push(totalPages)
                  }

                  return pages.map((page, index) => {
                    if (page === "ellipsis") {
                      return (
                        <PaginationItem key={`ellipsis-${index}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )
                    }
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  })
                })()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


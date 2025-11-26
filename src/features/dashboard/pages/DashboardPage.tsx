import { useSelector } from "react-redux"
import { RootState } from "@/infrastructure/store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/ui/card"
import { usePermissions } from "@/shared/hooks/use-permissions"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"
import { Badge } from "@/ui/components/ui/badge"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { UsersTable } from "../components/UsersTable"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"

const chartData = [
  { name: "Jan", vendas: 4000, usuarios: 2400 },
  { name: "Fev", vendas: 3000, usuarios: 1398 },
  { name: "Mar", vendas: 2000, usuarios: 9800 },
  { name: "Abr", vendas: 2780, usuarios: 3908 },
  { name: "Mai", vendas: 1890, usuarios: 4800 },
  { name: "Jun", vendas: 2390, usuarios: 3800 },
]

export function DashboardPage() {
  const { t } = useTranslation()
  const user = useSelector((state: RootState) => state.auth.user)
  const { hasPermission } = usePermissions()

  const stats = [
    {
      name: t("dashboard.stats.totalSales"),
      value: "R$ 45.231",
      change: "+20.1%",
      icon: DollarSign,
    },
    {
      name: t("dashboard.stats.activeUsers"),
      value: "2.350",
      change: "+180.1%",
      icon: Users,
    },
    {
      name: t("dashboard.stats.growth"),
      value: "12.5%",
      change: "+19%",
      icon: TrendingUp,
    },
    {
      name: t("dashboard.stats.activity"),
      value: "573",
      change: "+201",
      icon: Activity,
    },
  ]

  // Exemplo de query - em produção, isso viria de uma API real
  const { data: mockUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      // Mock de usuários para demonstração
      return [
        {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin" as const,
          permissions: ["read", "write", "delete", "manage"] as const,
        },
        {
          id: "2",
          name: "Regular User",
          email: "user@example.com",
          role: "user" as const,
          permissions: ["read", "write"] as const,
        },
      ]
    },
  })

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {t("dashboard.greeting", { name: user?.name })}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          {t("dashboard.welcome")}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 dark:text-green-400">
                    {stat.change}
                  </span>{" "}
                  {t("dashboard.stats.changeFromLastMonth")}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.permissions.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.permissions.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user?.permissions.map((permission) => (
                <Badge key={permission} variant="secondary">
                  {permission}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.accountInfo.title")}</CardTitle>
            <CardDescription>{t("dashboard.accountInfo.description")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">{t("dashboard.accountInfo.name")}</p>
              <p className="font-medium">{user?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("dashboard.accountInfo.email")}</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t("dashboard.accountInfo.role")}</p>
              <p className="font-medium capitalize">{user?.role}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {hasPermission("manage") && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle>{t("dashboard.adminArea.title")}</CardTitle>
            <CardDescription>
              {t("dashboard.adminArea.description")}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.charts.salesOverTime.title")}</CardTitle>
            <CardDescription>{t("dashboard.charts.salesOverTime.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="vendas"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="usuarios"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard.charts.monthlyComparison.title")}</CardTitle>
            <CardDescription>{t("dashboard.charts.monthlyComparison.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="vendas" fill="hsl(var(--primary))" />
                  <Bar dataKey="usuarios" fill="hsl(var(--secondary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {hasPermission("read") && (
        <UsersTable users={mockUsers} isLoading={isLoadingUsers} />
      )}
    </div>
  )
}


import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { cn } from "@/shared/utils/cn"
import { LayoutDashboard, Settings, Users, Package, Table } from "lucide-react"
import { usePermissions } from "@/shared/hooks/use-permissions"
import { useTranslation } from "react-i18next"
import { RootState } from "@/infrastructure/store"

interface SidebarProps {
  mobile?: boolean
  onLinkClick?: () => void
}

export function Sidebar({ mobile = false, onLinkClick }: SidebarProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const { hasPermission } = usePermissions()
  const user = useSelector((state: RootState) => state.auth.user)

  const navigation = [
    {
      name: t("navigation.dashboard"),
      href: "/dashboard",
      icon: LayoutDashboard,
      permission: "read" as const,
      alwaysShow: true,
    },
    {
      name: t("navigation.components"),
      href: "/dashboard/components",
      icon: Package,
      permission: "read" as const,
      alwaysShow: true,
    },
    {
      name: t("navigation.table"),
      href: "/dashboard/table",
      icon: Table,
      permission: "read" as const,
      alwaysShow: true,
    },
    {
      name: t("navigation.users"),
      href: "/dashboard/users",
      icon: Users,
      permission: "read" as const,
      alwaysShow: true,
    },
    {
      name: t("navigation.settings"),
      href: "/dashboard/settings",
      icon: Settings,
      permission: "read" as const,
      alwaysShow: true,
    },
  ]

  // No template, mostramos todos os itens por padrão
  // Você pode remover o alwaysShow: true e usar a lógica de permissões se necessário
  const filteredNavigation = navigation.filter((item) => {
    if (item.alwaysShow) return true
    // Se não tiver usuário autenticado, mostrar todos
    if (!user) return true
    // Se tiver usuário, verificar permissão
    return hasPermission(item.permission)
  })

  const sidebarContent = (
    <nav className="p-4 space-y-2">
      {filteredNavigation.length > 0 ? (
        filteredNavigation.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span>{item.name}</span>
            </Link>
          )
        })
      ) : (
        <div className="p-3 text-sm text-muted-foreground">
          {t("navigation.dashboard")}
        </div>
      )}
    </nav>
  )

  if (mobile) {
    return sidebarContent
  }

  return (
    <aside className="hidden lg:block w-64 border-r bg-card min-h-[calc(100vh-4rem)] flex-shrink-0">
      {sidebarContent}
    </aside>
  )
}


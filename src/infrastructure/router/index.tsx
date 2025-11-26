import { createBrowserRouter, Navigate } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"
import { PublicRoute } from "./PublicRoute"
import { AppLayout } from "@/ui/layouts/AppLayout"
import { AuthLayout } from "@/ui/layouts/AuthLayout"
import { LoginPage } from "@/features/auth/pages/LoginPage"
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage"
import { ComponentsShowcasePage } from "@/features/components/pages/ComponentsShowcasePage"
import { DataTablePage } from "@/features/table/pages/DataTablePage"
import { NotFoundPage } from "@/ui/pages/NotFoundPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "components",
            element: <ComponentsShowcasePage />,
          },
          {
            path: "table",
            element: <DataTablePage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])


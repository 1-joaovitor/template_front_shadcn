import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "@/ui/components/Sidebar"
import { Header } from "@/ui/components/Header"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/ui/components/ui/sheet"
import { useTranslation } from "react-i18next"

export function AppLayout() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setMobileMenuOpen(true)} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>{t("navigation.dashboard")}</SheetTitle>
          </SheetHeader>
          <Sidebar
            mobile
            onLinkClick={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}


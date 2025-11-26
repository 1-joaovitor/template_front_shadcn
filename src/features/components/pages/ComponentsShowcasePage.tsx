import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/components/ui/card"
import { Button } from "@/ui/components/ui/button"
import { Input } from "@/ui/components/ui/input"
import { Label } from "@/ui/components/ui/label"
import { Badge } from "@/ui/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/avatar"
import { Separator } from "@/ui/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/components/ui/dialog"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  User,
  Mail,
  Phone,
  Calendar
} from "lucide-react"

export function ComponentsShowcasePage() {
  const { t } = useTranslation()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Componentes UI</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Todos os componentes disponíveis no template
        </p>
      </div>

      <Tabs defaultValue="buttons" className="space-y-4">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="buttons" className="text-xs sm:text-sm">Botões</TabsTrigger>
          <TabsTrigger value="forms" className="text-xs sm:text-sm">Formulários</TabsTrigger>
          <TabsTrigger value="cards" className="text-xs sm:text-sm">Cards</TabsTrigger>
          <TabsTrigger value="badges" className="text-xs sm:text-sm">Badges</TabsTrigger>
          <TabsTrigger value="dialogs" className="text-xs sm:text-sm">Diálogos</TabsTrigger>
          <TabsTrigger value="avatars" className="text-xs sm:text-sm">Avatares</TabsTrigger>
        </TabsList>

        <TabsContent value="buttons" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Botões</CardTitle>
              <CardDescription>Diferentes variações de botões</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button disabled>Disabled</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Formulários</CardTitle>
              <CardDescription>Componentes de formulário</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="disabled">Campo Desabilitado</Label>
                <Input id="disabled" disabled placeholder="Desabilitado" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Card Simples</CardTitle>
                <CardDescription>Descrição do card</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Conteúdo do card aqui</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Card com Ações</CardTitle>
                <CardDescription>Card com botões</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Conteúdo do card</p>
                <div className="flex gap-2">
                  <Button size="sm">Ação 1</Button>
                  <Button size="sm" variant="outline">Ação 2</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>Diferentes tipos de badges</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dialogs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diálogos</CardTitle>
              <CardDescription>Modais e diálogos</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Abrir Diálogo</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Exemplo de Diálogo</DialogTitle>
                    <DialogDescription>
                      Este é um exemplo de diálogo usando shadcn/ui
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <p>Conteúdo do diálogo aqui</p>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => setDialogOpen(false)}>Confirmar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="avatars" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Avatares</CardTitle>
              <CardDescription>Componentes de avatar</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Ícones</CardTitle>
          <CardDescription>Ícones disponíveis (Lucide React)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4">
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
              <span className="text-xs">CheckCircle</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <XCircle className="h-6 w-6 text-red-500" />
              <span className="text-xs">XCircle</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-500" />
              <span className="text-xs">AlertCircle</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <Info className="h-6 w-6 text-blue-500" />
              <span className="text-xs">Info</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <User className="h-6 w-6" />
              <span className="text-xs">User</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <Mail className="h-6 w-6" />
              <span className="text-xs">Mail</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <Phone className="h-6 w-6" />
              <span className="text-xs">Phone</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 border rounded-lg">
              <Calendar className="h-6 w-6" />
              <span className="text-xs">Calendar</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


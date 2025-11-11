import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceManager } from "@/components/ServiceManager";
import { Users, Package, BarChart3 } from "lucide-react";
import { fetchJson } from "@/lib/api";

interface AdminSummary {
  totalUsuarios: number;
  totalProdutos: number;
  totalPosts: number;
}

const Admin = () => {
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSummary = async () => {
      try {
        const data = await fetchJson<AdminSummary>("/api/admin/summary");
        if (isMounted) {
          setSummary(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Não foi possível carregar os indicadores.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSummary();

    return () => {
      isMounted = false;
    };
  }, []);

  const adminModules = useMemo(() => ([
    {
      id: 1,
      titulo: "Usuários",
      descricao: "Gerenciar contas e permissões de usuários",
      icon: Users,
      stats: summary ? `${summary.totalUsuarios} usuário(s)` : "—",
    },
    {
      id: 2,
      titulo: "Produtos",
      descricao: "CRUD básico de produtos da loja",
      icon: Package,
      stats: summary ? `${summary.totalProdutos} produto(s)` : "—",
    },
    {
      id: 3,
      titulo: "Blog",
      descricao: "Publicações e conteúdo editorial",
      icon: BarChart3,
      stats: summary ? `${summary.totalPosts} post(s)` : "—",
    },
  ]), [summary]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-extrabold text-foreground">
            🛠️ Painel Administrativo
          </h1>
          <p className="text-lg text-muted-foreground">
            Gerencie todas as funcionalidades do portal
          </p>
        </div>

        {isLoading && (
          <div className="mb-6 rounded-lg border border-dashed border-primary/40 bg-muted/30 p-6 text-center text-muted-foreground">
            Carregando informações do painel…
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center text-destructive">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-3">
          {adminModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.id}
                className="group border-2 border-primary/30 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">{module.titulo}</CardTitle>
                  <CardDescription className="text-base">{module.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-bold text-secondary">{module.stats}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-10 border-2 border-border shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl">Dashboard Rápido</CardTitle>
            <CardDescription>Visão geral do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border-2 border-primary/20 bg-muted p-4 text-center">
                <p className="mb-1 text-sm text-muted-foreground">Total de Usuários</p>
                <p className="text-2xl font-bold text-secondary">
                  {summary ? summary.totalUsuarios : "—"}
                </p>
              </div>
              <div className="rounded-lg border-2 border-primary/20 bg-muted p-4 text-center">
                <p className="mb-1 text-sm text-muted-foreground">Produtos Ativos</p>
                <p className="text-2xl font-bold text-secondary">
                  {summary ? summary.totalProdutos : "—"}
                </p>
              </div>
              <div className="rounded-lg border-2 border-primary/20 bg-muted p-4 text-center">
                <p className="mb-1 text-sm text-muted-foreground">Posts Publicados</p>
                <p className="text-2xl font-bold text-secondary">
                  {summary ? summary.totalPosts : "—"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10">
          <ServiceManager />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;

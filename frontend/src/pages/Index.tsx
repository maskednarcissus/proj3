import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Store, BookOpen, Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container relative mx-auto px-6 text-center">
          <h1 className="mb-4 text-5xl font-extrabold tracking-tight md:text-6xl">
            Bem-vindo à Vitrine<span className="text-primary">Sorocabana</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
            Portal principal com acesso aos sites: Loja, Blog e área administrativa.
            Descubra o melhor de Sorocaba em um só lugar!
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="group border-2 border-border shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
              <CardHeader>
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Store className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl font-bold">Loja</CardTitle>
                <CardDescription className="text-base">
                  Explore nosso catálogo de produtos locais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full font-bold shadow-button">
                  <Link to="/loja">Visitar Loja 🛍️</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group border-2 border-border shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
              <CardHeader>
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition-transform duration-300 group-hover:scale-110">
                  <BookOpen className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl font-bold">Blog</CardTitle>
                <CardDescription className="text-base">
                  Notícias e conteúdos sobre Sorocaba
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="secondary" className="w-full font-bold">
                  <Link to="/blog">Ler Artigos 📰</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group border-2 border-border shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover">
              <CardHeader>
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-foreground transition-transform duration-300 group-hover:scale-110">
                  <Settings className="h-7 w-7" />
                </div>
                <CardTitle className="text-2xl font-bold">Admin</CardTitle>
                <CardDescription className="text-base">
                  Painel administrativo do portal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full border-2 font-bold">
                  <Link to="/admin">Acessar Painel 🛠️</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed />

      <Footer />
    </div>
  );
};

export default Index;

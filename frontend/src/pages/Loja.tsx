import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { fetchJson } from "@/lib/api";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl?: string | null;
  estoque?: number | null;
  ativo?: boolean | null;
}

const placeholderImages = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
];

const formatPrice = (value?: number | null) => {
  if (value === undefined || value === null) {
    return "Preço indisponível";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const Loja = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadProdutos = async () => {
      try {
        const data = await fetchJson<Produto[]>("/api/produtos");
        if (isMounted) {
          setProdutos(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Não foi possível carregar os produtos.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProdutos();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderedProdutos = useMemo(() => produtos.map((produto, index) => ({
    ...produto,
    image: produto.imagemUrl && produto.imagemUrl.length > 0
      ? produto.imagemUrl
      : placeholderImages[index % placeholderImages.length],
  })), [produtos]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-extrabold text-foreground">
            🛍️ Catálogo de Produtos
          </h1>
          <p className="text-lg text-muted-foreground">
            Produtos locais e artesanais de Sorocaba
          </p>
        </div>

        {isLoading && (
          <div className="rounded-lg border border-dashed border-primary/40 bg-muted/30 p-6 text-center text-muted-foreground">
            Carregando produtos…
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center text-destructive">
            {error}
          </div>
        )}

        {!isLoading && !error && renderedProdutos.length === 0 && (
          <div className="rounded-lg border border-primary/30 bg-muted/20 p-6 text-center text-muted-foreground">
            Nenhum produto ativo encontrado.
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {renderedProdutos.map((produto, index) => (
            <Card
              key={produto.id}
              className="group overflow-hidden border-2 border-primary/30 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={produto.image}
                  alt={produto.nome}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{produto.nome}</CardTitle>
                <CardDescription>{produto.descricao}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-secondary">{formatPrice(produto.preco)}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <Button className="w-full font-bold shadow-button">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Comprar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Loja;

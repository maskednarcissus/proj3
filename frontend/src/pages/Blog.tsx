import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { fetchJson } from "@/lib/api";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorNome?: string | null;
  dataPublicacao?: string | null;
}

const placeholderImages = [
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
];

const formatDate = (value?: string | null) => {
  if (!value) return "Data não informada";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
};

const stripHtml = (value: string) => value.replace(/<[^>]+>/g, " ");

const getExcerpt = (conteudo: string, length = 200) => {
  const clean = stripHtml(conteudo).replace(/\s+/g, " ").trim();
  if (clean.length <= length) return clean;
  return `${clean.slice(0, length).trim()}…`;
};

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadPosts = async () => {
      try {
        const data = await fetchJson<Post[]>("/api/posts");
        if (isMounted) {
          setPosts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Não foi possível carregar os posts.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderedPosts = useMemo(() => posts.map((post, index) => ({
    ...post,
    image: placeholderImages[index % placeholderImages.length],
    excerpt: getExcerpt(post.conteudo),
    dataFormatada: formatDate(post.dataPublicacao),
  })), [posts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="mb-3 text-4xl font-extrabold text-foreground">
            📰 Blog VitrineSorocabana
          </h1>
          <p className="text-lg text-muted-foreground">
            Notícias, histórias e conteúdos sobre Sorocaba
          </p>
        </div>

        {isLoading && (
          <div className="rounded-lg border border-dashed border-secondary/40 bg-muted/30 p-6 text-center text-muted-foreground">
            Carregando posts do blog…
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center text-destructive">
            {error}
          </div>
        )}

        {!isLoading && !error && renderedPosts.length === 0 && (
          <div className="rounded-lg border border-secondary/30 bg-muted/20 p-6 text-center text-muted-foreground">
            Nenhum post publicado encontrado.
          </div>
        )}

        <div className="space-y-6">
          {renderedPosts.map((post, index) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-2 border-secondary/30 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="aspect-video overflow-hidden md:h-full">
                    <img
                      src={post.image}
                      alt={post.titulo}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <CardHeader>
                    <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {post.dataFormatada}
                    </div>
                    <CardTitle className="text-2xl">{post.titulo}</CardTitle>
                    <CardDescription className="text-base">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <button className="font-bold text-secondary transition-colors hover:text-secondary/80">
                      Ler mais →
                    </button>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;

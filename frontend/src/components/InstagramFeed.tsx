import { Card } from "@/components/ui/card";
import { Instagram } from "lucide-react";

export const InstagramFeed = () => {
  // Mock Instagram posts - em produção, você conectaria à API do Instagram
  const mockPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      likes: 245,
      caption: "Novidades na loja! 🛍️"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=400&fit=crop",
      likes: 189,
      caption: "Produtos locais de Sorocaba ❤️"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=400&fit=crop",
      likes: 312,
      caption: "Confira nosso blog! 📰"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
      likes: 278,
      caption: "Visite nossa loja física! 🏪"
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-3">
            <Instagram className="h-8 w-8 text-secondary" />
            <h2 className="text-3xl font-extrabold text-foreground">
              Siga no Instagram
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Acompanhe as novidades da VitrineSorocabana
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {mockPosts.map((post, index) => (
            <Card 
              key={post.id}
              className="group relative overflow-hidden border-2 border-border shadow-card transition-all duration-300 hover:scale-105 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={post.image}
                  alt={post.caption}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-center text-white">
                  <p className="mb-2 text-xl font-bold">❤️ {post.likes}</p>
                  <p className="px-4 text-sm">{post.caption}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-secondary bg-secondary px-6 py-3 font-bold text-secondary-foreground shadow-button transition-all hover:scale-105 hover:shadow-lg"
          >
            <Instagram className="h-5 w-5" />
            @vitrinesorocabana
          </a>
        </div>
      </div>
    </section>
  );
};

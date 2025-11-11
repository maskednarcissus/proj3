import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-primary bg-secondary shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-6 py-5">
        <Link to="/" className="text-2xl font-extrabold tracking-tight text-secondary-foreground">
          Vitrine<span className="text-primary">Sorocabana</span>
        </Link>
        
        <nav className="flex gap-3">
          <Button asChild variant="default" size="sm" className="font-bold">
            <Link to="/loja">🛍️ Loja</Link>
          </Button>
          <Button asChild variant="default" size="sm" className="font-bold">
            <Link to="/blog">📰 Blog</Link>
          </Button>
          <Button asChild variant="default" size="sm" className="font-bold">
            <Link to="/servicos">🔧 Serviços</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="border-2 border-primary font-bold hover:bg-primary/10">
            <Link to="/admin">🛠️ Admin</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

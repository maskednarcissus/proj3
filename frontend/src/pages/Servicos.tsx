import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useServices } from "@/hooks/useServices";

const Servicos = () => {
  const { services } = useServices();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-foreground md:text-5xl">
            Serviços em <span className="text-primary">Sorocaba</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Encontre os melhores serviços profissionais da região
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card 
              key={service.id}
              className="group cursor-pointer transition-all duration-300 hover:shadow-card-hover"
            >
              <CardHeader>
                <div className="mb-4 text-5xl">{service.icon}</div>
                <div className="mb-2">
                  <Badge variant="secondary">{service.category}</Badge>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <button className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground shadow-button transition-all hover:bg-primary/90">
                  Saiba Mais
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Servicos;

import { useState } from "react";
import { useServices, Service } from "@/hooks/useServices";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";
import { toast } from "sonner";

export const ServiceManager = () => {
  const { services, addService, updateService, deleteService } = useServices();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Omit<Service, 'id'>>({
    title: "",
    description: "",
    category: "",
    icon: "📋",
  });

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      icon: service.icon,
    });
    setIsAdding(false);
  };

  const handleSave = () => {
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (editingId) {
      updateService(editingId, formData);
      toast.success("Serviço atualizado!");
    } else {
      addService(formData);
      toast.success("Serviço adicionado!");
    }

    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Deseja realmente excluir este serviço?")) {
      deleteService(id);
      toast.success("Serviço excluído!");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setIsAdding(false);
    setFormData({
      title: "",
      description: "",
      category: "",
      icon: "📋",
    });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      category: "",
      icon: "📋",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Gerenciar Serviços</h2>
        {!isAdding && !editingId && (
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" /> Adicionar Serviço
          </Button>
        )}
      </div>

      {(isAdding || editingId) && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>{editingId ? "Editar Serviço" : "Novo Serviço"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">Ícone (emoji)</label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="📋"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Título</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Nome do serviço"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Categoria</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Ex: Tecnologia, Marketing, Design"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Descrição</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição do serviço"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" /> Salvar
              </Button>
              <Button onClick={resetForm} variant="outline" className="gap-2">
                <X className="h-4 w-4" /> Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service) => (
          <Card key={service.id} className="transition-all hover:shadow-card-hover">
            <CardHeader>
              <div className="mb-2 flex items-start justify-between">
                <div className="text-4xl">{service.icon}</div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(service)}
                    className="h-8 w-8 p-0"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(service.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Badge variant="secondary" className="mb-2 w-fit">
                {service.category}
              </Badge>
              <CardTitle className="text-xl">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

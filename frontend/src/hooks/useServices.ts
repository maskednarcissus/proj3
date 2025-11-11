import { useState, useEffect } from 'react';

export interface Service {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const defaultServices: Service[] = [
  {
    id: 1,
    title: "Desenvolvimento Web",
    description: "Criação de sites modernos e responsivos para sua empresa",
    category: "Tecnologia",
    icon: "💻",
  },
  {
    id: 2,
    title: "Marketing Digital",
    description: "Estratégias de marketing para impulsionar seu negócio online",
    category: "Marketing",
    icon: "📱",
  },
  {
    id: 3,
    title: "Consultoria Empresarial",
    description: "Assessoria especializada para o crescimento do seu negócio",
    category: "Consultoria",
    icon: "📊",
  },
  {
    id: 4,
    title: "Design Gráfico",
    description: "Criação de identidade visual e materiais gráficos profissionais",
    category: "Design",
    icon: "🎨",
  },
  {
    id: 5,
    title: "Fotografia Profissional",
    description: "Registro profissional de eventos e produtos",
    category: "Mídia",
    icon: "📸",
  },
  {
    id: 6,
    title: "Assessoria Jurídica",
    description: "Orientação jurídica especializada para empresas",
    category: "Jurídico",
    icon: "⚖️",
  },
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>(() => {
    const stored = localStorage.getItem('services');
    return stored ? JSON.parse(stored) : defaultServices;
  });

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const addService = (service: Omit<Service, 'id'>) => {
    const newService = {
      ...service,
      id: Math.max(0, ...services.map(s => s.id)) + 1,
    };
    setServices([...services, newService]);
  };

  const updateService = (id: number, updates: Partial<Service>) => {
    setServices(services.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteService = (id: number) => {
    setServices(services.filter(s => s.id !== id));
  };

  return { services, addService, updateService, deleteService };
};

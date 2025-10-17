import { useState, useEffect } from "react";
import { Calendar, Globe, TrendingUp, Zap } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import EventFilters from "@/components/EventFilters";
import EventCard from "@/components/EventCard";
import MonthlyCalendar from "@/components/MonthlyCalendar";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { type Evento } from "@shared/schema";

interface FilterState {
  search: string;
  categories: string[];
  countries: string[];
  modalidades: string[];
  niveles: string[];
  selectedDate?: Date;
}

export default function Home() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    categories: [],
    countries: [],
    modalidades: [],
    niveles: [],
    selectedDate: undefined
  });

  useEffect(() => {
    fetch('/eventos.json')
      .then(res => res.json())
      .then(data => {
        setEventos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading events:', err);
        setLoading(false);
      });
  }, []);

  const filteredEventos = eventos.filter(evento => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        evento.titulo.toLowerCase().includes(searchLower) ||
        evento.descripcion.toLowerCase().includes(searchLower) ||
        evento.organizador.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    if (filters.modalidades.length > 0) {
      if (!filters.modalidades.includes(evento.modalidad)) return false;
    }

    if (filters.niveles.length > 0) {
      if (!filters.niveles.includes(evento.nivel)) return false;
    }

    if (filters.categories.length > 0) {
      const hasCategory = evento.tags.some(tag => 
        filters.categories.includes(tag)
      );
      if (!hasCategory) return false;
    }

    if (filters.selectedDate) {
      const eventDate = new Date(evento.fecha_inicio);
      const selectedDate = new Date(filters.selectedDate);
      
      if (eventDate.getFullYear() !== selectedDate.getFullYear() ||
          eventDate.getMonth() !== selectedDate.getMonth() ||
          eventDate.getDate() !== selectedDate.getDate()) {
        return false;
      }
    }

    return true;
  });

  const sortedEventos = [...filteredEventos].sort((a, b) => 
    new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime()
  );

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  const upcomingEventos = sortedEventos.filter(e => {
    const eventDate = new Date(e.fecha_inicio);
    return eventDate >= now && 
           eventDate.getMonth() === currentMonth && 
           eventDate.getFullYear() === currentYear;
  }).slice(0, 6);

  const featuredEventData = eventos.find(e => e.destacado === true) || upcomingEventos[0];
  const featuredEvent = featuredEventData ? {
    title: featuredEventData.titulo,
    date: new Date(featuredEventData.fecha_inicio).toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }),
    location: `${featuredEventData.ciudad}, ${featuredEventData.pais}`,
    modalidad: featuredEventData.modalidad,
    enlace: featuredEventData.enlace
  } : undefined;


  const totalEventos = eventos.length;
  const totalPaises = new Set(eventos.map(e => e.pais)).size;
  const proximosEventos = eventos.filter(e => 
    new Date(e.fecha_inicio) >= new Date()
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando eventos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection featuredEvent={featuredEvent} />
      
      <StatsSection stats={[
        { icon: Calendar, label: "Total de Eventos", value: totalEventos, suffix: "" },
        { icon: Globe, label: "Países", value: totalPaises, suffix: "" },
        { icon: TrendingUp, label: "Próximos Eventos", value: proximosEventos, suffix: "" },
        { icon: Zap, label: "Eventos Activos", value: upcomingEventos.length, suffix: "" },
      ]} />

      <div className="max-w-7xl mx-auto px-4 py-20" data-section="events">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Calendario de Eventos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora eventos de ciberseguridad en todo el mundo. Filtra por categoría, país o modalidad.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-20">
          <div className="lg:col-span-1">
            <EventFilters 
              onFilterChange={setFilters} 
              currentFilters={filters}
              eventos={eventos}
            />
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <MonthlyCalendar 
              eventos={eventos} 
              onDateClick={(date) => setFilters({ ...filters, selectedDate: date || undefined })}
            />
            
            <div>
              <h3 className="text-2xl font-bold mb-6">
                Próximos Eventos ({upcomingEventos.length})
              </h3>
              {upcomingEventos.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No hay eventos que coincidan con los filtros seleccionados
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {upcomingEventos.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {upcomingEventos.length > 0 && upcomingEventos[0].modalidad === "Presencial" && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ubicaciones de Eventos</h2>
              <p className="text-muted-foreground">
                Encuentra eventos presenciales cerca de ti
              </p>
            </div>
            <GoogleMapEmbed location={`${upcomingEventos[0].ciudad}, ${upcomingEventos[0].pais}`} />
          </div>
        )}
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
}

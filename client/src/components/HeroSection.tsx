import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@assets/generated_images/Cybersecurity_network_hero_background_f9d961f6.png";

interface HeroSectionProps {
  featuredEvent?: {
    title: string;
    date: string;
    location: string;
    modalidad: string;
    enlace?: string;
  };
}

export default function HeroSection({ featuredEvent }: HeroSectionProps) {
  const scrollToEvents = () => {
    const eventsSection = document.querySelector('[data-section="events"]');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const downloadCalendar = () => {
    window.open('/eventos.json', '_blank');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <Badge 
          className="mb-6 bg-primary/20 text-primary border-primary/30 animate-glow" 
          data-testid="badge-hero-label"
        >
          Eventos de Hacking & Ciberseguridad
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-primary to-magenta-400 bg-clip-text text-transparent animate-fade-in">
          Descubre los Mejores Eventos Tech
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-slide-up">
          Mantente actualizado con conferencias, CTFs, talleres y eventos de seguridad informática 
          en todo el mundo. Tu calendario definitivo de la comunidad hacker.
        </p>

        {featuredEvent && (
          <div className="max-w-2xl mx-auto backdrop-blur-md bg-card/50 border border-primary/20 rounded-xl p-6 md:p-8 mb-8 hover-elevate transition-all duration-300">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-mono text-muted-foreground">Próximo Gran Evento</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-featured-event-title">
              {featuredEvent.title}
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span data-testid="text-featured-event-date">{featuredEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span data-testid="text-featured-event-location">{featuredEvent.location}</span>
              </div>
              <Badge 
                variant="outline" 
                className="border-primary/30 text-primary"
                data-testid="badge-featured-event-modalidad"
              >
                {featuredEvent.modalidad}
              </Badge>
            </div>
            
            <div className="mt-6">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90"
                data-testid="button-register-event"
                asChild={!!featuredEvent?.enlace}
              >
                {featuredEvent?.enlace ? (
                  <a href={featuredEvent.enlace} target="_blank" rel="noopener noreferrer">
                    Ver Detalles
                  </a>
                ) : (
                  <span>Ver Detalles</span>
                )}
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button 
            size="lg" 
            variant="outline" 
            className="backdrop-blur-sm"
            data-testid="button-view-events"
            onClick={scrollToEvents}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Ver Todos los Eventos
          </Button>
          <Button 
            size="lg" 
            variant="ghost"
            data-testid="button-download-calendar"
            onClick={downloadCalendar}
          >
            Descargar Calendario
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </div>
  );
}

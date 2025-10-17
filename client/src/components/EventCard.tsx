import { Calendar, MapPin, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface EventCardProps {
  event: {
    id: string;
    titulo: string;
    descripcion: string;
    fecha_inicio: string;
    hora: string;
    pais: string;
    ciudad: string;
    modalidad: string;
    enlace: string;
    nivel: string;
    tags: string[];
    imagen?: string;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const getModalidadColor = (modalidad: string) => {
    switch (modalidad.toLowerCase()) {
      case 'online': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'presencial': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'híbrido': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const getNivelColor = (nivel: string) => {
    switch (nivel.toLowerCase()) {
      case 'básico': return 'border-cyan-500/30 text-cyan-400';
      case 'intermedio': return 'border-amber-500/30 text-amber-400';
      case 'avanzado': return 'border-magenta-500/30 text-magenta-400';
      default: return 'border-muted/30 text-muted-foreground';
    }
  };

  const handleAddToGoogleCalendar = () => {
    console.log('Adding to Google Calendar:', event.titulo);
  };

  return (
    <Card 
      className="group overflow-hidden hover-elevate transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm border-primary/10"
      data-testid={`card-event-${event.id}`}
    >
      {event.imagen && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img 
            src={event.imagen} 
            alt={event.titulo}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-event-${event.id}`}
          />
        </div>
      )}
      
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge 
            className={getModalidadColor(event.modalidad)}
            data-testid={`badge-modalidad-${event.id}`}
          >
            {event.modalidad}
          </Badge>
          <Badge 
            variant="outline" 
            className={getNivelColor(event.nivel)}
            data-testid={`badge-nivel-${event.id}`}
          >
            {event.nivel}
          </Badge>
          {event.tags.slice(0, 2).map((tag, idx) => (
            <Badge 
              key={idx} 
              variant="outline" 
              className="border-muted/30"
              data-testid={`badge-tag-${event.id}-${idx}`}
            >
              {tag}
            </Badge>
          ))}
        </div>
        
        <h3 className="text-xl font-semibold line-clamp-2" data-testid={`text-event-title-${event.id}`}>
          {event.titulo}
        </h3>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-event-description-${event.id}`}>
          {event.descripcion}
        </p>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-primary">
            <Calendar className="w-4 h-4" />
            <span data-testid={`text-event-date-${event.id}`}>
              {new Date(event.fecha_inicio).toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })} - {event.hora}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span data-testid={`text-event-location-${event.id}`}>
              {event.ciudad}, {event.pais}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 border-t border-border/50">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleAddToGoogleCalendar}
          data-testid={`button-add-calendar-${event.id}`}
        >
          <Plus className="w-4 h-4 mr-1" />
          Añadir a Calendario
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          asChild
          data-testid={`button-event-link-${event.id}`}
        >
          <a href={event.enlace} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

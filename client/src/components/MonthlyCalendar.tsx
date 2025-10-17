import { useState } from "react";
import { ChevronLeft, ChevronRight, X, MapPin, Calendar as CalendarIcon, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { type Evento } from "@shared/schema";

interface MonthlyCalendarProps {
  eventos?: Evento[];
  onDateClick?: (date: Date | undefined) => void;
}

export default function MonthlyCalendar({ eventos = [], onDateClick }: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<Evento[]>([]);

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    closeDetails();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    closeDetails();
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    closeDetails();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();
  };

  const getEventsForDate = (day: number): Evento[] => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return eventos.filter(e => e.fecha_inicio === dateStr);
  };

  const getEventColor = (tags: string[]) => {
    if (tags.includes('CTF')) return 'bg-cyan-500';
    if (tags.includes('Conferencia')) return 'bg-magenta-500';
    if (tags.includes('Taller')) return 'bg-purple-500';
    return 'bg-primary';
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const eventsOnDate = getEventsForDate(day);
    
    if (eventsOnDate.length > 0) {
      setSelectedDate(clickedDate);
      setSelectedEvents(eventsOnDate);
      onDateClick?.(clickedDate);
    }
  };

  const closeDetails = () => {
    setSelectedDate(null);
    setSelectedEvents([]);
    onDateClick?.(undefined);
  };

  const getModalidadColor = (modalidad: string) => {
    switch (modalidad.toLowerCase()) {
      case 'online': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'presencial': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'híbrido': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-muted/20 text-muted-foreground border-muted/30';
    }
  };

  const handleAddToGoogleCalendar = (event: Evento) => {
    const [hours, minutes] = event.hora.split(':').map(Number);
    const startDate = new Date(event.fecha_inicio);
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = event.fecha_fin ? new Date(event.fecha_fin) : new Date(startDate);
    if (!event.fecha_fin) {
      endDate.setHours(hours + 2, minutes, 0, 0);
    } else {
      endDate.setHours(hours, minutes, 0, 0);
    }
    
    const formatDateForGoogle = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.titulo)}&dates=${formatDateForGoogle(startDate)}/${formatDateForGoogle(endDate)}&details=${encodeURIComponent(event.descripcion + '\n\n' + event.enlace)}&location=${encodeURIComponent(event.ciudad + ', ' + event.pais)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const eventsOnDay = getEventsForDate(day);
    const today = isToday(day);
    const hasEvents = eventsOnDay.length > 0;
    const firstEvent = eventsOnDay[0];

    const dayButton = (
      <button
        key={day}
        onClick={() => handleDateClick(day)}
        className={`aspect-square p-2 rounded-lg transition-all relative group ${
          today ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-muted/50'
        } ${hasEvents ? 'cursor-pointer hover-elevate' : 'cursor-default'}`}
        data-testid={`button-calendar-day-${day}`}
      >
        <span className={`text-sm ${today ? 'font-bold text-primary' : 'text-foreground'}`}>
          {day}
        </span>
        {hasEvents && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            {eventsOnDay.slice(0, 3).map((event, idx) => (
              <div 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.tags)}`}
                data-testid={`indicator-event-${day}-${idx}`}
              />
            ))}
          </div>
        )}
      </button>
    );

    if (hasEvents && firstEvent) {
      days.push(
        <TooltipProvider key={day} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              {dayButton}
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs p-0 overflow-hidden">
              <div className="bg-popover">
                {firstEvent.imagen && (
                  <img 
                    src={firstEvent.imagen} 
                    alt={firstEvent.titulo}
                    className="w-full h-24 object-cover"
                  />
                )}
                <div className="p-3">
                  <p className="font-semibold text-sm mb-1">{firstEvent.titulo}</p>
                  <p className="text-xs text-muted-foreground mb-2">{firstEvent.organizador}</p>
                  {eventsOnDay.length > 1 && (
                    <p className="text-xs text-primary">+{eventsOnDay.length - 1} evento{eventsOnDay.length > 2 ? 's' : ''} más</p>
                  )}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    } else {
      days.push(dayButton);
    }
  }

  return (
    <div className={`flex gap-4 transition-all duration-500 ${selectedEvents.length > 0 ? 'flex-row' : 'flex-col'}`}>
      <div className={`bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 p-6 transition-all duration-500 ${
        selectedEvents.length > 0 ? 'w-1/2' : 'w-full'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold" data-testid="text-calendar-month">
            {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousMonth}
              data-testid="button-previous-month"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              data-testid="button-today"
            >
              Hoy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextMonth}
              data-testid="button-next-month"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {days}
        </div>

        <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            <span>CTF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-magenta-500" />
            <span>Conferencia</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500" />
            <span>Taller</span>
          </div>
        </div>
      </div>

      {selectedEvents.length > 0 && selectedDate && (
        <div 
          className="w-1/2 bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 p-6 animate-in slide-in-from-right-4 fade-in-20 duration-500"
          data-testid="event-details-panel"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Eventos del {selectedDate.getDate()} de {selectedDate.toLocaleDateString('es-ES', { month: 'long' })}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeDetails}
              data-testid="button-close-details"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {selectedEvents.map((event) => (
              <div 
                key={event.id}
                className="bg-card/50 rounded-lg border border-border/50 p-4 hover-elevate transition-all"
              >
                {event.imagen && (
                  <img 
                    src={event.imagen} 
                    alt={event.titulo}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                )}
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className={getModalidadColor(event.modalidad)}>
                    {event.modalidad}
                  </Badge>
                  <Badge variant="outline" className="border-muted/30">
                    {event.nivel}
                  </Badge>
                  {event.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="outline" className="border-muted/30">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h4 className="font-semibold text-lg mb-2">{event.titulo}</h4>
                <p className="text-sm text-muted-foreground mb-3">{event.descripcion}</p>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-primary">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {new Date(event.fecha_inicio).toLocaleDateString('es-ES', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })} - {event.hora}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.ciudad}, {event.pais}</span>
                  </div>

                  <div className="text-muted-foreground">
                    <strong>Organizador:</strong> {event.organizador}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleAddToGoogleCalendar(event)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    asChild
                  >
                    <a href={event.enlace} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

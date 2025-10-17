import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarEvent {
  date: string;
  count: number;
  type: 'ctf' | 'conference' | 'workshop';
}

interface MonthlyCalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
}

export default function MonthlyCalendar({ events = [], onDateClick }: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();
  };

  const getEventForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.find(e => e.date === dateStr);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'ctf': return 'bg-cyan-500';
      case 'conference': return 'bg-magenta-500';
      case 'workshop': return 'bg-purple-500';
      default: return 'bg-primary';
    }
  };

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const event = getEventForDate(day);
    const today = isToday(day);

    days.push(
      <button
        key={day}
        onClick={() => {
          const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          console.log('Date clicked:', clickedDate);
          onDateClick?.(clickedDate);
        }}
        className={`aspect-square p-2 rounded-lg transition-all hover-elevate relative group ${
          today ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-muted/50'
        }`}
        data-testid={`button-calendar-day-${day}`}
      >
        <span className={`text-sm ${today ? 'font-bold text-primary' : 'text-foreground'}`}>
          {day}
        </span>
        {event && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            <div 
              className={`w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`}
              data-testid={`indicator-event-${day}`}
            />
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 p-6">
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
  );
}

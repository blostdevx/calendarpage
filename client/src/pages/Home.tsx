import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import EventFilters from "@/components/EventFilters";
import EventCard from "@/components/EventCard";
import MonthlyCalendar from "@/components/MonthlyCalendar";
import GoogleMapEmbed from "@/components/GoogleMapEmbed";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  const featuredEvent = {
    title: "DEF CON 33",
    date: "7-10 Agosto 2025",
    location: "Las Vegas, Nevada",
    modalidad: "Presencial"
  };

  const mockEvents = [
    {
      id: "1",
      titulo: "Ekoparty 2025",
      descripcion: "La conferencia de seguridad informática más importante de América Latina. Talks, talleres y competencias CTF.",
      fecha_inicio: "2025-09-01",
      hora: "09:00",
      pais: "Argentina",
      ciudad: "Buenos Aires",
      modalidad: "Presencial",
      enlace: "https://www.ekoparty.org/",
      nivel: "Intermedio",
      tags: ["Conferencia", "LatAm", "Red Team"],
      imagen: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop"
    },
    {
      id: "2",
      titulo: "BSides Las Vegas 2025",
      descripcion: "Evento comunitario de ciberseguridad con charlas técnicas y networking para profesionales.",
      fecha_inicio: "2025-08-05",
      hora: "10:00",
      pais: "Estados Unidos",
      ciudad: "Las Vegas",
      modalidad: "Presencial",
      enlace: "https://www.bsideslv.org/",
      nivel: "Avanzado",
      tags: ["Conferencia", "Networking"],
      imagen: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=450&fit=crop"
    },
    {
      id: "3",
      titulo: "PicoCTF 2025",
      descripcion: "Competencia CTF gratuita diseñada para estudiantes. Aprende hacking ético mientras compites.",
      fecha_inicio: "2025-10-15",
      hora: "00:00",
      pais: "Global",
      ciudad: "Online",
      modalidad: "Online",
      enlace: "https://picoctf.org/",
      nivel: "Básico",
      tags: ["CTF", "Estudiantes"],
      imagen: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=450&fit=crop"
    }
  ];

  const calendarEvents = [
    { date: "2025-10-15", count: 2, type: 'ctf' as const },
    { date: "2025-10-20", count: 1, type: 'conference' as const },
    { date: "2025-10-25", count: 3, type: 'workshop' as const },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection featuredEvent={featuredEvent} />
      
      <StatsSection />

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Calendario de Eventos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora eventos de ciberseguridad en todo el mundo. Filtra por categoría, país o modalidad.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 mb-20">
          <div className="lg:col-span-1">
            <EventFilters />
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <MonthlyCalendar events={calendarEvents} />
            
            <div>
              <h3 className="text-2xl font-bold mb-6">Próximos Eventos</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {mockEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ubicaciones de Eventos</h2>
            <p className="text-muted-foreground">
              Encuentra eventos presenciales cerca de ti
            </p>
          </div>
          <GoogleMapEmbed location="Las Vegas, Nevada" />
        </div>
      </div>

      <ContactSection />
      <Footer />
    </div>
  );
}

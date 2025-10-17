import EventCard from '../EventCard';

export default function EventCardExample() {
  const event = {
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
  };

  return <EventCard event={event} />;
}

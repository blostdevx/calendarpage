import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // GET todos los eventos
  app.get("/api/eventos", async (req, res) => {
    try {
      const eventos = await storage.getAllEventos();
      
      // Filtros opcionales
      const { modalidad, nivel, pais, search, tag } = req.query;
      
      let filteredEventos = eventos;
      
      if (modalidad && typeof modalidad === 'string') {
        filteredEventos = filteredEventos.filter(e => 
          e.modalidad.toLowerCase() === modalidad.toLowerCase()
        );
      }
      
      if (nivel && typeof nivel === 'string') {
        filteredEventos = filteredEventos.filter(e => 
          e.nivel.toLowerCase() === nivel.toLowerCase()
        );
      }
      
      if (pais && typeof pais === 'string') {
        filteredEventos = filteredEventos.filter(e => 
          e.pais.toLowerCase().includes(pais.toLowerCase())
        );
      }
      
      if (tag && typeof tag === 'string') {
        filteredEventos = filteredEventos.filter(e => 
          e.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
        );
      }
      
      if (search && typeof search === 'string') {
        const searchLower = search.toLowerCase();
        filteredEventos = filteredEventos.filter(e => 
          e.titulo.toLowerCase().includes(searchLower) ||
          e.descripcion.toLowerCase().includes(searchLower) ||
          e.organizador.toLowerCase().includes(searchLower)
        );
      }
      
      res.json(filteredEventos);
    } catch (error) {
      console.error("Error fetching eventos:", error);
      res.status(500).json({ error: "Error al obtener eventos" });
    }
  });

  // GET evento por ID
  app.get("/api/eventos/:id", async (req, res) => {
    try {
      const evento = await storage.getEventoById(req.params.id);
      if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }
      res.json(evento);
    } catch (error) {
      console.error("Error fetching evento:", error);
      res.status(500).json({ error: "Error al obtener evento" });
    }
  });

  // GET generar archivo .ics para Google Calendar
  app.get("/api/eventos/:id/ics", async (req, res) => {
    try {
      const evento = await storage.getEventoById(req.params.id);
      if (!evento) {
        return res.status(404).json({ error: "Evento no encontrado" });
      }

      const startDate = new Date(evento.fecha_inicio);
      const endDate = evento.fecha_fin ? new Date(evento.fecha_fin) : startDate;
      
      const formatDateForICS = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CyberEvents//ES
BEGIN:VEVENT
UID:${evento.id}@cyberevents.com
DTSTAMP:${formatDateForICS(new Date())}
DTSTART:${formatDateForICS(startDate)}
DTEND:${formatDateForICS(endDate)}
SUMMARY:${evento.titulo}
DESCRIPTION:${evento.descripcion}\\n\\nMás info: ${evento.enlace}
LOCATION:${evento.ciudad}, ${evento.pais}
URL:${evento.enlace}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      res.setHeader('Content-Type', 'text/calendar');
      res.setHeader('Content-Disposition', `attachment; filename="${evento.titulo.replace(/[^a-z0-9]/gi, '_')}.ics"`);
      res.send(icsContent);
    } catch (error) {
      console.error("Error generating ICS:", error);
      res.status(500).json({ error: "Error al generar calendario" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

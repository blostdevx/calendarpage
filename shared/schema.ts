import { z } from "zod";

// Schema para eventos de ciberseguridad
export const eventoSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descripcion: z.string(),
  descripcion_larga: z.string().optional(),
  fecha_inicio: z.string(), // ISO date format
  fecha_fin: z.string().optional(),
  hora: z.string(),
  pais: z.string(),
  ciudad: z.string(),
  modalidad: z.enum(["Online", "Presencial", "Híbrido"]),
  enlace: z.string().url(),
  organizador: z.string(),
  imagen: z.string().url().optional(),
  nivel: z.enum(["Básico", "Intermedio", "Avanzado"]),
  tags: z.array(z.string()),
});

export type Evento = z.infer<typeof eventoSchema>;

// Schema para validar el array completo de eventos
export const eventosArraySchema = z.array(eventoSchema);

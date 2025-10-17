import { type Evento } from "@shared/schema";
import { promises as fs } from "fs";
import path from "path";

const EVENTS_FILE = path.join(process.cwd(), "data", "eventos.json");

export interface IStorage {
  getAllEventos(): Promise<Evento[]>;
  getEventoById(id: string): Promise<Evento | undefined>;
}

export class MemStorage implements IStorage {
  private eventos: Evento[] = [];
  private lastModified: number = 0;

  constructor() {
    this.loadEvents();
  }

  private async loadEvents() {
    try {
      await fs.mkdir(path.dirname(EVENTS_FILE), { recursive: true });
      
      const stats = await fs.stat(EVENTS_FILE).catch(() => null);
      
      if (!stats) {
        await fs.writeFile(EVENTS_FILE, JSON.stringify([], null, 2));
        this.eventos = [];
        return;
      }

      if (stats.mtimeMs > this.lastModified) {
        const data = await fs.readFile(EVENTS_FILE, "utf-8");
        this.eventos = JSON.parse(data);
        this.lastModified = stats.mtimeMs;
      }
    } catch (error) {
      console.error("Error loading events:", error);
      this.eventos = [];
    }
  }

  async getAllEventos(): Promise<Evento[]> {
    await this.loadEvents();
    return this.eventos;
  }

  async getEventoById(id: string): Promise<Evento | undefined> {
    await this.loadEvents();
    return this.eventos.find(e => e.id === id);
  }
}

export const storage = new MemStorage();

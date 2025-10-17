import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  categories: string[];
  countries: string[];
  modalidades: string[];
  niveles: string[];
}

export default function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedModalidades, setSelectedModalidades] = useState<string[]>([]);
  const [selectedNiveles, setSelectedNiveles] = useState<string[]>([]);

  const categories = ["CTF", "Conferencia", "Taller", "Webinar", "Hackathon"];
  const modalidades = ["Online", "Presencial", "Híbrido"];
  const niveles = ["Básico", "Intermedio", "Avanzado"];

  const toggleFilter = (value: string, currentFilters: string[], setter: (filters: string[]) => void) => {
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(f => f !== value)
      : [...currentFilters, value];
    setter(newFilters);
    console.log('Filter toggled:', value, newFilters);
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedModalidades([]);
    setSelectedNiveles([]);
    console.log('All filters cleared');
  };

  const hasActiveFilters = search || selectedCategories.length > 0 || 
    selectedModalidades.length > 0 || selectedNiveles.length > 0;

  return (
    <div className="space-y-6 p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar eventos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-background/50"
          data-testid="input-search-events"
        />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Categorías</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant="outline"
                className={`cursor-pointer transition-all hover-elevate ${
                  selectedCategories.includes(category)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-muted/30'
                }`}
                onClick={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                data-testid={`badge-category-${category.toLowerCase()}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Modalidad</h4>
          <div className="flex flex-wrap gap-2">
            {modalidades.map((modalidad) => (
              <Badge
                key={modalidad}
                variant="outline"
                className={`cursor-pointer transition-all hover-elevate ${
                  selectedModalidades.includes(modalidad)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-muted/30'
                }`}
                onClick={() => toggleFilter(modalidad, selectedModalidades, setSelectedModalidades)}
                data-testid={`badge-modalidad-${modalidad.toLowerCase()}`}
              >
                {modalidad}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Nivel</h4>
          <div className="flex flex-wrap gap-2">
            {niveles.map((nivel) => (
              <Badge
                key={nivel}
                variant="outline"
                className={`cursor-pointer transition-all hover-elevate ${
                  selectedNiveles.includes(nivel)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-muted/30'
                }`}
                onClick={() => toggleFilter(nivel, selectedNiveles, setSelectedNiveles)}
                data-testid={`badge-nivel-${nivel.toLowerCase()}`}
              >
                {nivel}
              </Badge>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="w-full"
            data-testid="button-clear-filters"
          >
            <X className="w-4 h-4 mr-2" />
            Limpiar Filtros
          </Button>
        )}
      </div>
    </div>
  );
}

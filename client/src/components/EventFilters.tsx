import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface EventFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
  currentFilters?: FilterState;
}

interface FilterState {
  search: string;
  categories: string[];
  countries: string[];
  modalidades: string[];
  niveles: string[];
  selectedDate?: Date;
}

export default function EventFilters({ onFilterChange, currentFilters }: EventFiltersProps) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedModalidades, setSelectedModalidades] = useState<string[]>([]);
  const [selectedNiveles, setSelectedNiveles] = useState<string[]>([]);

  const categories = ["CTF", "Conferencia", "Taller", "Webinar", "Hackathon"];
  const modalidades = ["Online", "Presencial", "Híbrido"];
  const niveles = ["Básico", "Intermedio", "Avanzado"];

  const toggleCategory = (value: string) => {
    const newFilters = selectedCategories.includes(value)
      ? selectedCategories.filter(f => f !== value)
      : [...selectedCategories, value];
    setSelectedCategories(newFilters);
    
    if (onFilterChange) {
      onFilterChange({
        search,
        categories: newFilters,
        countries: [],
        modalidades: selectedModalidades,
        niveles: selectedNiveles,
        selectedDate: currentFilters?.selectedDate
      });
    }
  };

  const toggleModalidad = (value: string) => {
    const newFilters = selectedModalidades.includes(value)
      ? selectedModalidades.filter(f => f !== value)
      : [...selectedModalidades, value];
    setSelectedModalidades(newFilters);
    
    if (onFilterChange) {
      onFilterChange({
        search,
        categories: selectedCategories,
        countries: [],
        modalidades: newFilters,
        niveles: selectedNiveles,
        selectedDate: currentFilters?.selectedDate
      });
    }
  };

  const toggleNivel = (value: string) => {
    const newFilters = selectedNiveles.includes(value)
      ? selectedNiveles.filter(f => f !== value)
      : [...selectedNiveles, value];
    setSelectedNiveles(newFilters);
    
    if (onFilterChange) {
      onFilterChange({
        search,
        categories: selectedCategories,
        countries: [],
        modalidades: selectedModalidades,
        niveles: newFilters,
        selectedDate: currentFilters?.selectedDate
      });
    }
  };

  const clearAllFilters = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedModalidades([]);
    setSelectedNiveles([]);
    
    if (onFilterChange) {
      onFilterChange({
        search: "",
        categories: [],
        countries: [],
        modalidades: [],
        niveles: [],
        selectedDate: undefined
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (onFilterChange) {
      onFilterChange({
        search: value,
        categories: selectedCategories,
        countries: [],
        modalidades: selectedModalidades,
        niveles: selectedNiveles,
        selectedDate: currentFilters?.selectedDate
      });
    }
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
          onChange={(e) => handleSearchChange(e.target.value)}
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
                onClick={() => toggleCategory(category)}
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
                onClick={() => toggleModalidad(modalidad)}
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
                onClick={() => toggleNivel(nivel)}
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

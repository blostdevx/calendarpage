import EventFilters from '../EventFilters';

export default function EventFiltersExample() {
  return <EventFilters onFilterChange={(filters) => console.log('Filters changed:', filters)} />;
}

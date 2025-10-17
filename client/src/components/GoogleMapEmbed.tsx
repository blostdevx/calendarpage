interface GoogleMapEmbedProps {
  location: string;
  className?: string;
}

export default function GoogleMapEmbed({ location, className = "" }: GoogleMapEmbedProps) {
  const encodedLocation = encodeURIComponent(location);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodedLocation}`;

  return (
    <div className={`rounded-2xl overflow-hidden ${className}`}>
      <div className="aspect-video bg-muted flex items-center justify-center border border-primary/10">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Mapa de Ubicación</p>
          <p className="text-xs text-muted-foreground font-mono" data-testid="text-map-location">
            {location}
          </p>
        </div>
      </div>
    </div>
  );
}

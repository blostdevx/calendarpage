import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  const featuredEvent = {
    title: "DEF CON 33",
    date: "7-10 Agosto 2025",
    location: "Las Vegas, NV",
    modalidad: "Presencial"
  };

  return <HeroSection featuredEvent={featuredEvent} />;
}

import { useEffect, useState } from "react";
import { Calendar, Globe, TrendingUp, Zap } from "lucide-react";

interface Stat {
  icon: typeof Calendar;
  label: string;
  value: number;
  suffix?: string;
}

interface StatsSectionProps {
  stats?: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const defaultStats: Stat[] = stats || [
    { icon: Calendar, label: "Total de Eventos", value: 150, suffix: "+" },
    { icon: Globe, label: "Países", value: 45, suffix: "" },
    { icon: TrendingUp, label: "Próximos Eventos", value: 28, suffix: "" },
    { icon: Zap, label: "Eventos Activos", value: 12, suffix: "" },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {defaultStats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [stat.value]);

  return (
    <div 
      className="bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 p-6 hover-elevate transition-all"
      style={{ animationDelay: `${index * 0.1}s` }}
      data-testid={`card-stat-${index}`}
    >
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-primary" />
        <div className={index === 3 ? "w-2 h-2 rounded-full bg-green-500 animate-pulse" : ""} />
      </div>
      
      <div className="text-3xl md:text-4xl font-bold mb-2 animate-count-up" data-testid={`text-stat-value-${index}`}>
        {count}
        <span className="text-primary">{stat.suffix}</span>
      </div>
      
      <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
        {stat.label}
      </div>
    </div>
  );
}

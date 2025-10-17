import { SiX, SiLinkedin, SiGithub, SiDiscord } from "react-icons/si";
import { Shield } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: SiX, href: "#", label: "Twitter" },
    { icon: SiLinkedin, href: "#", label: "LinkedIn" },
    { icon: SiGithub, href: "#", label: "GitHub" },
    { icon: SiDiscord, href: "#", label: "Discord" },
  ];

  const eventLogos = [
    { name: "DEF CON", url: "#" },
    { name: "Black Hat", url: "#" },
    { name: "Ekoparty", url: "#" },
    { name: "BSides", url: "#" },
  ];

  return (
    <footer className="bg-slate-950 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold">CyberEvents</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tu calendario definitivo de eventos de hacking y ciberseguridad a nivel mundial.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="link-footer-inicio">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="link-footer-eventos">
                  Eventos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors" data-testid="link-footer-contacto">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Síguenos</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all hover-elevate"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-primary/10">
          <h4 className="text-sm font-semibold mb-4 text-center text-muted-foreground">
            Eventos Destacados
          </h4>
          <div className="flex flex-wrap justify-center gap-6">
            {eventLogos.map((logo) => (
              <a
                key={logo.name}
                href={logo.url}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-mono"
                data-testid={`link-event-${logo.name.toLowerCase().replace(' ', '-')}`}
              >
                {logo.name}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">
            © 2025 CyberEvents. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-2">
            Hecho con
            <span className="text-primary">❤️</span>
            por la comunidad hacker
          </p>
        </div>
      </div>
    </footer>
  );
}

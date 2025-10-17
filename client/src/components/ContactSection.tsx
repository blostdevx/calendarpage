import { useState } from "react";
import { Mail, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "¡Mensaje enviado!",
      description: `Gracias ${formData.name}, nos pondremos en contacto contigo pronto.`,
    });
    
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="py-20 bg-gradient-to-b from-background/50 to-background" data-section="contact">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes un evento que quieres agregar? ¿Necesitas ayuda? Estamos aquí para ti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 p-6 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Teléfono</h3>
                  <p className="text-muted-foreground" data-testid="text-contact-phone">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 p-6 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground" data-testid="text-contact-email">
                    contact@cyberevents.com
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-primary/10 p-6 hover-elevate">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Horario de Atención</h3>
                  <p className="text-muted-foreground" data-testid="text-contact-hours">
                    Lun - Vie: 9:00 AM - 6:00 PM (UTC)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Tu nombre"
                className="bg-background/50"
                data-testid="input-contact-name"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tu@email.com"
                className="bg-background/50"
                data-testid="input-contact-email"
              />
            </div>

            <div>
              <Label htmlFor="message">Mensaje</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="¿En qué podemos ayudarte?"
                rows={5}
                className="bg-background/50 resize-none"
                data-testid="input-contact-message"
              />
            </div>

            <Button type="submit" className="w-full" data-testid="button-submit-contact">
              <Send className="w-4 h-4 mr-2" />
              Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

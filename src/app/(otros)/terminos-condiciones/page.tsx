"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText,
  Shield,
  CreditCard,
  Scale,
  Mail,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";

export default function TerminosPage() {
  const sections = [
    {
      id: "introduccion",
      title: "1. Introducción y Definiciones",
      icon: FileText,
    },
    { id: "aceptacion", title: "2. Aceptación de los Términos", icon: Users },
    { id: "registro", title: "3. Registro y Creación de Cuenta", icon: Users },
    { id: "privacidad", title: "4. Políticas de Privacidad", icon: Shield },
    { id: "pagos", title: "5. Pagos, Precios y Facturación", icon: CreditCard },
    { id: "legislacion", title: "6. Legislación Aplicable", icon: Scale },
    { id: "modificaciones", title: "7. Modificaciones", icon: Calendar },
    { id: "contacto", title: "8. Contacto", icon: Mail },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary text-balance">
                Términos y Condiciones
              </h1>
              <p className="text-muted-foreground mt-1">
                Doctor Recetas - Última actualización: Febrero 2025
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-lg">Navegación</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px]">
                  <nav className="space-y-1 p-4">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className="w-full flex items-center gap-3 p-3 text-left rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-accent-foreground" />
                          <span className="text-sm font-medium">
                            {section.title}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg leading-relaxed text-pretty">
                      Bienvenido a{" "}
                      <strong className="text-primary">Doctor Recetas</strong>,
                      una plataforma digital diseñada para ofrecer herramientas
                      y recursos en línea dirigidos a pacientes que buscan
                      optimizar sus procesos médicos y potenciar su salud
                      digital.
                    </p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      Antes de utilizar nuestros servicios, es fundamental que
                      leas detenidamente estos términos y condiciones. Si en
                      algún momento no estás de acuerdo con estos términos, te
                      recomendamos que no continúes utilizando nuestros
                      servicios.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 1: Introducción y Definiciones */}
            <section id="introduccion">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <FileText className="h-5 w-5" />
                    1. Introducción y Definiciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-relaxed">
                    Para una mejor comprensión de estos términos, es importante
                    definir ciertos conceptos clave:
                  </p>

                  <div className="grid gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        Plataforma
                      </h4>
                      <p className="text-sm leading-relaxed">
                        Hace referencia a Doctor Recetas, incluyendo su sitio
                        web y cualquier otra aplicación o canal digital que
                        utilicemos para prestar nuestros servicios.
                      </p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        Usuario
                      </h4>
                      <p className="text-sm leading-relaxed">
                        Persona natural que accede a la plataforma, ya sea para
                        explorar, registrarse, adquirir servicios médicos o
                        hacer uso de cualquier otro servicio ofrecido.
                      </p>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        Servicios
                      </h4>
                      <p className="text-sm leading-relaxed">
                        Se refiere a las consultas médicas, recetas digitales y
                        recursos disponibles en Doctor Recetas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 2: Aceptación */}
            <section id="aceptacion">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Users className="h-5 w-5" />
                    2. Aceptación de los Términos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-relaxed">
                    El uso de Doctor Recetas implica la aceptación plena de
                    estos términos y condiciones. Si no estás de acuerdo con
                    alguna de las cláusulas aquí establecidas, debes abstenerte
                    de utilizar nuestros servicios.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 8: Contacto */}
            <section id="contacto">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Mail className="h-5 w-5" />
                    8. Contacto
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed mb-4">
                    Si tienes alguna duda sobre estos términos y condiciones o
                    sobre nuestras políticas de privacidad, puedes comunicarte
                    con nosotros a través de:
                  </p>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        contacto@doctorrecetas.com
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

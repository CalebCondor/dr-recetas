"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Shield,
  Scale,
  Mail,
  Calendar,
  Users,
  AlertCircle,
  Stethoscope,
  Lock,
  UserCheck,
  Smartphone,
  Info,
} from "lucide-react";

export default function PrivacidadPage() {
  const sections = [
    {
      id: "practicas-salud",
      title: "1. Prácticas de Salud",
      icon: Stethoscope,
    },
    {
      id: "uso-divulgacion",
      title: "2. Uso y Divulgación",
      icon: FileText,
    },
    {
      id: "responsabilidades",
      title: "3. Responsabilidades",
      icon: UserCheck,
    },
    { id: "derechos", title: "4. Derechos Federales", icon: Scale },
    {
      id: "portal-electronico",
      title: "5. Portal Doctor Recetas",
      icon: Smartphone,
    },
    { id: "hippa", title: "6. HIPAA", icon: Shield },
    { id: "menores", title: "7. Menores de Edad", icon: Users },
    { id: "recoleccion", title: "8. Información Recopilada", icon: Info },
    { id: "uso-personal", title: "9. Uso de Información", icon: Lock },
    { id: "divulgacion-dr", title: "10. Divulgación", icon: Mail },
    { id: "tecnologia", title: "11. Cookies y Tecnología", icon: Calendar },
    { id: "seguridad", title: "12. Seguridad", icon: Shield },
    { id: "reclamaciones", title: "13. Reclamaciones", icon: AlertCircle },
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
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-primary text-balance">
                Políticas de Privacidad
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
                <CardTitle className="text-lg">Contenido</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
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
                          <span className="text-xs font-medium">
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
            <Card className="border-l-4 border-l-primary bg-primary/5">
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed text-pretty font-medium text-primary">
                  Este aviso describe cómo se puede usar y divulgar su
                  información médica y cómo usted puede obtener acceso a esta
                  información. Por favor revise este documento cuidadosamente.
                </p>
              </CardContent>
            </Card>

            {/* Section 1: Prácticas de Salud */}
            <section id="practicas-salud">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Stethoscope className="h-5 w-5" />
                    1. Aviso de Prácticas de Privacidad de Información de Salud
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-relaxed">
                    En Doctor Recetas, reconocemos que su información es privada
                    y personal. Debido a esto, nos esforzamos por mantener la
                    confidencialidad de su información de salud. Continuamente
                    buscamos salvaguardar esta información a través de medios
                    administrativos, físicos y tecnológicos, cumpliendo con las
                    leyes estatales y federales aplicables.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 2: Uso y Divulgación */}
            <section id="uso-divulgacion">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <FileText className="h-5 w-5" />
                    2. ¿Cómo usamos y divulgamos la información de salud?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p>
                    Utilizamos y divulgamos su información de salud para las
                    actividades comerciales normales que la ley reconoce como
                    tratamiento, pago y operaciones de servicios médicos:
                  </p>
                  <div className="grid gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        Tratamiento
                      </h4>
                      <p className="text-sm leading-relaxed">
                        Mantenemos los expedientes médicos con la información
                        provista por el paciente. Podemos divulgar esta
                        información para que otros médicos, enfermeras y
                        entidades puedan atenderle satisfactoriamente.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">Pago</h4>
                      <p className="text-sm leading-relaxed">
                        Documentamos los servicios para que usted o su plan
                        médico cumplan con el pago. Podemos compartir
                        información con su plan médico para pre-autorizaciones.
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold text-primary mb-2">
                        Servicios de Salud
                      </h4>
                      <p className="text-sm leading-relaxed">
                        Mejoramos nuestros servicios, capacitamos personal y
                        evaluamos el desempeño de proveedores que utilizan la
                        plataforma de Doctor Recetas.
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">
                      Otros usos permitidos:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Cumplir con leyes federales, estatales o locales.</li>
                      <li>
                        Estudios de salud pública y monitoreo de enfermedades.
                      </li>
                      <li>Proteger víctimas de abuso o negligencia.</li>
                      <li>Investigaciones sobre fraude.</li>
                      <li>Órdenes judiciales y procesos legales.</li>
                      <li>Seguridad nacional y servicios de protección.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 3: Responsabilidades */}
            <section id="responsabilidades">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <UserCheck className="h-5 w-5" />
                    3. Responsabilidades del Proveedor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>Estamos obligados por ley a:</p>
                  <ul className="space-y-2">
                    {[
                      "Mantener la privacidad de su información de salud.",
                      "Proporcionar esta notificación de obligaciones y prácticas.",
                      "Cumplir con los términos de la notificación vigente.",
                      "Informarle si su información ha sido comprometida.",
                    ].map((text, i) => (
                      <li key={i} className="flex gap-3 items-center text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {text}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Section 4: Derechos */}
            <section id="derechos">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Scale className="h-5 w-5" />
                    4. ¿Tiene algún derecho federal?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm">
                        <strong>Enmiendas:</strong> Solicitar corrección de
                        información incorrecta o incompleta.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm">
                        <strong>Historial de divulgaciones:</strong> Recibir
                        información sobre divulgaciones de los últimos 6 años.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm">
                        <strong>Comunicación específica:</strong> Solicitar ser
                        contactado a números o direcciones específicas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 5: Portal Electrónico */}
            <section id="portal-electronico">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Smartphone className="h-5 w-5" />
                    5. Políticas del Portal Doctor Recetas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="leading-relaxed">
                    Doctor Recetas opera en www.doctorrecetas.com y utiliza
                    aplicaciones como WhatsApp y FaceTime para ofrecer servicios
                    de telemedicina a través de proveedores afiliados. Al usar
                    el portal, usted consiente el manejo de su información según
                    estas políticas.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 6: HIPAA */}
            <section id="hippa">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Shield className="h-5 w-5" />
                    6. Ley HIPAA
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">
                    Nuestra política de privacidad cumple con el Health
                    Insurance Portability and Accountability Act (“Ley HIPAA”).
                    Mantendremos la privacidad de su información personal según
                    requiere la mencionada ley y su reglamento.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 7: Menores */}
            <section id="menores">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Users className="h-5 w-5" />
                    7. Menores de Edad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">
                    Para registrarse en Doctor Recetas y crear una cuenta, usted
                    debe ser mayor de 18 años.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 8: Recolección */}
            <section id="recoleccion">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Info className="h-5 w-5" />
                    8. Información Recopilada
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3 text-sm">
                    <li>
                      <strong>Datos de registro:</strong> Nombre, correo,
                      usuario y contraseña.
                    </li>
                    <li>
                      <strong>Información de salud:</strong> Expedientes,
                      historial, imágenes y resultados provistos por usted.
                    </li>
                    <li>
                      <strong>Notas médicas:</strong> Expedientes preparados por
                      el proveedor de servicios.
                    </li>
                    <li>
                      <strong>Métodos de pago:</strong> Información financiera
                      para transacciones.
                    </li>
                    <li>
                      <strong>Datos técnicos:</strong> Tipo de buscador, ip
                      address y equipo utilizado.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Section 9: Uso Personal */}
            <section id="uso-personal">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Lock className="h-5 w-5" />
                    9. Uso de su Información Personal
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    "Ofrecer servicios y control de calidad.",
                    "Estadísticas de uso del portal.",
                    "Notificar actualizaciones.",
                    "Fines de mercadeo (con autorización).",
                    "Cumplir con el propósito por el cual proveyó la información.",
                  ].map((text, i) => (
                    <div key={i} className="flex gap-2 items-start py-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <span className="text-sm">{text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Section 11: Tecnología */}
            <section id="tecnologia">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Calendar className="h-5 w-5" />
                    11. Información recopilada tecnológicamente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">
                    Al usar Doctor Recetas, cierta información puede ser
                    almacenada en “Cookies” y datos de navegación (URL’s). Los
                    “Cookies” son pequeños archivos de datos que un portal envia
                    a su buscador.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>Recopilamos actividad en el portal e IP address.</li>
                    <li>
                      Utilizamos cookies para facilitar el uso del portal.
                    </li>
                    <li>
                      Usted puede configurar su buscador para no aceptar
                      cookies, pero esto podría limitar su uso del sitio.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Section 14: Modificación */}
            <section id="modificacion">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <FileText className="h-5 w-5" />
                    14. Modificación de la Información
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-sm">
                    Usted puede modificar o solicitar que se elimine cualquier
                    información personal enviando un correo electrónico a
                    Servicio al Cliente. Legalmente se nos requiere mantener
                    cierta información por un período de tiempo antes de su
                    eliminación definitiva.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 12: Seguridad */}
            <section id="seguridad">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <Shield className="h-5 w-5" />
                    12. Seguridad de la Información
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">
                    Doctor Recetas emplea estrictos métodos de seguridad para
                    salvaguardar su privacidad. No obstante, ninguna transmisión
                    por internet es 100% segura. Usted transmite su información
                    bajo su propio riesgo y responsabilidad.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 13: Reclamaciones */}
            <section id="reclamaciones">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-primary">
                    <AlertCircle className="h-5 w-5" />
                    13. Reclamaciones
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">
                    Usted puede presentar una reclamación por violación a las
                    políticas de privacidad enviando un correo electrónico o
                    llamando a Servicio al Cliente.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Call to Action */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  ¿Necesita más información?
                </h3>
                <p className="text-muted-foreground mb-6 text-pretty">
                  Nuestro equipo está disponible para aclarar cualquier duda
                  sobre el manejo de su información.
                </p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Mail className="h-4 w-4 mr-2" />
                  Contactar Soporte
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

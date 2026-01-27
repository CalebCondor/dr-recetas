"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  CheckCircle2,
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
    { id: "tecnologia", title: "10. Cookies y Tecnología", icon: Calendar },
    { id: "seguridad", title: "11. Seguridad", icon: Shield },
    { id: "reclamaciones", title: "12. Reclamaciones", icon: AlertCircle },
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
    <div className="min-h-screen bg-[#FDFDFD] pt-20 relative isolate overflow-hidden scroll-smooth">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-[#0D4B4D]/5 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2 will-change-transform" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-[#0D4B4D]/5 blur-[60px] rounded-full -translate-x-1/2 translate-y-1/2 will-change-transform" />

      {/* Header */}
      <header className="border-b border-[#0D4B4D]/10 bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-linear-to-br from-[#0D4B4D] to-[#126467] rounded-2xl shadow-lg shadow-[#0D4B4D]/20 transform rotate-3">
              <Shield className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-[#0D4B4D] tracking-tight text-balance leading-none">
                Políticas de Privacidad
              </h1>
              <p className="text-[#0D4B4D]/50 mt-2 font-bold uppercase tracking-widest text-[10px]">
                Doctor Recetas • Última actualización: Febrero 2025
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-40 border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5 rounded-3xl overflow-hidden">
              <CardHeader className="bg-[#0D4B4D]/5 border-b border-[#0D4B4D]/5">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0D4B4D]">
                  Contenido
                </CardTitle>
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
                          className="w-full flex items-center gap-3 p-3 text-left rounded-xl hover:bg-[#0D4B4D] hover:text-white transition-all duration-300 group relative overflow-hidden"
                        >
                          <Icon className="h-4 w-4 text-[#0D4B4D]/60 group-hover:text-white transition-colors z-10" />
                          <span className="text-[11px] font-bold tracking-tight z-10">
                            {section.title}
                          </span>
                          <div className="absolute inset-0 bg-linear-to-r from-[#0D4B4D] to-[#126467] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-0 duration-300" />
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
            <Card className="border-l-4 border-l-[#0D4B4D] bg-[#0D4B4D]/5 shadow-xl shadow-[#0D4B4D]/5 overflow-hidden">
              <CardContent className="p-8">
                <p className="text-lg leading-relaxed text-pretty font-semibold text-[#0D4B4D]">
                  Este aviso describe cómo se puede usar y divulgar su
                  información médica y cómo usted puede obtener acceso a esta
                  información. Por favor revise este documento cuidadosamente.
                </p>
              </CardContent>
            </Card>

            {/* Section 1: Prácticas de Salud */}
            <section id="practicas-salud">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Stethoscope className="h-6 w-6" />
                    1. Aviso de Prácticas de Privacidad de Información de Salud
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 leading-relaxed text-[#0D4B4D]/80 p-8">
                  <p>
                    En{" "}
                    <strong className="text-[#0D4B4D]">Doctor Recetas</strong>,
                    reconocemos que su información es privada y personal. Debido
                    a esto, nos esforzamos por mantener la confidencialidad de
                    su información de salud. Continuamente buscamos salvaguardar
                    esta información a través de medios administrativos, físicos
                    y tecnológicos, cumpliendo con las leyes estatales y
                    federales aplicables.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 2: Uso y Divulgación */}
            <section id="uso-divulgacion">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <FileText className="h-6 w-6" />
                    2. ¿Cómo usamos y divulgamos la información de salud?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 leading-relaxed text-[#0D4B4D]/80 p-8">
                  <p>
                    Utilizamos y divulgamos su información de salud para las
                    actividades comerciales normales que la ley reconoce como
                    <strong className="text-[#0D4B4D]">
                      {" "}
                      tratamiento, pago y operaciones de servicios médicos
                    </strong>
                    :
                  </p>
                  <div className="grid gap-4">
                    {[
                      {
                        t: "Tratamiento",
                        d: "Mantenemos los expedientes médicos con la información provista por el paciente. Podemos divulgar esta información para que otros médicos, enfermeras y entidades puedan atenderle satisfactoriamente.",
                      },
                      {
                        t: "Pago",
                        d: "Documentamos los servicios para que usted o su plan médico cumplan con el pago. Podemos compartir información con su plan médico para pre-autorizaciones.",
                      },
                      {
                        t: "Servicios de Salud",
                        d: "Mejoramos nuestros servicios, capacitamos personal y evaluamos el desempeño de proveedores que utilizan la plataforma de Doctor Recetas.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 bg-[#0D4B4D]/5 border border-[#0D4B4D]/10 rounded-2xl relative overflow-hidden group"
                      >
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#0D4B4D] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h4 className="font-black text-[#0D4B4D] mb-2 uppercase tracking-tight text-xs">
                          {item.t}
                        </h4>
                        <p className="text-sm leading-relaxed text-[#0D4B4D]/70 font-medium">
                          {item.d}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="bg-[#0D4B4D]/10" />

                  <div className="bg-[#0D4B4D]/5 p-6 rounded-2xl border border-[#0D4B4D]/10">
                    <h4 className="font-black text-xs uppercase tracking-widest text-[#0D4B4D] mb-4">
                      Otros usos permitidos:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {[
                        "Cumplir con leyes federales, estatales o locales.",
                        "Salud pública y monitoreo.",
                        "Proteger víctimas de abuso.",
                        "Investigaciones sobre fraude.",
                        "Órdenes judiciales.",
                        "Seguridad nacional.",
                      ].map((text, i) => (
                        <li
                          key={i}
                          className="flex gap-2 items-center text-[13px] font-bold text-[#0D4B4D]/60"
                        >
                          <CheckCircle2 className="h-3.3 w-3.3 text-[#0D4B4D] shrink-0" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 3: Responsabilidades */}
            <section id="responsabilidades">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <UserCheck className="h-6 w-6" />
                    3. Responsabilidades del Proveedor
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-[#0D4B4D]/80 p-8">
                  <p className="font-medium">Estamos obligados por ley a:</p>
                  <div className="grid gap-3">
                    {[
                      "Mantener la privacidad de su información de salud.",
                      "Proporcionar esta notificación de obligaciones y prácticas.",
                      "Cumplir con los términos de la notificación vigente.",
                      "Informarle si su información ha sido comprometida.",
                    ].map((text, i) => (
                      <div
                        key={i}
                        className="flex gap-3 items-center p-3 rounded-xl bg-[#0D4B4D]/5 border border-[#0D4B4D]/5 text-[13px] font-bold"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#0D4B4D]" />
                        {text}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 4: Derechos */}
            <section id="derechos">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Scale className="h-6 w-6" />
                    4. Derechos Federales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-[#0D4B4D]/80 p-8">
                  <div className="grid gap-4">
                    {[
                      {
                        l: "Enmiendas",
                        v: "Solicitar corrección de información incorrecta o incompleta.",
                      },
                      {
                        l: "Historial",
                        v: "Recibir información sobre divulgaciones de los últimos 6 años.",
                      },
                      {
                        l: "Comunicación",
                        v: "Solicitar ser contactado a números o direcciones específicas.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl border border-[#0D4B4D]/10 bg-[#0D4B4D]/5"
                      >
                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#0D4B4D]/50 mb-1">
                          {item.l}
                        </span>
                        <p className="text-sm font-bold text-[#0D4B4D]">
                          {item.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 5: Portal Electrónico */}
            <section id="portal-electronico">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Smartphone className="h-6 w-6" />
                    5. Políticas del Portal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80 font-medium">
                    Doctor Recetas opera en{" "}
                    <strong className="text-[#0D4B4D]">
                      www.doctorrecetas.com
                    </strong>{" "}
                    y utiliza aplicaciones como WhatsApp y FaceTime para ofrecer
                    servicios de telemedicina a través de proveedores afiliados.
                    Al usar el portal, usted consiente el manejo de su
                    información según estas políticas.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 6: HIPAA */}
            <section id="hippa">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Shield className="h-6 w-6" />
                    6. Ley HIPAA
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80 text-sm font-bold">
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
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Users className="h-6 w-6" />
                    7. Menores de Edad
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80 font-black">
                    Para registrarse en Doctor Recetas y crear una cuenta, usted
                    debe ser mayor de 18 años.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Section 8: Recolección */}
            <section id="recoleccion">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Info className="h-6 w-6" />
                    8. Información Recopilada
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <div className="grid gap-3">
                    {[
                      {
                        l: "Registro",
                        v: "Nombre, correo, usuario y contraseña.",
                      },
                      {
                        l: "Salud",
                        v: "Expedientes, historial, imágenes y resultados provistos por usted.",
                      },
                      {
                        l: "Médica",
                        v: "Expedientes preparados por el proveedor de servicios.",
                      },
                      {
                        l: "Financiera",
                        v: "Información para transacciones y pagos.",
                      },
                      {
                        l: "Técnica",
                        v: "Tipo de buscador, IP address y equipo utilizado.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex gap-4 p-4 rounded-xl bg-[#0D4B4D]/5 border border-[#0D4B4D]/10"
                      >
                        <div className="h-8 w-8 rounded-lg bg-[#0D4B4D]/10 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-4 w-4 text-[#0D4B4D]" />
                        </div>
                        <div>
                          <span className="block text-[10px] font-black uppercase tracking-widest text-[#0D4B4D]/50 mb-1">
                            {item.l}
                          </span>
                          <span className="text-sm font-bold text-[#0D4B4D]">
                            {item.v}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 9: Uso Personal */}
            <section id="uso-personal">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Lock className="h-6 w-6" />
                    9. Uso de Información
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  {[
                    "Ofrecer servicios y control de calidad.",
                    "Estadísticas de uso del portal.",
                    "Notificar actualizaciones.",
                    "Fines de mercadeo (con autorización).",
                    "Cumplir con el propósito del registro.",
                  ].map((text, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-center text-sm font-bold text-[#0D4B4D]"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-[#0D4B4D]" />
                      {text}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Section 11: Tecnología */}
            <section id="tecnologia">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Calendar className="h-6 w-6" />
                    10. Cookies y Tecnología
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6 text-[#0D4B4D]/80">
                  <p className="text-sm font-medium leading-relaxed">
                    Al usar Doctor Recetas, cierta información puede ser
                    almacenada en “Cookies” y datos de navegación (URL’s). Los
                    “Cookies” son pequeños archivos de datos que un portal envía
                    a su buscador.
                  </p>
                  <div className="bg-[#0D4B4D]/5 p-6 rounded-2xl border border-[#0D4B4D]/10 space-y-3">
                    {[
                      "Recopilamos actividad en el portal e IP address.",
                      "Utilizamos cookies para facilitar el uso del portal.",
                      "Usted puede configurar su buscador para no aceptar cookies.",
                    ].map((t, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-[13px] font-bold list-none"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#0D4B4D] shrink-0 mt-0.5" />
                        {t}
                      </li>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Section 12: Seguridad */}
            <section id="seguridad">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Shield className="h-6 w-6" />
                    11. Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80 text-sm font-medium">
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
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <AlertCircle className="h-6 w-6" />
                    12. Reclamaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <div className="flex gap-4 p-5 rounded-2xl border border-[#0D4B4D]/10 bg-[#0D4B4D]/5">
                    <Mail className="h-6 w-6 text-[#0D4B4D] shrink-0" />
                    <p className="text-sm font-bold text-[#0D4B4D]">
                      Usted puede presentar una reclamación por violación a las
                      políticas de privacidad enviando un correo electrónico o
                      llamando a Servicio al Cliente.
                    </p>
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

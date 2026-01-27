"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Shield,
  CreditCard,
  Scale,
  Calendar,
  Users,
  AlertCircle,
  Phone,
  Info,
  Lock,
  MessageSquare,
  Globe,
  CheckCircle2,
  Heart,
} from "lucide-react";

export default function TerminosPage() {
  const sections = [
    { id: "introduccion", title: "1. Introducción", icon: FileText },
    { id: "emergencias", title: "2. Emergencias", icon: AlertCircle },
    { id: "independencia", title: "3. Independencia Profesional", icon: Users },
    {
      id: "consentimiento",
      title: "4. Consentimiento Informado",
      icon: CheckCircle2,
    },
    { id: "riesgos", title: "5. Riesgos y Beneficios", icon: AlertCircle },
    { id: "privacidad", title: "6. Privacidad", icon: Shield },
    { id: "cuenta", title: "7. Cuenta de Usuario", icon: Lock },
    { id: "comunicaciones", title: "8. Comunicaciones", icon: MessageSquare },
    { id: "pagos", title: "9. Cargos y Pagos", icon: CreditCard },
    { id: "planes", title: "10. Planes Médicos", icon: Heart },
    { id: "propiedad", title: "11. Propiedad Intelectual", icon: Globe },
    {
      id: "cancelacion",
      title: "12. Cancelación y Modificación",
      icon: Calendar,
    },
    { id: "garantias", title: "13. Garantías y Límites", icon: Scale },
    { id: "otros", title: "14. Otros Asuntos", icon: Info },
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
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-[#0D4B4D] tracking-tight text-balance leading-none">
                Términos y Condiciones
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
                  Navegación
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
            {/* 1. Introducción */}
            <section id="introduccion">
              <Card className="border-l-4 border-l-[#0D4B4D] bg-[#0D4B4D]/5 shadow-xl shadow-[#0D4B4D]/5 overflow-hidden">
                <CardContent className="p-8 space-y-4">
                  <p className="text-lg leading-relaxed text-[#0D4B4D]/90">
                    <strong className="text-[#0D4B4D] font-black underline decoration-[#0D4B4D]/20">
                      Doctor Recetas
                    </strong>{" "}
                    es una corporación de responsabilidad limitada debidamente
                    registrada bajo las leyes del Estado Libre Asociado de
                    Puerto Rico, la cual ofrece una plataforma de telemedicina
                    para la utilización de proveedores debidamente licenciados
                    bajos las Leyes y Reglamentos del Estado Libre Asociado de
                    Puerto Rico. Ofrecemos servicios de telemedicina en línea
                    (“servicios”) facilitando a nuestros miembros suscriptores
                    (“miembros”) el presentar su historial médico a
                    profesionales de la salud (“proveedores”) para obtener
                    orientación y servicios médicos.
                  </p>
                  <p className="leading-relaxed text-[#0D4B4D]/60 font-medium italic">
                    Por medio del acceso y uso de este portal electrónico, usted
                    acepta cumplir con estos Términos y Condiciones de Uso y
                    cualquier otra disposición que aparezca en los mismos. Si no
                    está de acuerdo con estos Términos y Condiciones de Uso, no
                    podrá utilizar nuestros servicios.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 2. Emergencias */}
            <section id="emergencias">
              <Card className="bg-destructive/5 border-destructive/20 shadow-xl shadow-destructive/5 overflow-hidden ring-1 ring-destructive/10">
                <CardContent className="p-8 flex items-start gap-6">
                  <div className="p-4 bg-destructive/10 rounded-2xl">
                    <Phone className="h-8 w-8 text-destructive animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-destructive uppercase tracking-tighter mb-2">
                      ¡Atención - Emergencia Médica!
                    </h3>
                    <p className="text-sm font-bold leading-relaxed text-destructive/80">
                      SI USTED ENTIENDE QUE SUFRE DE UNA EMERGENCIA MÉDICA,
                      LLAME INMEDIATAMENTE AL 911 O ACUDA A LA SALA DE
                      EMERGENCIA DE HOSPITAL MÁS CERCANA.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 3. Independencia Profesional */}
            <section id="independencia">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Users className="h-6 w-6" />
                    3. Independencia Profesional
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 leading-relaxed text-[#0D4B4D]/80 p-8">
                  <p>
                    Servicios de Salud Doctor Recetas no practica la medicina ni
                    ninguna otra profesión licenciada, y no interfiere con la
                    práctica de la medicina de los proveedores de salud que
                    prestan servicios a través de su portal electrónico. Estos
                    son profesionales independientes, quienes son exclusivamente
                    responsables por los servicios que ofrecen y el cumplimiento
                    de los requisitos aplicables a sus profesiones.
                  </p>
                  <div className="p-5 bg-[#0D4B4D]/5 border border-[#0D4B4D]/10 rounded-2xl italic text-[13px] font-bold text-[#0D4B4D]/70 relative bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-5">
                    Doctor Recetas no será legalmente responsable por la
                    orientación profesional o servicio que ofrezcan dichos
                    proveedores.
                  </div>
                  <p>
                    Todos los médicos que forman parte de la lista de
                    proveedores de servicios de salud de Doctor Recetas tienen
                    licencias para practicar la medicina en Puerto Rico y cuando
                    aplique, las certificaciones correspondientes a telemedicina
                    emitidas por la Junta de Licenciamiento y Disciplina Médica
                    de Puerto Rico.
                  </p>
                  <div className="flex items-start gap-4 text-sm border-t border-[#0D4B4D]/10 pt-6">
                    <Info className="h-6 w-6 text-[#0D4B4D]/40 shrink-0 mt-0.5" />
                    <p>
                      <strong className="text-[#0D4B4D] font-black">
                        Contenido del portal electrónico:
                      </strong>{" "}
                      Ninguna información presentada en la página web, con la
                      excepción de la información que usted reciba de los
                      proveedores médicos, deberá ser considerada como
                      orientación médica o como endoso, representación o
                      garantía de tratamiento o medicación alguna.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 4. Consentimiento Informado */}
            <section id="consentimiento">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <CheckCircle2 className="h-6 w-6" />
                    4. Consentimiento Informado
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 leading-relaxed text-[#0D4B4D]/80 p-8">
                  <p>
                    <strong className="text-[#0D4B4D] font-bold">
                      Consentimiento informado:
                    </strong>{" "}
                    La telemedicina implica el uso de comunicaciones
                    electrónicas que permiten a proveedores médicos ofrecer a
                    sus pacientes servicios de consulta de manera remota. La
                    información compartida electrónicamente o por teléfono entre
                    miembro y proveedor podrá ser utilizada para el diagnóstico,
                    tratamiento, seguimiento y/o educación del paciente.
                  </p>
                  <p>
                    Los servicios de telemedicina que usted recibe de los
                    proveedores no pretenden remplazar su relación
                    médico-paciente con su médico primario. Estos deberán ser
                    considerados como una consulta médica con el fin de
                    determinar el curso de acción a tomar ante su situación
                    particular. Usted deberá solicitar cuidado de emergencia o
                    de seguimiento según le sea recomendado por el proveedor.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 5. Riesgos y Beneficios */}
            <section id="riesgos">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <AlertCircle className="h-6 w-6" />
                    5. Riesgos y Beneficios de la Telemedicina
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 leading-relaxed text-[#0D4B4D]/80 p-8">
                  <p>
                    Los servicios de telemedicina ofrecidos por nuestros
                    proveedores representan beneficios para nuestros miembros al
                    permitirles acceder a servicios médicos de manera remota,
                    rápida, eficiente y conveniente. No obstante, también
                    existen riesgos potenciales. Como en cualquier servicio
                    médico, los riesgos podrían incluir, sin limitarse a, los
                    siguientes:
                  </p>
                  <ul className="grid gap-4">
                    {[
                      "En casos muy poco probables, la información transmitida electrónicamente por el paciente pudiera resultar insuficiente (ej. resolución de imágenes) para permitir al proveedor tomar decisiones.",
                      "Fallas en los equipos electrónicos pueden causar demoras en la evaluación médica y la consulta o tratamiento del paciente.",
                      "Aun cuando los sistemas cuentan con protocolos de seguridad, estos no son infalibles, y podrían fallar exponiendo información sensitiva.",
                      "Las recomendaciones médicas podrían no tener el resultado esperado debido a la falta de acceso del proveedor a los récords completos del paciente.",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm font-medium p-3 rounded-xl bg-[#0D4B4D]/5 border border-[#0D4B4D]/5"
                      >
                        <div className="h-2 w-2 rounded-full bg-[#0D4B4D] shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Separator className="bg-[#0D4B4D]/10" />
                  <div className="bg-[#0D4B4D]/5 p-6 rounded-2xl border border-[#0D4B4D]/10">
                    <h4 className="font-black text-xs uppercase tracking-widest text-[#0D4B4D] mb-4">
                      Usted entiende y acepta:
                    </h4>
                    <ul className="space-y-3">
                      {[
                        "Recibir beneficios previstos pero sin garantía de un resultado específico.",
                        "Leyes de privacidad y confidencialidad aplican igual que en consulta presencial.",
                        "Responsabilidad de pago si su cubierta no es suficiente.",
                        "El proveedor puede determinar que el servicio no es adecuado para sus necesidades.",
                        "Su información puede ser compartida con fines de tratamiento, pago y cuidado médico.",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 text-[13px] font-bold text-[#0D4B4D]"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#0D4B4D] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 6. Privacidad */}
            <section id="privacidad">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Shield className="h-6 w-6" />
                    6. Privacidad y Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 leading-relaxed text-[#0D4B4D]/80 p-8">
                  <p>
                    Doctor Recetas es requerido por ley a cumplir con las leyes
                    federales de privacidad y seguridad de la información de
                    salud y tomar las medidas necesarias para garantizarlas.
                    Además, la información que usted someta a su proveedor
                    durante la consulta es legalmente confidencial.
                  </p>
                  <div className="p-6 bg-[#0D4B4D]/5 rounded-2xl border-l-4 border-l-[#0D4B4D] font-medium text-sm">
                    Solo somos responsables por la seguridad de los sistemas
                    informáticos que operamos. Usted es responsable por la
                    seguridad de sus propios dispositivos y redes.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 7. Cuenta de Usuario */}
            <section id="cuenta">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Lock className="h-6 w-6" />
                    7. Cuenta de Usuario y Contraseña
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 leading-relaxed text-[#0D4B4D]/80 p-8">
                  <p>
                    Para crear una cuenta, usted debe ser mayor de{" "}
                    <strong className="text-[#0D4B4D] font-black underline">
                      21 años
                    </strong>{" "}
                    y tener capacidad legal para contratar. Usted será
                    responsable de toda la actividad bajo su perfil.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl border border-[#0D4B4D]/10 bg-[#0D4B4D]/5">
                      <h4 className="font-black text-xs uppercase tracking-widest text-[#0D4B4D] mb-2">
                        Soporte
                      </h4>
                      <p className="text-sm font-bold">(787) 710-7426</p>
                    </div>
                    <div className="p-5 rounded-2xl border border-[#0D4B4D]/10 bg-[#0D4B4D]/5">
                      <h4 className="font-black text-xs uppercase tracking-widest text-[#0D4B4D] mb-2">
                        Seguridad
                      </h4>
                      <p className="text-sm font-medium">
                        Notificar inmediatamente compromisos de contraseña.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 8. Comunicaciones */}
            <section id="comunicaciones">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <MessageSquare className="h-6 w-6" />
                    8. Responsabilidad por sus comunicaciones
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80 font-medium">
                    Usted acuerda no usurpar identidades, no violentar leyes, y
                    abstenerse de manipular el software o distribuir virus.
                    También acuerda abstenerse de utilizar lenguaje obsceno,
                    abusivo o difamatorio.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 9. Pagos */}
            <section id="pagos">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <CreditCard className="h-6 w-6" />
                    9. Cargos y Términos de Pago
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80">
                    El pago total se realiza al registrarse mediante sistemas
                    seguros como{" "}
                    <strong className="text-[#0D4B4D]">Authorize.net</strong> o{" "}
                    <strong className="text-[#0D4B4D]">ATH MOVIL</strong>.
                  </p>
                  <div className="p-5 bg-[#0D4B4D]/5 border border-[#0D4B4D]/10 rounded-2xl text-sm italic font-bold text-[#0D4B4D]/70">
                    Créditos por servicio no brindado deben solicitarse en un
                    periodo no mayor de 30 días.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 10. Planes Médicos */}
            <section id="planes">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Heart className="h-6 w-6" />
                    10. Planes Médicos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80 font-medium">
                    Usted puede elegir utilizar su plan médico si cuenta con los
                    beneficios correspondientes. Es responsable de proveer
                    información veraz para determinar su elegibilidad.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 11. Propiedad Intelectual */}
            <section id="propiedad">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Globe className="h-6 w-6" />
                    11. Propiedad de Doctor Recetas
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80 text-sm">
                    Todo el contenido, software y marcas son propiedad de Online
                    Health. Queda prohibida la reproducción, distribución o
                    modificación sin autorización expresa.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 12. Cancelación */}
            <section id="cancelacion">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Calendar className="h-6 w-6" />
                    12. Cancelación y Modificación
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-4">
                  <p className="leading-relaxed text-[#0D4B4D]/80 text-sm italic font-bold">
                    Desactivación: frances@doctorrecetas.com o vía Servicio al
                    Cliente.
                  </p>
                  <p className="leading-relaxed text-[#0D4B4D]/80 text-sm">
                    Doctor Recetas se reserva el derecho de modificar estos
                    términos en cualquier momento.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 13. Garantías */}
            <section id="garantias">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Scale className="h-6 w-6" />
                    13. Garantías y Límites
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <p className="leading-relaxed text-[#0D4B4D]/80 text-sm font-medium">
                    El uso del portal es bajo su propio riesgo. Doctor Recetas
                    no es legalmente responsable por daños indirectos
                    relacionados al uso de la plataforma o servicios de
                    terceros.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* 14. Otros */}
            <section id="otros">
              <Card className="border-[#0D4B4D]/10 bg-white shadow-xl shadow-[#0D4B4D]/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#0D4B4D] font-black tracking-tight">
                    <Info className="h-6 w-6" />
                    14. Otros Asuntos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-6">
                  <ul className="grid md:grid-cols-2 gap-4">
                    {[
                      { l: "Jurisdicción", v: "Puerto Rico" },
                      { l: "Legislación", v: "Estado Libre Asociado" },
                      { l: "Cumplimiento", v: "Leyes Federales DMCA" },
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="p-4 rounded-xl bg-[#0D4B4D]/5 border border-[#0D4B4D]/10"
                      >
                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#0D4B4D]/50 mb-1">
                          {item.l}
                        </span>
                        <span className="text-sm font-bold text-[#0D4B4D]">
                          {item.v}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-destructive/10 p-6 border border-destructive/20 rounded-2xl text-center">
                    <p className="font-black text-destructive uppercase tracking-widest text-[11px] leading-relaxed">
                      Prohibida la grabación de sesiones (imágenes, sonidos o
                      textos). Su violación conlleva sanciones legales.
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

export interface ServiceAccordionItem {
  title: string;
  content: string;
}

export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  longDescription: string;
  accordionItems: ServiceAccordionItem[];
  apiTag?: string;
}

export const servicesData: ServiceData[] = [
  {
    id: "1",
    slug: "ordenes-medicas",
    title: "Ordenes médicas",
    description:
      "Obtén de forma digital tus órdenes para Laboratorios, Rayos X, CT Scan, MRI y más, con entrega inmediata a tu correo electrónico.",
    imageSrc: "/citas-medicas/1.png",
    imageAlt: "Ordenes médicas",
    longDescription: "Doctor Recetas, somos una compañía puertorriqueña establecida en 2020 como consecuencia de la pandemia.",
    apiTag: "Lab",
    accordionItems: [
      {
        title: "Receta de medicamentos o \"refill\"",
        content: "Doctor Recetas, somos una compañía puertorriqueña establecida en 2020. Doctor Recetas, somos una compañía puertorriqueña establecida en 2020 com.",
      },
      {
        title: "Receta de medicamentos o \"refill\"",
        content: "Doctor Recetas, somos una compañía puertorriqueña establecida en 2020. Doctor Recetas, somos una compañía puertorriqueña establecida en 2020 com.",
      },
      {
        title: "Receta de medicamentos o \"refill\"",
        content: "Doctor Recetas, somos una compañía puertorriqueña establecida en 2020. Doctor Recetas, somos una compañía puertorriqueña establecida en 2020 com.",
      },
      {
        title: "Receta de medicamentos o \"refill\"",
        content: "Doctor Recetas, somos una compañía puertorriqueña establecida en 2020. Doctor Recetas, somos una compañía puertorriqueña establecida en 2020 com.",
      },
    ],
  },
  {
    id: "2",
    slug: "certificados-medicos",
    title: "Certificados médicos",
    description:
      "Emisión rápida de certificados de salud oficiales para procesos de empleo, estudios, deportes o viajes, validados por médicos expertos.",
    imageSrc: "/citas-medicas/2.png",
    imageAlt: "Certificados médicos",
    longDescription: "Doctor Recetas, somos una compañía puertorriqueña establecida en 2020 como consecuencia de la pandemia.",
    apiTag: "Citas Medicas",
    accordionItems: [
      {
        title: "Certificado de Salud",
        content: "Obtén tu certificado de salud de manera rápida y segura.",
      },
       {
        title: "Examen Físico",
        content: "Evaluación completa por nuestros médicos certificados.",
      },
       {
        title: "Certificado Deportivo",
        content: "Listo para tus actividades físicas y competencias.",
      },
       {
        title: "Certificado de Empleo",
        content: "Validación oficial para procesos de reclutamiento.",
      },
    ],
  },
  {
    id: "3",
    slug: "consultas-medicas",
    title: "Consultas médicas",
    description:
      "Accede a atención médica general y primaria de alta calidad desde la comodidad de tu hogar, sin largas filas ni salas de espera.",
    imageSrc: "/citas-medicas/3.png",
    imageAlt: "Consultas médicas",
    longDescription: "Atención médica primaria al alcance de tu mano.",
    apiTag: "Citas Medicas",
    accordionItems: [
      {
        title: "Consulta General",
        content: "Consulta con nuestros médicos generales para diagnósticos y tratamientos.",
      },
      {
        title: "Consulta de Seguimiento",
        content: "Monitoreo continuo de tu estado de salud.",
      },
      {
        title: "Intervención Temprana",
        content: "Detección y manejo oportuno de condiciones médicas.",
      },
      {
        title: "Telemedicina 24/7",
        content: "Atención médica disponible en cualquier momento.",
      },
    ],
  },
  {
    id: "4",
    slug: "salud-bienestar",
    title: "Salud y bienestar",
    description:
      "Programas preventivos y de cuidado integral diseñados para mejorar tu calidad de vida y mantener un control riguroso de tu salud.",
    imageSrc: "/citas-medicas/1.png",
    imageAlt: "Salud y bienestar",
    longDescription: "Programas integrales para tu bienestar.",
    apiTag: "Citas Medicas",
    accordionItems: [
      {
        title: "Programa de Nutrición",
        content: "Planes nutricionales personalizados.",
      },
      {
        title: "Control de Estrés",
        content: "Técnicas y apoyo para tu salud mental.",
      },
      {
        title: "Chequeo Ejecutivo",
        content: "Evaluación completa de salud para profesionales.",
      },
      {
        title: "Plan de Ejercicio",
        content: "Rutinas diseñadas según tus necesidades.",
      },
    ],
  },
  {
    id: "5",
    slug: "para-el",
    title: "Para él",
    description:
      "Servicios preventivos y diagnósticos especializados en salud masculina, enfocados en el bienestar integral y rendimiento óptimo.",
    imageSrc: "/citas-medicas/2.png",
    imageAlt: "Para él",
    longDescription: "Servicios especializados para la salud masculina.",
    apiTag: "Para el",
    accordionItems: [
      {
        title: "Chequeo Preventivo",
        content: "Exámenes de rutina para la salud del hombre.",
      },
      {
        title: "Salud Hormonal",
        content: "Evaluación y tratamiento hormonal.",
      },
      {
        title: "Salud Sexual",
        content: "Atención discreta y profesional.",
      },
      {
        title: "Rendimiento Físico",
        content: "Optimización de tu estado físico.",
      },
    ],
  },
  {
    id: "6",
    slug: "para-ella",
    title: "Para ella",
    description:
      "Atención médica personalizada y servicios especializados para las necesidades de salud femenina, brindando soluciones preventivas y cuidado continuo.",
    imageSrc: "/citas-medicas/3.png",
    imageAlt: "Para ella",
    longDescription: "Cuidado especializado para la mujer.",
    apiTag: "Para ella",
    accordionItems: [
      {
        title: "Ginecología",
        content: "Consultas y seguimiento ginecológico.",
      },
      {
        title: "Control Prenatal",
        content: "Acompañamiento durante tu embarazo.",
      },
      {
        title: "Salud Materna",
        content: "Cuidado integral para la madre.",
      },
      {
        title: "Screening Óseo",
        content: "Prevención y detección de osteoporosis.",
      },
    ],
  },
];

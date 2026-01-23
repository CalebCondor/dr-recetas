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
    accordionItems: [
      {
        title: "Certificado de Salud",
        content: "Obtén tu certificado de salud de manera rápida y segura.",
      },
       {
        title: "Certificado de Salud",
        content: "Obtén tu certificado de salud de manera rápida y segura.",
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
    accordionItems: [
      {
        title: "Consulta General",
        content: "Consulta con nuestros médicos generales para diagnósticos y tratamientos.",
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
    accordionItems: [
      {
        title: "Programa de Nutrición",
        content: "Planes nutricionales personalizados.",
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
    accordionItems: [
      {
        title: "Chequeo Preventivo",
        content: "Exámenes de rutina para la salud del hombre.",
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
    accordionItems: [
      {
        title: "Ginecología",
        content: "Consultas y seguimiento ginecológico.",
      },
    ],
  },
];

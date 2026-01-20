import Hero from "@/components/hero-section";
import { ChatbotSection } from "@/components/home/chatbot-section";
import { ServiceCard } from "@/components/home/service-card";

const services = [
  {
    title: "Receta de medicamentos o “refill”",
    description: "Receta de medicamentos o “refill”.",
    imageSrc: "/citas-medicas/3.png",
    imageAlt: "Revisión ultrasónica",
  },
  {
    title: "ECBC + DIFF Lab",
    description:
      "Electrocardiograma completo con análisis digital avanzado y monitoreo cardíaco en tiempo real.",
    imageSrc: "/citas-medicas/2.png",
    imageAlt: "ECG Scan",
  },
  {
    title: "Análisis de orina y cultivo de orina",
    description:
      "Medición precisa de composición corporal, porcentaje de grasa y masa muscular mediante bioimpedancia.",
    imageSrc: "/citas-medicas/1.png",
    imageAlt: "Análisis corporal",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col gap-0">
      <Hero />

      {/* Services Section */}
      <section id="servicios" className="w-full py-20 lg:py-32 relative group">
        <div className="w-full px-6 md:px-12 lg:px-[8%]">
          <div className="flex justify-center mb-16 px-2">
            <div className="space-y-4 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D4B4D] tracking-tight leading-none">
                Nuestros Servicios
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="animate-in fade-in slide-in-from-bottom-8 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ChatbotSection />
    </main>
  );
}

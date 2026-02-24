import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useTranslations } from "next-intl";

const reviews = [
  {
    name: "Noel",
    username: "@jnoel342",
    body: "La atención del Dr. fue excepcional. Pude resolver mi refill de medicamentos sin salir de casa y en menos de 10 minutos me llegó todo al correo. El proceso fue claro, rápido y muy profesional.",
    img: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Ryan",
    username: "@crivera67",
    body: "Muy fácil de usar. El proceso de pago con ATH Móvil fue súper rápido y sin complicaciones. Me encantó que todo se hizo desde el celular, sin filas ni llamadas largas. ¡Excelente servicio!",
    img: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "Ariel",
    username: "@ariel_23",
    body: "Excelente servicio, la receta me llegó a mi email en menos de 10 minutos. El chatbot me ayudó a escoger la opción correcta y el médico fue muy amable durante toda la evaluación.",
    img: "https://i.pravatar.cc/100?img=14",
  },
  {
    name: "María",
    username: "@maria_pr",
    body: "Tenía duda sobre qué servicio seleccionar y me orientaron perfecto. En pocos minutos completé el proceso y recibí respuesta médica confiable. Definitivamente lo recomiendo para resolver rápido desde casa.",
    img: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "Carlos",
    username: "@cortiz88",
    body: "Me sorprendió lo ágil que fue todo. Desde el registro hasta la entrega de la receta, la experiencia fue fluida. Se nota que el equipo está bien organizado y que realmente piensan en el paciente.",
    img: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Elena",
    username: "@elena_med",
    body: "Servicio 10/10. Necesitaba resolver urgente y aquí lo hice en minutos. Todo está bien explicado, el chat responde rápido y el seguimiento fue excelente. Lo usaría nuevamente sin pensarlo.",
    img: "https://i.pravatar.cc/100?img=23",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure className="relative flex min-h-56 w-full flex-col overflow-hidden rounded-3xl border border-[#dfe7cf] bg-white p-4 md:p-6">
      <p className="mb-3 text-xl leading-none tracking-wide text-[#F2C94C] md:text-2xl">
        ★★★★★
      </p>
      <blockquote className="text-base leading-relaxed text-slate-700 md:text-lg">
        {body}
      </blockquote>
      <div className="flex flex-row items-center gap-3">
        <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-black/5 dark:ring-white/10">
          <Image
            src={img}
            alt={name}
            fill
            sizes="36px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-lg font-medium text-slate-700 md:text-xl">
            -{name}
          </figcaption>
          <p className="text-xs font-medium text-slate-400">{username}</p>
        </div>
      </div>
    </figure>
  );
};

export function ReviewsSection() {
  const t = useTranslations("HomePage.Testimonials");
  const titleParts = t("title").split(" ");
  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <Image
          src="/estrella.svg"
          alt=""
          width={863}
          height={766}
          className="h-auto w-[70%] max-w-190 opacity-60"
          priority
        />
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-[8%]">
        <div className="mb-10 text-center">
          <p className="text-2xl font-semibold  text-[#88A35A] md:text-3xl lg:text-5xl">
            {titleParts.slice(0, 2).join(" ")}
          </p>
          <p className="text-2xl font-medium text-[#2c4546] md:text-3xl lg:text-5xl">
            {titleParts.slice(2).join(" ")}
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="mx-auto w-full max-w-7xl"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review) => (
              <CarouselItem
                key={review.username}
                className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <ReviewCard {...review} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2 md:-left-12 bg-[#E5ECD7] text-slate-600 border-0" />
          <CarouselNext className="right-2 md:-right-12 bg-[#E5ECD7] text-slate-600 border-0" />
        </Carousel>
      </div>
    </section>
  );
}

import Image from "next/image"
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"
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
]

const firstRow = reviews.slice(0, 3)
const secondRow = [...reviews.slice(3), reviews[0]]

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative flex h-56 w-72 cursor-pointer flex-col overflow-hidden rounded-2xl border p-4 md:h-auto md:min-h-52 md:w-md md:p-5",
        "border-gray-950/10 bg-white/95 transition-all duration-300 hover:-translate-y-1 ",
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="relative h-8 w-8 overflow-hidden rounded-full ring-1 ring-black/5 dark:ring-white/10 md:h-9 md:w-9">
          <Image src={img} alt={name} fill sizes="36px" className="object-cover" />
        </div>
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200 md:line-clamp-none">
        {body}
      </blockquote>
    </figure>
  )
}

export function ReviewsSectionCopy() {
  const t = useTranslations("HomePage.Testimonials");
  return (
    <section className="relative w-full overflow-hidden py-16 lg:py-24">
      <div className="w-full px-6 md:px-12 lg:px-[8%]">
        <div className="mb-10 text-center">
          <p className="text-3xl font-semibold leading-tight text-[#88A35A] md:text-5xl">
            {t("title").split(" ").slice(0, 2).join(" ")}
          </p>
          <p className="text-3xl font-medium leading-tight text-[#1F3938] md:text-5xl">
            {t("title").split(" ").slice(2).join(" ")}
          </p>
        </div>
        <Marquee pauseOnHover className="[--duration:25s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
    </section>
  )
}

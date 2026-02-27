"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";

const FILL_COLOR = "#b6e64a";
const BASE_COLOR = "rgba(255,255,255,0.2)";
const R = 48;

interface StepCard {
  id: string;
  badgeId: string;
  num: number;
  step: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  bg: string;
  textColor: string;
  descColor: string;
  align: "left" | "right";
  marginTop: string;
}

const stepColors = ["#89A856", "#78944A", "#718E40", "#66813A"];

interface AnimPath {
  fill: SVGPathElement;
  len: number;
  startScroll: number;
  endScroll: number;
  targetCard: Element | null;
  badge: HTMLElement | null;
}

function buildSnakePath(
  ax: number,
  ay: number,
  wallX: number,
  by: number,
  bx: number,
  aIsLeft: boolean,
): string {
  const dir = aIsLeft ? 1 : -1;
  const sweep1 = aIsLeft ? 1 : 0;
  const sweep2 = aIsLeft ? 0 : 1;
  return [
    `M ${ax} ${ay}`,
    `H ${wallX - dir * R}`,
    `A ${R} ${R} 0 0 ${sweep1} ${wallX} ${ay + R}`,
    `V ${by - R}`,
    `A ${R} ${R} 0 0 ${sweep2} ${wallX - dir * R} ${by}`,
    `H ${bx}`,
  ].join(" ");
}

export default function ComoFunciona() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animPaths = useRef<AnimPath[]>([]);
  const t = useTranslations("HomePage.HowItWorks");

  const CARDS: StepCard[] = [
    {
      id: "card-1",
      badgeId: "badge-1",
      num: 1,
      step: "Paso 1",
      title: "Regístrate y elige tu servicio médico favorito.",
      description: t("step1"),
      image: "/pasos/imagenpas1.png",
      imageAlt: "persona",
      bg: stepColors[0],
      textColor: "text-green-200",
      descColor: "text-green-100",
      align: "left",
      marginTop: "",
    },
    {
      id: "card-2",
      badgeId: "badge-2",
      num: 2,
      step: "Paso 2",
      title: "Consulta con tu médico de confianza.",
      description: t("step2"),
      image: "/pasos/imagenpaso2.png",
      imageAlt: "doctora",
      bg: stepColors[1],
      textColor: "text-blue-200",
      descColor: "text-blue-100",
      align: "right",
      marginTop: "md:mt-20 lg:mt-28",
    },
    {
      id: "card-3",
      badgeId: "badge-3",
      num: 3,
      step: "Paso 3",
      title: "Recibe tu diagnóstico y tratamiento personalizado.",
      description: t("step3"),
      image: "/pasos/imagenpaso3.png",
      imageAlt: "medico",
      bg: stepColors[2],
      textColor: "text-purple-200",
      descColor: "text-purple-100",
      align: "left",
      marginTop: "md:mt-20 lg:mt-28",
    },
    {
      id: "card-4",
      badgeId: "badge-4",
      num: 4,
      step: "Paso 4",
      title: "Monitorea tu salud y agenda tus próximas citas.",
      description: t("step4"),
      image: "/pasos/imagenpaso4.png",
      imageAlt: "enfermera",
      bg: stepColors[3],
      textColor: "text-orange-200",
      descColor: "text-orange-100",
      align: "right",
      marginTop: "md:mt-20 lg:mt-28",
    },
  ];
  const drawAll = () => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    svg.innerHTML = "";
    animPaths.current = [];

    if (window.innerWidth < 768) return;

    const wH = window.innerHeight;
    const cRect = container.getBoundingClientRect();
    const ids = CARDS.map((c) => c.id);
    const rects = ids.map((id) =>
      document.getElementById(id)!.getBoundingClientRect(),
    );
    const cW = cRect.width;

    const NS = "http://www.w3.org/2000/svg";

    const makePath = (d: string, stroke: string): SVGPathElement => {
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", d);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", stroke);
      p.setAttribute("stroke-width", "3");
      p.setAttribute("stroke-linecap", "round");
      p.setAttribute("stroke-linejoin", "round");
      return p;
    };

    for (let i = 0; i < rects.length - 1; i++) {
      const a = rects[i];
      const b = rects[i + 1];
      const aIsLeft = (a.left + a.right) / 2 < cRect.left + cW / 2;

      const ax = (aIsLeft ? a.right : a.left) - cRect.left;
      const ay = a.top + a.height / 2 - cRect.top;
      const bx = (aIsLeft ? b.left : b.right) - cRect.left;
      const by = b.top + b.height / 2 - cRect.top;
      const wallX = aIsLeft ? cW : 0;

      const d = buildSnakePath(ax, ay, wallX, by, bx, aIsLeft);

      svg.appendChild(makePath(d, BASE_COLOR));

      const fill = makePath(d, FILL_COLOR);
      svg.appendChild(fill);

      const len = fill.getTotalLength();
      fill.setAttribute("stroke-dasharray", String(len));
      fill.setAttribute("stroke-dashoffset", String(len));

      const targetCard =
        document.getElementById(ids[i + 1])?.querySelector(".card-inner") ??
        null;
      const badge = document.getElementById(CARDS[i + 1].badgeId);

      const scrollNow = window.scrollY;
      const connectorAbsY = rects[i].top + scrollNow + rects[i].height / 2;
      const destAbsCenterY =
        rects[i + 1].top + scrollNow + rects[i + 1].height / 2;
      const startScroll = Math.max(0, connectorAbsY - wH * 0.5);
      const endScroll = destAbsCenterY - wH * 0.4;

      animPaths.current.push({
        fill,
        len,
        startScroll,
        endScroll,
        targetCard,
        badge,
      });
    }
  };

  const onScroll = () => {
    const wH = window.innerHeight;
    const scrollY = window.scrollY;
    const atBottom = scrollY + wH >= document.documentElement.scrollHeight - 8;

    animPaths.current.forEach(
      ({ fill, len, startScroll, endScroll, targetCard, badge }) => {
        const progress = atBottom
          ? 1
          : Math.min(
              1,
              Math.max(0, (scrollY - startScroll) / (endScroll - startScroll)),
            );

        fill.setAttribute("stroke-dashoffset", String(len * (1 - progress)));

        if (progress >= 0.60) {
          targetCard?.classList.add("active");
          badge?.classList.add("lit");
        } else {
          targetCard?.classList.remove("active");
          badge?.classList.remove("lit");
        }
      },
    );
  };

  const onScrollMobile = () => {
    if (window.innerWidth >= 768) return;
    const wH = window.innerHeight;
    CARDS.forEach(({ id, badgeId }) => {
      const card = document.getElementById(id);
      const inner = card?.querySelector(".card-inner");
      const badge = document.getElementById(badgeId);
      if (!card || !inner) return;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      if (cardCenter < wH * 0.75) {
        inner.classList.add("active");
        badge?.classList.add("lit");
      } else {
        inner.classList.remove("active");
        badge?.classList.remove("lit");
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      onScroll();
      onScrollMobile();
    };
    const handleResize = () => {
      drawAll();
      onScroll();
      onScrollMobile();
    };

    const init = () => {
      drawAll();
      onScroll();
      onScrollMobile();
      // Card 1 siempre activo
      document.querySelector("#card-1 .card-inner")?.classList.add("active");
      document.getElementById("badge-1")?.classList.add("lit");
    };

    const timer = setTimeout(init, 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (min-width: 1024px) {
          #card-1, #card-3 { transform: translateX(-160px); }
          #card-2, #card-4 { transform: translateX(160px); }
        }
        .card-inner {
          transition: border-color 0.6s ease, box-shadow 0.6s ease;
          border: 2px solid transparent;
        }
        .card-inner.active {
          border-color: #b6e64a;
          box-shadow: 0 0 18px 3px rgba(182, 230, 74, 0.35);
        }
        /* step badge: hidden by default on small screens, visible as inline-flex on md+ */
        .step-badge {
          position: absolute;
          top: -14px;
          left: -14px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(234, 246, 213, 0.50);
          color: rgba(30,41,59,0.95);
          font-size: 22px;
          font-weight: 700;
          font-family: sans-serif;
          align-items: center;
          justify-content: center;
          z-index: 20;
          border: 2px solid rgba(255,255,255,0.15);
          transition: background 0.4s ease, color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease, opacity 0.25s ease, filter 0.25s ease;
          backdrop-filter: blur(4.7px);
          -webkit-backdrop-filter: blur(4.7px);
          opacity: 0.18;
          filter: blur(1.5px);
          display: none;
        }
        @media (min-width: 768px) {
          .step-badge {
            display: inline-flex;
          }
        }
        .step-badge.lit {
          /* slightly less fluorescent beige */
          background: rgba(200, 230, 120, 0.95);
          color: #1a2e00;
          border-color: rgba(200,230,120,0.9);
          box-shadow: 0 0 14px 3px rgba(182,230,74,0.45);
          opacity: 1;
          filter: none;
        }
      `}</style>

      <section className="min-h-screen flex items-start justify-center py-8">
        {/* Contenedor verde oscuro */}
        <div className="w-full max-w-400 rounded-[2.5rem] md:rounded-[5rem] px-5 md:px-12 lg:px-24 pt-14 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div className="w-full h-full p-5 md:p-12 lg:p-24">
              <div className="w-full h-full rounded-[2.5rem] md:rounded-[5rem] overflow-hidden">
                <Image
                  src="/how-it-works.png"
                  alt="fondo cómo funciona"
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
          {/* Encabezado */}
          <div className="mb-16 md:mb-20 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#C1E97C] tracking-tight">
              {t("title")}
            </h2>
            <p className="text-2xl md:text-xl text-white font-normal leading-normal mt-4 max-w-3xl mx-auto">
              {t("subtitle_prefix")}
              <span className="text-[#C1E97C]">{t("subtitle_highlight")}</span>
            </p>
          </div>

          {/* Container de cards + SVG */}
          <div
            ref={containerRef}
            id="container"
            className="relative w-full md:max-w-xl lg:max-w-3xl mx-auto"
          >
            {/* SVG conectores — solo md+ */}
            <svg
              ref={svgRef}
              id="connector-svg"
              className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
              style={{ zIndex: 0, overflow: "visible" }}
            />

            {/* Cards */}
            <div className="flex flex-col gap-6 md:gap-0">
              {CARDS.map((card, index) => (
                <div
                  key={card.id}
                  id={card.id}
                  className={[
                    "relative z-10 w-full",
                    card.align === "left"
                      ? "md:w-[48%] lg:w-[44%] md:ml-0"
                      : "md:w-[48%] lg:w-[44%] md:ml-auto",
                    card.marginTop,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {/* Badge numérico (hidden on mobile) */}
                  <span className="step-badge hidden md:inline-flex" id={card.badgeId}>
                    {card.num}
                  </span>

                  <div
                    className="w-full h-full rounded-2xl md:rounded-[2rem] pt-5 px-6 md:px-8 pb-0 text-white shadow-xl transition-all duration-300 group overflow-hidden relative flex flex-col card-inner"
                    style={{ backgroundColor: stepColors[index] }}
                  >
                    {/* Step label */}
                    <p className="text-3xl text-[#C1E97C] font-black uppercase tracking-widest opacity-70 mb-1 md:mb-2">
                      {card.step}
                    </p>
                    {/* Title */}
                    <p className="text-2xl font-bold leading-tight mb-3 md:mb-4">
                      {card.description}
                    </p>
                    {/* Illustration overflowing below card */}
                    <div className="relative -mx-6 md:-mx-8 flex-1 min-h-44 md:min-h-36 lg:min-h-44 rounded-b-2xl md:rounded-b-[2rem] overflow-hidden">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 45vw, 33vw"
                        className="object-cover object-top drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

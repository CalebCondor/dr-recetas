'use client'

import { useEffect, useRef } from 'react';

const FILL_COLOR = '#b6e64a';
const BASE_COLOR = 'rgba(255,255,255,0.2)';
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
  align: 'left' | 'right';
  marginTop: string;
}

const CARDS: StepCard[] = [
  {
    id: 'card-1',
    badgeId: 'badge-1',
    num: 1,
    step: 'Paso 1',
    title: 'Regístrate y elige tu servicio médico favorito.',
    description: 'Completa el formulario, selecciona el especialista y agenda tu cita en minutos desde cualquier dispositivo.',
    image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=260&h=220&fit=crop&crop=top',
    imageAlt: 'persona',
    bg: '#4a7c59',
    textColor: 'text-green-200',
    descColor: 'text-green-100',
    align: 'left',
    marginTop: '',
  },
  {
    id: 'card-2',
    badgeId: 'badge-2',
    num: 2,
    step: 'Paso 2',
    title: 'Consulta con tu médico de confianza.',
    description: 'Conéctate por videollamada o visítalo en su consultorio. Tu historial clínico siempre a la mano.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=260&h=220&fit=crop&crop=top',
    imageAlt: 'doctora',
    bg: '#3b5fa0',
    textColor: 'text-blue-200',
    descColor: 'text-blue-100',
    align: 'right',
    marginTop: 'md:mt-20 lg:mt-28',
  },
  {
    id: 'card-3',
    badgeId: 'badge-3',
    num: 3,
    step: 'Paso 3',
    title: 'Recibe tu diagnóstico y tratamiento personalizado.',
    description: 'Obtén recetas digitales, órdenes de laboratorio y seguimiento continuo desde la aplicación.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=260&h=220&fit=crop&crop=top',
    imageAlt: 'medico',
    bg: '#7c4a8a',
    textColor: 'text-purple-200',
    descColor: 'text-purple-100',
    align: 'left',
    marginTop: 'md:mt-20 lg:mt-28',
  },
  {
    id: 'card-4',
    badgeId: 'badge-4',
    num: 4,
    step: 'Paso 4',
    title: 'Monitorea tu salud y agenda tus próximas citas.',
    description: 'Revisa tu historial, resultados de laboratorio y recibe recordatorios automáticos de tus próximas visitas.',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=260&h=220&fit=crop&crop=top',
    imageAlt: 'enfermera',
    bg: '#a0523b',
    textColor: 'text-orange-200',
    descColor: 'text-orange-100',
    align: 'right',
    marginTop: 'md:mt-20 lg:mt-28',
  },
];

interface AnimPath {
  fill: SVGPathElement;
  len: number;
  startScroll: number;
  endScroll: number;
  targetCard: Element | null;
  badge: HTMLElement | null;
}

function buildSnakePath(
  ax: number, ay: number,
  wallX: number,
  by: number, bx: number,
  aIsLeft: boolean
): string {
  const dir    = aIsLeft ? 1 : -1;
  const sweep1 = aIsLeft ? 1 : 0;
  const sweep2 = aIsLeft ? 0 : 1;
  return [
    `M ${ax} ${ay}`,
    `H ${wallX - dir * R}`,
    `A ${R} ${R} 0 0 ${sweep1} ${wallX} ${ay + R}`,
    `V ${by - R}`,
    `A ${R} ${R} 0 0 ${sweep2} ${wallX - dir * R} ${by}`,
    `H ${bx}`,
  ].join(' ');
}

export default function ComoFunciona() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef       = useRef<SVGSVGElement>(null);
  const animPaths    = useRef<AnimPath[]>([]);

  const drawAll = () => {
    const svg       = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;

    svg.innerHTML = '';
    animPaths.current = [];

    if (window.innerWidth < 768) return;

    const wH    = window.innerHeight;
    const cRect = container.getBoundingClientRect();
    const ids   = CARDS.map(c => c.id);
    const rects = ids.map(id => document.getElementById(id)!.getBoundingClientRect());
    const cW    = cRect.width;

    const NS = 'http://www.w3.org/2000/svg';

    const makePath = (d: string, stroke: string): SVGPathElement => {
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', stroke);
      p.setAttribute('stroke-width', '3');
      p.setAttribute('stroke-linecap', 'round');
      p.setAttribute('stroke-linejoin', 'round');
      return p;
    };

    for (let i = 0; i < rects.length - 1; i++) {
      const a = rects[i];
      const b = rects[i + 1];
      const aIsLeft = (a.left + a.right) / 2 < cRect.left + cW / 2;

      const ax    = (aIsLeft ? a.right : a.left) - cRect.left;
      const ay    = a.top + a.height / 2 - cRect.top;
      const bx    = (aIsLeft ? b.left : b.right) - cRect.left;
      const by    = b.top + b.height / 2 - cRect.top;
      const wallX = aIsLeft ? cW : 0;

      const d = buildSnakePath(ax, ay, wallX, by, bx, aIsLeft);

      svg.appendChild(makePath(d, BASE_COLOR));

      const fill = makePath(d, FILL_COLOR);
      svg.appendChild(fill);

      const len = fill.getTotalLength();
      fill.setAttribute('stroke-dasharray', String(len));
      fill.setAttribute('stroke-dashoffset', String(len));

      const targetCard = document.getElementById(ids[i + 1])?.querySelector('.card-inner') ?? null;
      const badge      = document.getElementById(CARDS[i + 1].badgeId);

      const scrollNow      = window.scrollY;
      const connectorAbsY  = rects[i].top + scrollNow + rects[i].height / 2;
      const destAbsCenterY = rects[i + 1].top + scrollNow + rects[i + 1].height / 2;
      const startScroll    = Math.max(0, connectorAbsY - wH * 0.5);
      const endScroll      = destAbsCenterY - wH * 0.4;

      animPaths.current.push({ fill, len, startScroll, endScroll, targetCard, badge });
    }
  };

  const onScroll = () => {
    const wH       = window.innerHeight;
    const scrollY  = window.scrollY;
    const atBottom = scrollY + wH >= document.documentElement.scrollHeight - 8;

    animPaths.current.forEach(({ fill, len, startScroll, endScroll, targetCard, badge }) => {
      const progress = atBottom
        ? 1
        : Math.min(1, Math.max(0, (scrollY - startScroll) / (endScroll - startScroll)));

      fill.setAttribute('stroke-dashoffset', String(len * (1 - progress)));

      if (progress >= 0.95) {
        targetCard?.classList.add('active');
        badge?.classList.add('lit');
      } else {
        targetCard?.classList.remove('active');
        badge?.classList.remove('lit');
      }
    });
  };

  const onScrollMobile = () => {
    if (window.innerWidth >= 768) return;
    const wH = window.innerHeight;
    CARDS.forEach(({ id, badgeId }) => {
      const card  = document.getElementById(id);
      const inner = card?.querySelector('.card-inner');
      const badge = document.getElementById(badgeId);
      if (!card || !inner) return;
      const rect       = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      if (cardCenter < wH * 0.75) {
        inner.classList.add('active');
        badge?.classList.add('lit');
      } else {
        inner.classList.remove('active');
        badge?.classList.remove('lit');
      }
    });
  };

  useEffect(() => {
    const handleScroll  = () => { onScroll(); onScrollMobile(); };
    const handleResize  = () => { drawAll(); onScroll(); onScrollMobile(); };

    const init = () => {
      drawAll();
      onScroll();
      onScrollMobile();
      // Card 1 siempre activo
      document.querySelector('#card-1 .card-inner')?.classList.add('active');
      document.getElementById('badge-1')?.classList.add('lit');
    };

    const timer = setTimeout(init, 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        .step-badge {
          position: absolute;
          top: -14px;
          left: -14px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: white;
          color: #1e293b;
          font-size: 22px;
          font-weight: 700;
          font-family: sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          border: 2px solid rgba(255,255,255,0.3);
          transition: background 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
        }
        .step-badge.lit {
          background: #b6e64a;
          color: #1a2e00;
          border-color: #b6e64a;
          box-shadow: 0 0 14px 3px rgba(182,230,74,0.5);
        }
      `}</style>

      <section
        className="min-h-screen flex items-start justify-center p-8"
      >
        {/* Contenedor verde oscuro */}
        <div
          className="w-full max-w-7xl rounded-3xl px-5 md:px-12 lg:px-24 pt-14 pb-20"
          style={{ background: '#3a5a2e' }}
        >
          {/* Encabezado */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              ¿Cómo Funciona?
            </h1>
            <p className="text-base text-white/80">
              Sigue estos pasos para{' '}
              <span className="font-medium" style={{ color: '#b6e64a' }}>
                obtener la receta deseada
              </span>
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
              style={{ zIndex: 0, overflow: 'visible' }}
            />

            {/* Cards */}
            <div className="flex flex-col gap-6 md:gap-0">
              {CARDS.map((card) => (
                <div
                  key={card.id}
                  id={card.id}
                  className={[
                    'relative z-10 w-full',
                    card.align === 'left'
                      ? 'md:w-[48%] lg:w-[40%] md:ml-0'
                      : 'md:w-[48%] lg:w-[40%] md:ml-auto',
                    card.marginTop,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {/* Badge numérico */}
                  <span className="step-badge" id={card.badgeId}>
                    {card.num}
                  </span>

                  <div
                    className="relative rounded-2xl overflow-hidden card-inner"
                    style={{ background: card.bg, minHeight: 320 }}
                  >
                    <div className="p-6 pb-0">
                      <p className={`${card.textColor} font-semibold text-sm mb-3`}>
                        {card.step}
                      </p>
                      <h2 className="text-white font-bold text-xl mb-3 leading-snug">
                        {card.title}
                      </h2>
                      <p className={`${card.descColor} text-sm leading-relaxed`}>
                        {card.description}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <img
                        src={card.image}
                        alt={card.imageAlt}
                        className="w-40 object-cover rounded-t-xl"
                        style={{ marginBottom: -4 }}
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
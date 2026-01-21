"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(200, 220, 250)",
  gradientBackgroundEnd = "rgb(230, 245, 250)",
  firstColor = "100, 160, 255",
  secondColor = "220, 235, 250",
  thirdColor = "120, 210, 180",
  fourthColor = "130, 180, 250",
  fifthColor = "200, 220, 240",
  pointerColor = "80, 140, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart,
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd,
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX((prevCurX) => prevCurX + (tgX - prevCurX) / 60);
      setCurY((prevCurY) => prevCurY + (tgY - prevCurY) / 60);

      animationFrameId = requestAnimationFrame(move);
    }

    if (interactive) {
      animationFrameId = requestAnimationFrame(move);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [tgX, tgY, interactive]);

  useEffect(() => {
    if (!interactiveRef.current) return;

    interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
  }, [curX, curY]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setTgX(event.clientX);
      setTgY(event.clientY);
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [interactive]);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    // Verify safari in a timeout to avoid "synchronous setState in effect" warnings
    const checkSafari = () => {
      const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent,
      );
      if (isSafariBrowser) {
        setIsSafari(true);
      }
    };

    const timeoutId = setTimeout(checkSafari, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] pointer-events-none",
        containerClassName,
      )}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]",
        )}
      >
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_1)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] -top-[20%] -left-[20%]`,
            `[transform-origin:center_center]`,
            `animate-first`,
            `opacity-100`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_1)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[20%] right-[10%]`,
            `[transform-origin:calc(50%-400px)]`,
            `animate-second`,
            `opacity-100`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_1)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] -bottom-[20%] -right-[20%]`,
            `[transform-origin:calc(50%+400px)]`,
            `animate-third`,
            `opacity-100`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_1)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[10%] left-[30%]`,
            `[transform-origin:calc(50%-200px)]`,
            `animate-fourth`,
            `opacity-90`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_1)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] bottom-[30%] left-[15%]`,
            `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
            `animate-fifth`,
            `opacity-100`,
          )}
        ></div>

        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.9)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[50%] right-[25%]`,
            `[transform-origin:calc(50%+200px)]`,
            `animate-second`,
            `opacity-80`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.9)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] bottom-[15%] right-[35%]`,
            `[transform-origin:calc(50%-300px)]`,
            `animate-fourth`,
            `opacity-85`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_1)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[35%] left-[5%]`,
            `[transform-origin:calc(50%+600px)]`,
            `animate-first`,
            `opacity-95`,
          )}
        ></div>
        <div
          className={cn(
            `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.9)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
            `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] -top-[10%] right-[40%]`,
            `[transform-origin:calc(50%-500px)]`,
            `animate-third`,
            `opacity-80`,
          )}
        ></div>

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_1)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
              `[mix-blend-mode:var(--blending-value)] w-[40%] h-[40%] -top-[20%] -left-[20%]`,
              `opacity-100 transition-transform duration-500 ease-out`,
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

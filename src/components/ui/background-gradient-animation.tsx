"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(160, 190, 240)",
  gradientBackgroundEnd = "rgb(190, 245, 240)",
  firstColor = "60, 130, 255",
  secondColor = "120, 220, 255",
  thirdColor = "0, 210, 160",
  fourthColor = "80, 150, 240",
  fifthColor = "100, 220, 180",
  pointerColor = "60, 120, 255",
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
  const containerRef = useRef<HTMLDivElement>(null);

  const curX = useRef(0);
  const curY = useRef(0);
  const tgX = useRef(0);
  const tgY = useRef(0);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart,
    );
    container.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd,
    );
    container.style.setProperty("--first-color", firstColor);
    container.style.setProperty("--second-color", secondColor);
    container.style.setProperty("--third-color", thirdColor);
    container.style.setProperty("--fourth-color", fourthColor);
    container.style.setProperty("--fifth-color", fifthColor);
    container.style.setProperty("--pointer-color", pointerColor);
    container.style.setProperty("--size", size);
    container.style.setProperty("--blending-value", blendingValue);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    if (!interactive) return;

    let animationFrameId: number;

    const move = () => {
      if (!interactiveRef.current) return;

      const dx = tgX.current - curX.current;
      const dy = tgY.current - curY.current;

      // Stop animation if delta is very small (idle) to save CPU
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        isAnimating.current = false;
        return;
      }

      curX.current += dx / 20;
      curY.current += dy / 20;

      interactiveRef.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`;

      animationFrameId = requestAnimationFrame(move);
    };

    (
      interactiveRef.current as HTMLDivElement & {
        __startAnimation?: () => void;
      }
    ).__startAnimation = () => {
      if (!isAnimating.current) {
        isAnimating.current = true;
        move();
      }
    };

    return () => cancelAnimationFrame(animationFrameId);
  }, [interactive]);

  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (interactiveRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        tgX.current = event.clientX - rect.left;
        tgY.current = event.clientY - rect.top;

        const interactiveDiv = interactiveRef.current as HTMLDivElement & {
          __startAnimation?: () => void;
        };
        interactiveDiv.__startAnimation?.();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-full w-full relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName,
      )}
    >
      <div className={cn(className, "relative z-10")}>{children}</div>
      <div className="gradients-container h-full w-full absolute top-0 left-0 overflow-hidden pointer-events-none">
        {/* Layer 1 */}
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat]",
            "w-[var(--size)] h-[var(--size)] -top-[20%] -left-[20%]",
            "[transform-origin:center_center]",
            "animate-first",
            "opacity-80 will-change-transform [mix-blend-mode:var(--blending-value)]",
          )}
        />
        {/* Layer 2 */}
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]",
            "w-[var(--size)] h-[var(--size)] top-[20%] right-[10%]",
            "[transform-origin:calc(50%-400px)]",
            "animate-second",
            "opacity-70 will-change-transform",
          )}
        />
        {/* Layer 3 */}
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]",
            "w-[var(--size)] h-[var(--size)] -bottom-[20%] -right-[20%]",
            "[transform-origin:calc(50%+400px)]",
            "animate-third",
            "opacity-70 will-change-transform",
          )}
        />
        {/* Layer 4 */}
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]",
            "w-[var(--size)] h-[var(--size)] top-[30%] left-[20%]",
            "[transform-origin:calc(50%-200px)]",
            "animate-fourth",
            "opacity-70 will-change-transform",
          )}
        />
        {/* Layer 5 */}
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]",
            "w-[var(--size)] h-[var(--size)] bottom-[10%] left-[10%]",
            "[transform-origin:calc(50%-600px)]",
            "animate-fifth",
            "opacity-70 will-change-transform",
          )}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]",
              "w-[100%] h-[100%] -top-[50%] -left-[50%]",
              "opacity-70 will-change-transform",
            )}
          />
        )}
      </div>
    </div>
  );
};

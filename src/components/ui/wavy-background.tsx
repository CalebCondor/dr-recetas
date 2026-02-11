"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill = "transparent",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const noise = React.useMemo(() => createNoise3D(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeed = React.useCallback(() => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  }, [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Determine Safari status locally to avoid state-induced re-renders
    const isSafari =
      typeof window !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome");

    let w = (ctx.canvas.width = window.innerWidth);
    let h = (ctx.canvas.height = window.innerHeight);
    let nt = 0;
    let animationId: number;

    const waveColors = colors ?? [
      "#38bdf8",
      "#818cf8",
      "#c084fc",
      "#e879f9",
      "#22d3ee",
    ];

    const drawWave = (n: number) => {
      nt += getSpeed();
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = waveWidth || 50;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      if (backgroundFill !== "transparent") {
        ctx.fillStyle = backgroundFill;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalAlpha = waveOpacity || 0.5;
      drawWave(5);
      animationId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      if (isSafari) {
        canvas.style.filter = `blur(${blur}px)`;
      } else {
        ctx.filter = `blur(${blur}px)`;
      }
    };

    // Apply filter initially
    if (isSafari) {
      canvas.style.filter = `blur(${blur}px)`;
    } else {
      ctx.filter = `blur(${blur}px)`;
    }

    render();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    blur,
    speed,
    waveOpacity,
    colors,
    waveWidth,
    backgroundFill,
    getSpeed,
    noise,
  ]);

  return (
    <div
      className={cn(
        "fixed inset-0 flex flex-col items-center justify-center -z-10 pointer-events-none",
        containerClassName,
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

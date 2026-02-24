"use client";

import { useState, useEffect } from "react";
import { throttle } from "@/lib/utils";

export interface MousePosition {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const normalizedX = (x / window.innerWidth) * 2 - 1;
      const normalizedY = (y / window.innerHeight) * 2 - 1;

      setPosition({ x, y, normalizedX, normalizedY });
    }, 16); // ~60fps

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

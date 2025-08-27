"use client";

import { useEffect } from "react";
import { useMotionValue } from "motion/react";
import Block from "./Block";

export default function FollowGrid() {
  const cursorX = useMotionValue<number>(0);
  const cursorY = useMotionValue<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.pageX);
      cursorY.set(e.pageY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="grid grid-cols-24 grid-rows-24 gap-1 w-full h-full overflow-hidden">
      {[...Array(576)].map((_, i) => (
        <Block key={i} cursorX={cursorX} cursorY={cursorY} />
      ))}
    </div>
  );
}

"use client";

import { TypographyH2 } from "@/components/Typography";
import FollowGrid from "./components/FollowGrid";

import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";

export default function Page() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

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
    <div className="flex flex-col h-full p-4 bg-black">
      <TypographyH2 className="text-white">Cursor Follow</TypographyH2>
      <div className="flex flex-col flex-1 justify-end">
        <FollowGrid cursorX={cursorX} cursorY={cursorY} />
      </div>
    </div>
  );
}

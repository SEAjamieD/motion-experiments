"use client";

import { TypographyH2 } from "@/components/Typography";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export default function Page() {
  return (
    <div className="flex flex-col h-full ">
      <TypographyH2>Apple Dock</TypographyH2>
      <div className="flex flex-col flex-1 justify-end pb-24">
        <Dock />
      </div>
    </div>
  );
}

function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => {
        mouseX.set(e.pageX);
      }}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-end w-fit h-16 mx-auto gap-4 px-4 pb-3 rounded-2xl bg-neutral-400 "
    >
      {[...Array(6)].map((_, index) => (
        <DockItem key={index} mouseX={mouseX} />
      ))}
    </div>
  );
}

function DockItem({ mouseX }: { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });
  const widthSync = useTransform(distance, [-200, 0, 200], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.2,
    stiffness: 200,
    damping: 15,
  });
  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="bg-neutral-500 flex items-center rounded-full w-10 aspect-square"
    />
  );
}

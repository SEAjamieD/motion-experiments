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
    <div
      className="flex flex-col h-full p-4"
      style={{
        backgroundColor: "#833AB4",
        background:
          "linear-gradient(162deg, rgba(131, 58, 180, 1) 0%, rgba(231, 29, 253, 1) 52%, rgba(122, 150, 214, 1) 74%, rgba(252, 249, 69, 1) 100%)",
      }}
    >
      <TypographyH2>Apple Dock</TypographyH2>
      <div className="flex flex-col flex-1 justify-end pb-8">
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
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }}
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
      className="bg-neutral-500 flex items-center rounded-lg w-10 aspect-square"
    />
  );
}

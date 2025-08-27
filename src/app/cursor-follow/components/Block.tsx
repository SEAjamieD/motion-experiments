import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef, useLayoutEffect, useEffect } from "react";

export default function Block({
  cursorX,
  cursorY,
}: {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const center = useMotionValue({ x: 0, y: 0 });

  useLayoutEffect(() => {
    let frame: number | null = null;

    const update = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        center.set({
          x: bounds.left + bounds.width / 2,
          y: bounds.top + bounds.height / 2,
        });
      });
    };

    update();

    window.addEventListener("resize", update);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, []);

  const degrees = useTransform(
    [cursorX, cursorY, center],
    () => {
      const { x: cx, y: cy } = center.get();
      const x = cursorX.get() - cx;
      const y = cursorY.get() - cy;
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      return angle - 90;
    },
    [0, 360]
  );

  return (
    <motion.div
      ref={ref}
      className="bg-neutral-700"
      style={{
        height: "70%",
        width: "2px",
        alignSelf: "center",
        justifySelf: "center",
        transformOrigin: "center",
        rotate: degrees,
      }}
    />
  );
}

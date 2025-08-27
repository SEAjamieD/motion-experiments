import { useRef, useLayoutEffect } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useTransform,
} from "motion/react";

export default function Block({
  cursorX,
  cursorY,
}: {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const cX = useMotionValue<number>(0);
  const cY = useMotionValue<number>(0);

  useLayoutEffect(() => {
    let frame: number | null = null;

    const update = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!ref.current) return;
        const bounds = ref.current.getBoundingClientRect();
        cX.set(bounds.left + bounds.width / 2);
        cY.set(bounds.top + bounds.height / 2);
      });
    };

    update();

    window.addEventListener("resize", update);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, []);

  const degrees = useTransform([cursorX, cursorY, cX, cY], () => {
    const cx = cX.get();
    const cy = cY.get();
    const x = cursorX.get() - cx;
    const y = cursorY.get() - cy;
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    return angle - 90;
  });

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

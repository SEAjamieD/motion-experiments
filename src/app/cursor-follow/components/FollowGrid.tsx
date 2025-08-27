import { MotionValue } from "motion/react";
import Block from "./Block";

export default function FollowGrid({
  cursorX,
  cursorY,
}: {
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
}) {
  return (
    <div className="grid grid-cols-24 grid-rows-24 gap-1 w-full h-full overflow-hidden">
      {[...Array(576)].map((_, i) => (
        <Block key={i} cursorX={cursorX} cursorY={cursorY} />
      ))}
    </div>
  );
}

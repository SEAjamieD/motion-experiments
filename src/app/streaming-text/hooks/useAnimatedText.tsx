"use client";

import { animate, Easing, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

const useAnimatedText = (
  text: string,
  {
    duration = 2,
    ease = "easeOut",
  }: { duration?: number; ease?: Easing | Easing[] } = {}
) => {
  const animatedCursor = useMotionValue(0);
  const [cursor, setCursor] = useState(0);
  const [prevText, setPrevText] = useState(text);
  const [isSameText, setIsSameText] = useState(true);

  if (prevText !== text) {
    setPrevText(text);
    setIsSameText(text.startsWith(prevText));

    if (!text.startsWith(prevText)) {
      setCursor(0);
    }
  }

  useEffect(() => {
    if (!isSameText) {
      animatedCursor.jump(0);
    }

    const controls = animate(animatedCursor, text.length, {
      duration,
      ease,
      onUpdate(latest) {
        setCursor(Math.floor(latest));
      },
    });

    return () => controls.stop();
  }, [animatedCursor, isSameText, text]);

  return text.split("").slice(0, cursor).join("");
};

export default useAnimatedText;

"use client";

import { useEffect, useRef, useState } from "react";
import { PauseIcon, PlayIcon, RotateCcw } from "lucide-react";
import useAnimatedText from "./hooks/useAnimatedText";
import { TypographyH2 } from "@/components/Typography";
import { Button } from "@/components/ui/button";

const delay = 250;
const characters = 50;

const StreamingText = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  const animatedText = useAnimatedText(text);

  useInterval(
    () => {
      const newText = getNextChars(characters);
      setText((text) => text + newText);
    },
    isPlaying ? delay : null
  );

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setText("");
    setIsPlaying(false);
    position = 0;
  };

  return (
    <div className="max-w-screen-md mx-auto mt-8">
      <TypographyH2>Streaming Text</TypographyH2>
      <div className="mt-4">
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            className="w-28"
          >
            {isPlaying ? (
              <PauseIcon className="w-4 h-4 " />
            ) : (
              <PlayIcon className="w-4 h-4 " />
            )}
            {isPlaying ? "Pause" : "Start"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="w-28"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
        <div className="flex gap-8">
          <div className="flex-1 h-[500px] p-4 rounded-sm bg-neutral-200 overflow-y-auto text-sm">
            <p className="whitespace-pre-wrap">{text}</p>
          </div>
          <div className="flex-1 h-[500px] p-4 rounded-sm bg-neutral-200 overflow-y-auto text-sm">
            <p className="whitespace-pre-wrap">{animatedText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingText;

let position = 0;
function getNextChars(n: number) {
  const result = skateIpsum.slice(position, position + n);
  position += n;
  return result;
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(callback);

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) return;

    // Call the callback immediately
    savedCallback.current?.();

    function tick() {
      savedCallback.current?.();
    }

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

const skateIpsum = `Skate ipsum dolor sit amet, il wax bluntslide Vatoland camel back locals. Shoveit crailtap baseplate Saran Wrap sponsored skate or die skater. Airwalk 50-50 frontside air drop in hardware dude hang up. Bone air coffin wall ride hard flip launch ramp bank transition. Bruised heel Primo slide bearings bone air hard flip rock and roll stoked. Full pipe coffin ollie hole downhill fakie grab Shiloh Greathouse judo air. Hard flip 540 rad regular footed goofy footed fakie out camel back. Hardware nose-bump quarter pipe Rat Bones slam varial griptape body varial.

Dude wall ride Rob Dyrdek durometer face plant gnar bucket. 

"Casper frontside Erik Foss flail griptape vert."

Hang up helipop front foot impossible kidney nose slide New Deal. Front foot impossible 180 face plant boardslide hang-up. Mute-air axle Fiesta Mall crail grab mini ramp 540. Smith grind trucks crailtap speed wobbles street. Pressure flip full-cab slap maxwell Kevin Harris coffin. Griptape trucks Shoe Goo bank transfer skate or die. Tic-tac axle launch ramp locals poseur. Bam Margera grind wall ride hurricane street locals.

Death box hardware Tommy Guerrero betty mongo. Crooked grind freestyle rip grip grind. Poseur gnarly airwalk Chris Buchinsky chicken wing. Lipslide slappy Steve Alba trucks nose slide. Hardware S.K.A.T.E. axle camel back handplant. Chicken wing blunt durometer backside. Trucks steps alley oop Vans lipslide. Helipop salad grind hard flip birdie. Tic-tac layback bean plant mini ramp helipop. Pop shove-it tailslide launch ramp Pantsman nosegrind. Stalefish judo air yeah wall ride. Fastplant bigspin half-flip nose slide. Skate or die skater grab flail.`;

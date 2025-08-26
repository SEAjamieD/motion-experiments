import Link from "next/link";
import { TypographyH1 } from "@/components/Typography";

const App = () => {
  return (
    <div>
      <TypographyH1>Motion Experiments</TypographyH1>
      <div className="flex flex-col">
        <Link href="/streaming-text">Streaming Text</Link>
        <Link href="/apple-dock">Apple Dock</Link>
      </div>
    </div>
  );
};

export default App;

import Link from "next/link";
import { TypographyH1 } from "@/components/Typography";

const App = () => {
  return (
    <div>
      <TypographyH1>Motion Experiments</TypographyH1>
      <Link href="/streaming-text">Streaming Text</Link>
    </div>
  );
};

export default App;

import { TypographyH2 } from "@/components/Typography";
import FollowGrid from "./components/FollowGrid";

export default function Page() {
  return (
    <div className="flex flex-col h-full p-4 bg-black">
      <TypographyH2 className="text-white">Cursor Follow</TypographyH2>
      <div className="flex flex-col flex-1 justify-end">
        <FollowGrid />
      </div>
    </div>
  );
}

import { TypographyH2 } from "@/components/Typography";

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
  return (
    <div className="flex items-center p-2 rounded-2-xl w-fit gap-2 px-6 mx-auto bg-neutral-400 ">
      {[...Array(6)].map((_, index) => (
        <DockItem key={index} />
      ))}
    </div>
  );
}

function DockItem() {
  return (
    <div className="bg-neutral-500 flex items-center rounded-full h-12 w-12"></div>
  );
}

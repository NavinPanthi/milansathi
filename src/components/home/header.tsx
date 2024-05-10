import Image from "next/image";
import { Button } from "@/components/ui/button";
// button.tsx

export default function Header() {
  return (
    <header className="bg-bg-header shadow-lg text-text-color fixed w-full ">
      <div className="mx-auto flex  items-center max-w-7xl px-4 py-6 sm:px-6 lg:px-8 justify-between">
        <Image src="/logo1.png" alt="" height="150" width="150" />
        <Button variant="variant" className="px-10 text-lg">
          Log in
        </Button>
      </div>
    </header>
  );
}

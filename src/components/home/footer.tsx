import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-bg-header shadow-lg text-text-color">
      <div className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8 justify-between">
        <Image src="/logo1.png" alt="" height="100" width="100" />
      </div>
    </footer>
  );
}

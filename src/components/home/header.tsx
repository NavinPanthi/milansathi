import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-bg-header shadow-lg text-text-color fixed w-full z-10 bg-opacity-90">
      <div className="mx-auto flex  items-center max-w-7xl px-4 py-6 sm:px-6 lg:px-8 justify-between">
        <Link href="/home">
          <Image
            src="/logo1.png"
            className="logo1"
            alt=""
            height="150"
            width="150"
          />
        </Link>
        <Button variant="variant" className="px-10 text-lg">
          <Link href="/auth/sign-in">Log In</Link>
        </Button>
      </div>
    </header>
  );
}

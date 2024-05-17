import Navbar from "@/components/Navbar";

export default function GeneralLayout({ children }: any) {
  return (
    <section>
      <Navbar />

      {children}
    </section>
  );
}

import Navbar from "@/components/Navbar";

export default function GeneralLayout({ children }) {
  return (
    <section>
      <Navbar />
      <div className="pt-2 px-3 sm:pt-4 sm:px-6">{children}</div>
    </section>
  );
}

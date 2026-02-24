import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Companies from "@/components/sections/Companies";
import BoardOfDirectors from "@/components/sections/BoardOfDirectors";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Services />
        <Companies />
        <About />
        <BoardOfDirectors />
      </main>
      <Footer />
    </>
  );
}

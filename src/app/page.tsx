"use client";
import Hero from "@/components/main/Hero";
import Projects from "@/components/main/Projects";
import About from "@/components/main/About";
import Contact from "@/components/main/Contact";
import Footer from "@/components/main/Footer";
export default function HomePage() {
    return (<main className="overflow-x-hidden bg-slate-950">
      <Hero />
      <About />
  <Projects />
      <Contact />
      <Footer />
    </main>);
}

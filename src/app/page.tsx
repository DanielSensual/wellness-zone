import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { Team } from "@/components/sections/Team";
import { Reviews } from "@/components/sections/Reviews";
import { Location } from "@/components/sections/Location";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ClientIntake } from "@/components/sections/ClientIntake";

export default function Home() {
  return (
    <>
      <Header transparent />
      <main>
        <Hero />
        <Pillars />
        <Team />
        <Reviews />
        <Location />
        <CtaBanner />
        <ClientIntake />
      </main>
      <Footer />
    </>
  );
}

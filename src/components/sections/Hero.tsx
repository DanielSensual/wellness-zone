import Image from "next/image";
import { hero } from "@/lib/content/site";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <Image
        src={hero.image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink-dark/65" aria-hidden />
      <Container className="relative flex min-h-screen flex-col items-center justify-center pt-20 pb-20 text-center text-white">
        <p className="max-w-2xl text-lg font-light italic sm:text-xl md:text-2xl">
          {hero.subhead}
        </p>
        <h1 className="mt-6 max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          {hero.headline}
        </h1>
        <div className="mt-10">
          <CTAButton size="lg" />
        </div>
      </Container>
    </section>
  );
}

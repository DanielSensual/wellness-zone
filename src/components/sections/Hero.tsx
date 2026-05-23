import Image from "next/image";
import { hero } from "@/lib/content/site";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt=""
          fill
          priority
          className="hero-ken-burns object-cover"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <Container className="relative flex min-h-screen flex-col items-center justify-center px-4 py-28 text-center sm:py-32">
        <p className="max-w-2xl text-lg font-light italic text-brand/80 sm:text-xl md:text-2xl">
          {hero.subhead}
        </p>

        <div className="relative mt-6 w-full max-w-5xl">
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <div
            className="mx-auto mt-6 h-1 w-32 max-w-[40%] rounded-full bg-gradient-to-r from-transparent via-brand to-transparent shadow-[0_0_24px_rgba(159,204,62,0.5)]"
            aria-hidden
          />
        </div>

        <div className="mt-10 shadow-[0_0_20px_rgba(159,204,62,0.3)]">
          <CTAButton size="lg" />
        </div>
      </Container>
    </section>
  );
}

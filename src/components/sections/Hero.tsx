import { hero } from "@/lib/content/site";
import { CTAButton } from "@/components/ui/CTAButton";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={hero.image}
          className="h-full w-full object-cover"
        >
          <source src="/images/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/70" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <Container className="relative flex min-h-screen flex-col items-center justify-center px-4 py-28 text-center sm:py-32">
        <p className="font-display max-w-2xl text-lg font-light italic text-brand/80 sm:text-xl md:text-2xl">
          {hero.subhead}
        </p>

        <div className="relative mt-6 w-full max-w-5xl">
          <div
            className="hero-pulse absolute left-1/2 top-1/2 h-px w-3/4 max-w-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-brand to-transparent"
            aria-hidden
          />
          <h1 className="font-display text-3d relative text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl">
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

      <a
        href="#pillars"
        aria-label="Scroll to services"
        className="scroll-bounce absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 transition-colors duration-300 hover:text-brand"
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}

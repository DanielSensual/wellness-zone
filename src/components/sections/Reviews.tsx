import Link from "next/link";
import { contact } from "@/lib/content/contact";
import { fetchGoogleReviews } from "@/lib/reviews/google";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";

export async function Reviews() {
  const data = await fetchGoogleReviews();
  const mapsLink = data.googleMapsUri ?? contact.mapsUrl;

  return (
    <section id="reviews" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading
          title="Client Reviews"
          subtitle={
            data.source === "google" && data.rating
              ? `${data.rating.toFixed(1)} stars · ${data.totalReviews ?? ""} Google reviews`
              : "What our clients say about Wellness Zone"
          }
        />

        {data.source === "fallback" && data.error ? (
          <p className="-mt-6 mb-8 text-center text-sm text-foreground/60">
            Showing featured testimonials. Connect Google Places API for live
            reviews.
          </p>
        ) : null}

        {data.rating ? (
          <div className="-mt-4 mb-8 flex justify-center">
            <StarRating rating={data.rating} />
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((review, index) => (
            <Reveal key={`${review.author}-${index}`} delayMs={index * 90}>
              <blockquote className="flex h-full flex-col rounded-2xl border-l-4 border-brand bg-surface-elevated p-6 glow-green transition-all duration-300 hover:glow-green-hover">
                <StarRating rating={review.rating} />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                  &ldquo;{review.text}&rdquo;
                </p>
                <footer className="mt-4 border-t border-brand/20 pt-4">
                  <cite className="not-italic">
                    <span className="font-semibold text-white">
                      {review.author}
                    </span>
                    {review.relativeTime ? (
                      <span className="ml-2 text-xs text-foreground/60">
                        {review.relativeTime}
                      </span>
                    ) : null}
                  </cite>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand transition-colors hover:underline"
          >
            Read all reviews on Google →
          </Link>
        </p>
      </Container>
    </section>
  );
}

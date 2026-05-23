import Link from "next/link";
import { contact } from "@/lib/content/contact";
import { fetchGoogleReviews } from "@/lib/reviews/google";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils/cn";

export async function Reviews() {
  const data = await fetchGoogleReviews();
  const mapsLink = data.googleMapsUri ?? contact.mapsUrl;

  return (
    <section id="reviews" className="scroll-mt-20 bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Client Stories"
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
          <div className="-mt-4 mb-10 flex justify-center">
            <StarRating rating={data.rating} />
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((review, index) => {
            const featured = index === 0;
            return (
              <Reveal
                key={`${review.author}-${index}`}
                delayMs={index * 90}
                className={cn(featured && "md:col-span-2 lg:col-span-2")}
              >
                <blockquote
                  className={cn(
                    "flex h-full flex-col rounded-2xl border-l-4 border-brand glass-card p-8 transition-all duration-300",
                    featured && "lg:p-10",
                  )}
                >
                  <StarRating rating={review.rating} />
                  <p
                    className={cn(
                      "mt-5 flex-1 leading-relaxed text-foreground",
                      featured
                        ? "font-display text-xl font-medium text-white sm:text-2xl"
                        : "text-sm",
                    )}
                  >
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <footer className="mt-6 border-t border-brand/20 pt-5">
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
            );
          })}
        </div>

        <p className="mt-12 text-center">
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

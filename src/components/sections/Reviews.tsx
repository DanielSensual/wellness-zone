import Link from "next/link";
import { contact } from "@/lib/content/contact";
import { fetchGoogleReviews } from "@/lib/reviews/google";
import { Container } from "@/components/ui/Container";
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
          <p className="mb-6 text-center text-sm text-ink/70">
            Showing featured testimonials. Connect Google Places API for live
            reviews.
          </p>
        ) : null}

        {data.rating ? (
          <div className="mb-8 flex justify-center">
            <StarRating rating={data.rating} />
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((review, index) => (
            <blockquote
              key={`${review.author}-${index}`}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm"
            >
              <StarRating rating={review.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer className="mt-4 border-t border-brand-pale pt-4">
                <cite className="not-italic">
                  <span className="font-semibold text-ink-dark">
                    {review.author}
                  </span>
                  {review.relativeTime ? (
                    <span className="ml-2 text-xs text-ink/70">
                      {review.relativeTime}
                    </span>
                  ) : null}
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>

        <p className="mt-10 text-center">
          <Link
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand hover:underline"
          >
            Read all reviews on Google →
          </Link>
        </p>
      </Container>
    </section>
  );
}

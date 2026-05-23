import { fallbackReviews } from "@/lib/content/reviews-fallback";

export type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
  profileUrl?: string;
};

export type ReviewsData = {
  reviews: Review[];
  rating: number | null;
  totalReviews: number | null;
  googleMapsUri: string | null;
  source: "google" | "fallback";
  error?: string;
};

type GoogleReview = {
  rating?: number;
  text?: { text?: string };
  relativePublishTimeDescription?: string;
  authorAttribution?: {
    displayName?: string;
    uri?: string;
  };
};

type GooglePlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  displayName?: { text?: string };
  reviews?: GoogleReview[];
};

const REVALIDATE_SECONDS = 7200;

export async function fetchGoogleReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return {
      reviews: fallbackReviews.map((r) => ({
        author: r.author,
        rating: r.rating,
        text: r.text,
      })),
      rating: 5,
      totalReviews: fallbackReviews.length,
      googleMapsUri: null,
      source: "fallback",
      error: "Google Places API not configured",
    };
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask":
          "reviews,rating,userRatingCount,displayName,googleMapsUri",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!response.ok) {
      throw new Error(`Places API returned ${response.status}`);
    }

    const data = (await response.json()) as GooglePlaceResponse;
    const reviews: Review[] = (data.reviews ?? []).map((review) => ({
      author: review.authorAttribution?.displayName ?? "Google User",
      rating: review.rating ?? 5,
      text: review.text?.text ?? "",
      relativeTime: review.relativePublishTimeDescription,
      profileUrl: review.authorAttribution?.uri,
    }));

    if (reviews.length === 0) {
      return buildFallback("No reviews returned from Google");
    }

    return {
      reviews,
      rating: data.rating ?? null,
      totalReviews: data.userRatingCount ?? null,
      googleMapsUri: data.googleMapsUri ?? null,
      source: "google",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return buildFallback(message);
  }
}

function buildFallback(error: string): ReviewsData {
  return {
    reviews: fallbackReviews.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
    })),
    rating: 5,
    totalReviews: fallbackReviews.length,
    googleMapsUri: null,
    source: "fallback",
    error,
  };
}

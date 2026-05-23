import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/reviews/google";

export const revalidate = 7200;

export async function GET() {
  const data = await fetchGoogleReviews();
  return NextResponse.json(data);
}

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-brand-pale/40 ${className ?? ""}`}
      aria-hidden
    />
  );
}

export default function Loading() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface py-12 sm:py-16" aria-busy="true" aria-live="polite">
        <Container className="max-w-lg">
          <Skeleton className="mb-6 h-4 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="mt-4 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />

          <div className="mt-8 space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
              <div>
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>

            <div>
              <Skeleton className="mb-2 h-3 w-16" />
              <Skeleton className="h-12 w-full" />
            </div>

            <div>
              <Skeleton className="mb-2 h-3 w-16" />
              <Skeleton className="h-12 w-full" />
            </div>

            <div>
              <Skeleton className="mb-3 h-3 w-40" />
              <div className="flex gap-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            <div>
              <Skeleton className="mb-3 h-3 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>
            </div>

            <Skeleton className="h-14 w-full" />

            <span className="sr-only">Loading consultation form…</span>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

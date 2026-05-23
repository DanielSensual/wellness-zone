import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-white/10 ${className ?? ""}`}
      aria-hidden
    />
  );
}

export default function Loading() {
  return (
    <>
      <Header />
      <main
        className="flex-1 bg-background py-12 sm:py-16"
        aria-busy="true"
        aria-live="polite"
      >
        <Container className="max-w-lg">
          <Skeleton className="mb-6 h-4 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="mt-4 h-4 w-full" />

          <div className="mt-8 space-y-6 rounded-2xl bg-surface-elevated p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-14 w-full" />
            <span className="sr-only">Loading consultation form…</span>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

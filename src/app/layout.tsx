import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { site } from "@/lib/content/site";
import { getLocalBusinessSchema } from "@/lib/seo/schema";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wellnesszone.com",
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Personal Training in Winter Park, FL`,
    description: site.description,
    images: [{ url: "/images/logo.png", width: 500, height: 500, alt: site.name }],
  },
  twitter: {
    card: "summary",
    title: site.name,
    description: site.description,
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = getLocalBusinessSchema();

  return (
    <html lang="en" className={`${lato.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}

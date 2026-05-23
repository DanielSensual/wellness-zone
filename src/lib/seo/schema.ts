import { contact } from "@/lib/content/contact";
import { site } from "@/lib/content/site";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthClub"],
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: contact.phone,
    email: contact.email,
    image: `${site.url}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: "US",
    },
    sameAs: [contact.social.facebook, contact.social.instagram],
    areaServed: {
      "@type": "City",
      name: "Winter Park",
    },
  };
}

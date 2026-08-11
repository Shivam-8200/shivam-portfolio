import type { Metadata } from "next";
import { PROFILE } from "@/lib/data";

// Self-hosted fonts (bundled via npm, no runtime fetch to Google Fonts).
// Distinct type system: Space Grotesk for display, Plus Jakarta Sans for
// body, JetBrains Mono for code/terminal — deliberately not the default
// Inter/system stack.
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "@fontsource/permanent-marker/400.css";
import "@fontsource/caveat/500.css";
import "@fontsource/caveat/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: `${PROFILE.name} — ${PROFILE.fullTitle}`,
  description: PROFILE.bio[0],
  openGraph: {
    title: `${PROFILE.name} — ${PROFILE.fullTitle}`,
    description: PROFILE.bio[0],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — ${PROFILE.fullTitle}`,
    description: PROFILE.bio[0],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.fullTitle,
    url: PROFILE.github,
    sameAs: [PROFILE.github, PROFILE.linkedin].filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

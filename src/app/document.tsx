import { Providers } from "@/app/providers";
import styles from "@/app/styles.css?url";

export const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" data-astryx-theme="neutral">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>vibework</title>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      {/* Stylesheet link (not a JS CSS import) so CSS ships with the RSC HTML. */}
      <link rel="stylesheet" href={styles} />
      <link rel="modulepreload" href="/src/client.tsx" />
    </head>
    <body>
      <Providers>{children}</Providers>
      <script>import("/src/client.tsx")</script>
    </body>
  </html>
);

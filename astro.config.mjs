import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  i18n: {
    defaultLocale: "ca",
    locales: ["es", "en", "ca"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  output: "hybrid",
  adapter: netlify()
});
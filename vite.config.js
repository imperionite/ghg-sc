import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd());

  const domain_name = env.VITE_DOMAIN_NAME || "https://ghg-scoutph.vercel.app";

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(mode === "production"
        ? [
            VitePWA({
              registerType: "autoUpdate",
              injectRegister: "auto",
              workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
                runtimeCaching: [
                  {
                    urlPattern: new RegExp(
                      `^${domain_name.replace(/^https?:\/\//, "")}/api/ghg/.*$`
                    ),
                    handler: "NetworkFirst",
                    options: {
                      cacheName: "api-cache",
                      expiration: {
                        maxEntries: 50,
                        maxAgeSeconds: 2 * 60, // 2 minutes
                      },
                      cacheableResponse: {
                        statuses: [0, 200],
                      },
                    },
                  },
                ],
              },
              includeAssets: [
                "favicon.svg",
                "favicon.ico",
                "robots.txt",
                "apple-touch-icon.png",
              ],
              manifest: {
                name: "GHG Scout by GHG Data Explorer PH",
                short_name: "GHGDEPH",
                description: "Community-based Carbon Footprint Calculator",
                theme_color: "#1976d2",
                background_color: "#ffffff",
                display: "standalone",
                start_url: "/",
                icons: [
                  {
                    src: "/pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                  },
                  {
                    src: "/pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                  },
                  {
                    src: "/pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "any maskable",
                  },
                ],
              },
              devOptions: {
                enabled: false,
              },
            }),
          ]
        : []),
    ],
  };
});

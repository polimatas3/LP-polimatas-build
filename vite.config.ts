import path from "path";
import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Custom plugin to inject non-blocking CSS
function nonBlockingCss(): Plugin {
  return {
    name: "non-blocking-css",
    transformIndexHtml: {
      order: "post",
      handler(html) {
        // Remove the blocking stylesheet link that Vite adds
        html = html.replace(
          /<link\s+rel="stylesheet"\s+crossorigin\s+href="\/assets\/index\.css">/g,
          ""
        );
        
        // Inject non-blocking CSS links before </head>
        const cssLinks = `
    <link rel="preload" as="style" href="/assets/index.css">
    <link rel="stylesheet" href="/assets/index.css" media="print" onload="this.media='all'">
    <noscript><link rel="stylesheet" href="/assets/index.css"></noscript>`;
        
        html = html.replace("</head>", `${cssLinks}\n  </head>`);
        
        return html;
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), nonBlockingCss()],
  server: {
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    chunkSizeWarningLimit: 5000,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name === "style.css") {
            return "assets/index.css";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base:'/plab/',
  plugins: [react()],
  server: {
    port: 5173, // 포트를 5173으로 고정
    proxy: {
      "/api": {
        target: "http://cococoa.tplinkdns.com:44445",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
      },
    },
  },
});

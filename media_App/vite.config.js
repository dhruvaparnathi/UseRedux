import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.UNSPLASH_API_KEY': JSON.stringify(env.UNSPLASH_API_KEY),
      'process.env.PEXELS_API_KEY': JSON.stringify(env.PEXELS_API_KEY),
      'process.env.GIPHY_API_KEY': JSON.stringify(env.GIPHY_API_KEY),
    }
  };
})

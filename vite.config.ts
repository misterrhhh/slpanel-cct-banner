import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // Use relative paths so assets (like CT/T backgrounds)
  // work when the build is served from a subfolder.
  base: './',
  build: {
    outDir: 'cct-banner',
    assetsDir: 'assets',
  },
})

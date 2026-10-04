import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build`        → site normal em /dist (para Vercel, Netlify etc.)
// `npm run build:single` → um único index.html autocontido em /dist-single
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), ...(mode === 'single' ? [viteSingleFile()] : [])],
  build: mode === 'single' ? { outDir: 'dist-single', assetsInlineLimit: 100_000_000 } : {},
}))

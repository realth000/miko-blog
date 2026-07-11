import path from 'node:path'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    mdx({
      remarkPlugins: [
        remarkGfm, // For styles including strikethrough.
      ],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.some((n) => n.includes('logo'))) {
            return 'assets/[name][extname]'
          }

          return 'assets/[name]_[hash][extname]'
        },
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// إعداد Vite للنشر على GitHub Pages
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  // مهم جدًا لـ GitHub Pages
  base: '/hadi_group/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})

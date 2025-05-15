import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 6000,
    allowedHosts: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'stores': path.resolve(__dirname, './src/stores'),
      'types': path.resolve(__dirname, './src/types'),
      'components': path.resolve(__dirname, './src/components'),
      'constants': path.resolve(__dirname, './src/constants'),
      'pages': path.resolve(__dirname, './src/pages'),
      'assets': path.resolve(__dirname, './src/assets')
    }
  }
})

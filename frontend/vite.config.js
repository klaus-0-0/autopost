import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
    host: true,
    allowedHosts: ['https://autopostf.onrender.com'], // keep only one line, remove <<<<<<< HEAD etc
  },
})

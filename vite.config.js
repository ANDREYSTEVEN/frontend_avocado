import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/frontend_avocado/', // 👈 esto debe coincidir con tu repositorio
})

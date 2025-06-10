import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      '**/*.{test,spec}.{js,jsx,ts,tsx}',  // patrón estándar
      '**/test*.{js,jsx,ts,tsx}'           // para tus archivos testLogin.js, etc.
    ]
  },
})
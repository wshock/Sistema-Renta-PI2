import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      '**/*.{test,spec}.{js,jsx,ts,tsx}',  
      '**/test*.{js,jsx,ts,tsx}'           
    ]
  },
})
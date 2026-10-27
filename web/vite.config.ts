import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages: https://mykamla.github.io/OCP21_training/
export default defineConfig({
  plugins: [react()],
  base: '/OCP21_training/',
})

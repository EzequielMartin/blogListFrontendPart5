import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3003",
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true, //Hace que no sea necesario usar palabras clave como describe, test y expect en las pruebas
    setupFiles: './testSetup.js',
  }
})

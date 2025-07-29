import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist/ui',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html')
            }
        }
    },
    server: {
        port: 5173
    },
    optimizeDeps: {
        include: ['react', 'react-dom']
    },
    esbuild: {
        target: 'es2022'
    }
}) 
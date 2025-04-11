import { defineConfig } from 'vite'

export default defineConfig({
    test: {
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,ts}']
    }
})
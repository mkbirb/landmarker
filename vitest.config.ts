import { defineConfig } from 'vitest/config'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config();

export default defineConfig({
  test: {
    // This tells Vitest where to find your files
    environment: 'node',
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
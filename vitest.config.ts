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
    onStackTrace(error, { file }) {
      // This forces Vitest to print the full stack trace even for "serialized" objects
      console.log("Full Error:", error);
      return true 
    },
  },
})
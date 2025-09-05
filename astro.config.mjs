// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ...otras configuraciones
  server: {
    host: true, // Esto hace que escuche en 0.0.0.0
  }
});
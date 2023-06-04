import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      external: ['three']
    }
  }
});


// export default {
//     // other configuration options
//     build: {
//       rollupOptions: {
//         external: ['three']
//       }
//     }
//   }
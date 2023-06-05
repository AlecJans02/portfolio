import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      external: ['three']
    },
    optimizeDeps: {
      include: ['portfolio/main.js']
    },
    server: {
      compress: false,
    },
    resolve: {
      alias: {
        three: 'three/build/three.module.js',
      }
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
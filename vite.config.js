// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // proxy: {
//     //   '/api': {
//     //     target: 'http://127.0.0.1:8000',
//     //     changeOrigin: true,
//     //      ws: true,
//     //     rewrite: (path) => path.replace(/^\/api/, '/api')  // Ne pas supprimer le préfixe /api
//     //   }
//     // },

//   }
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
   host:true,
   port:5173,
   strictPort:true,
   cors:true,
   headers:{
    'Access-Control-Allow-Origin': '*'
   },
   allowedHosts:"https://92e4-129-0-60-49.ngrok-free.app"
  },
});

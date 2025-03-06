// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'
dotenv.config()
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const port = parseInt(process.env.VITE_PORT,10) ;
  
  return {
    plugins: [react()],
    server: {
      strictPort: true,
      host: true,
      port: port, 
    },
  };
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Opções do SVGR (opcional)
      svgrOptions: {
        icon: true, // Se você quer tratar os SVGs como ícones
        // Outras opções podem ser adicionadas aqui
      }
    })
  ]
})
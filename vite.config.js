import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Si tu utilises React

export default defineConfig({
  plugins: [react()], // Supprime cette ligne si tu n'utilises pas React
  base: './', // Important pour les chemins relatifs
});

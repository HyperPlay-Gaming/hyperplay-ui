import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import svgr from 'vite-plugin-svgr'

import packageJson from './package.json'

export default defineConfig({
  publicDir: 'public',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    }),
    svgr()
  ],
  build: {
    minify: 'esbuild',
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        styles: resolve(__dirname, 'src/styles.ts')
      },
      name: 'HyperplayUI',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      input: [
        resolve(__dirname, './src/index.ts'),
        resolve(__dirname, './src/styles.ts')
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        exports: 'named',
        assetFileNames: 'styles.css'
      }
    }
  }
})

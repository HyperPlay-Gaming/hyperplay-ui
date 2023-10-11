/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
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
      include: ['src/']
    }),
    svgr(),
    viteStaticCopy({
      targets: [
        {
          src: 'src/styles',
          dest: ''
        },
        {
          src: 'src/fonts.css',
          dest: ''
        },
        {
          src: 'src/fonts',
          dest: ''
        }
      ]
    })
  ],
  build: {
    copyPublicDir: true,
    minify: 'esbuild',
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'HyperplayUI',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      input: [
        resolve(__dirname, './src/index.ts'),
        resolve(__dirname, './src/assets/images/index.tsx')
      ]
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts'
  }
})

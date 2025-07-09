import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgr from 'vite-plugin-svgr'
import banner from 'rollup-plugin-banner2'

import packageJson from './package.json'
import { ROLLUP_EXCLUDE_USE_CLIENT } from './rollup-exclude-use-client'

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
      outDir: 'dist/src'
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
    }),
    banner((chunk) => {
      if (!ROLLUP_EXCLUDE_USE_CLIENT.includes(chunk.fileName)) {
        return "'use client';\n"
      }

      return undefined
    })
  ],
  build: {
    copyPublicDir: true,
    minify: 'esbuild',
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'HyperplayUI',
      formats: ['es']
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      input: [
        resolve(__dirname, './src/assets/images/index.tsx'),
        resolve(__dirname, './src/index.ts')
      ],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          dir: resolve(__dirname, 'dist'),
          preserveModules: true,
          sourcemap: true
        }
      ]
    }
  }
})

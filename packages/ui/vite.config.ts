import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
// import { EsLinter, linterPlugin } from 'vite-plugin-linter'
import tsConfigPaths from 'vite-tsconfig-paths'
import packageJson from './package.json'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  publicDir: 'public',
  plugins: [
    react(),
    tsConfigPaths(),
    // linterPlugin({
    //   include: ['./src}/**/*.{ts,tsx}'],
    //   linters: [new EsLinter({ configEnv })],
    // }),
    dts({
      include: ['src/'],
    }),
    svgr()
  ],
  build: {
    copyPublicDir: true,
    minify: 'esbuild',
    cssCodeSplit: true,
    lib: {
      entry: resolve('src', 'index.ts'),
      name: 'HyperplayUI',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
})
import { mergeConfig } from 'vite'
import HyperPlayViteConfig from '../vite.config'
import { StorybookViteConfig } from '@storybook/builder-vite'
import svgr from 'vite-plugin-svgr'

let config: StorybookViteConfig = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config, { configType }) {
    // return the customized config
    console.log('hp config = ', JSON.stringify(HyperPlayViteConfig, null, 4))
    config.plugins?.push(svgr())
    const newConfig = mergeConfig(config, HyperPlayViteConfig);
    console.log('new config = ', JSON.stringify(newConfig, null, 4))
    return config
  }
}

module.exports = config;
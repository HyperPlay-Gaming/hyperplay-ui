import { mergeConfig } from 'vite'
import HyperPlayViteConfig from '../vite.config'
import { StorybookViteConfig } from '@storybook/builder-vite'
import svgr from 'vite-plugin-svgr'

let config: StorybookViteConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true
  },
  async viteFinal(config, { configType }) {
    // return the customized config
    config.plugins?.push(svgr())
    const newConfig = mergeConfig(config, HyperPlayViteConfig)
    return config
  }
}

module.exports = config

import { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

import HyperPlayViteConfig from '../vite.config'

let config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  core: {},
  features: {
    storyStoreV7: true
  },
  async viteFinal(config, { configType }) {
    // const newConfig = mergeConfig(config, {
    //   ...HyperPlayViteConfig
    // })
    return config
  },
  docs: {
    autodocs: true
  }
}
module.exports = config

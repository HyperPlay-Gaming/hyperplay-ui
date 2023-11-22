import { StorybookConfig } from '@storybook/react-vite'

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
  async viteFinal(config) {
    return config
  },
  docs: {
    autodocs: true
  }
}
module.exports = config

import { StorybookConfig } from '@storybook/react-vite'

let config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
    '@storybook/addon-viewport'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {}
  },

  core: {},

  async viteFinal(config) {
    return config
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  staticDirs: ['../src/assets']
}
module.exports = config

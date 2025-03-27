import { ViewportMap } from '@storybook/addon-viewport'
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport'

export const ALL_VIEWPORTS: ViewportMap = {
  ...MINIMAL_VIEWPORTS,
  desktop: {
    name: 'Desktop',
    type: 'desktop',
    styles: {
      width: '1920px',
      height: '1080px'
    }
  }
}

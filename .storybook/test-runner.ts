import { ViewportStyles } from '@storybook/addon-viewport'
import type { TestRunnerConfig } from '@storybook/test-runner'
import { getStoryContext } from '@storybook/test-runner'

import { ALL_VIEWPORTS } from './viewports'

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 }

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    // Accesses the story's parameters and retrieves the viewport used to render it
    const context = await getStoryContext(page, story)
    const viewportName = context.parameters?.viewport?.defaultViewport
    const viewportParameter = ALL_VIEWPORTS[viewportName]

    if (viewportParameter) {
      const viewportStyles = viewportParameter.styles
      if (
        viewportStyles === null ||
        (typeof viewportStyles === 'object' &&
          (typeof viewportStyles.width !== 'string' ||
            typeof viewportStyles.height !== 'string'))
      ) {
        throw 'could not set up viewport in preVisit'
      }
      const viewportSize = viewportStyles as ViewportStyles
      // Configures the Playwright page to use the viewport size
      page.setViewportSize({
        width: parseInt(viewportSize.width),
        height: parseInt(viewportSize.height)
      })
    } else {
      page.setViewportSize(DEFAULT_VIEWPORT_SIZE)
    }
  }
}

export default config

import { ViewportStyles } from '@storybook/addon-viewport'
import type { TestRunnerConfig } from '@storybook/test-runner'
import { getStoryContext } from '@storybook/test-runner'

import { ALL_VIEWPORTS } from './viewports'

const DEFAULT_VIEWPORT_SIZE = { width: 1280, height: 720 }

/**
 * hacky but handles the error "SB_PREVIEW_API_0011 (StoryStoreAccessedBeforeInitializationError): Cannot access the Story Store until the index is ready"
 * https://github.com/storybookjs/test-runner/issues/442#issuecomment-2697318195
 */
async function waitForStoryContext(
  page: any,
  story: any,
  attempt = 1,
  maxAttempts = 20
) {
  try {
    return await getStoryContext(page, story)
  } catch (e) {
    if (attempt > maxAttempts) {
      throw e
    }
    // ¯\_(ツ)_/¯ - If this is not the first attempt: add a timeout.
    await new Promise((resolve) => setTimeout(resolve, 600))
    return waitForStoryContext(page, story, attempt + 1)
  }
}

const config: TestRunnerConfig = {
  async preVisit(page, story) {
    // Accesses the story's parameters and retrieves the viewport used to render it
    const context = await waitForStoryContext(page, story)
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

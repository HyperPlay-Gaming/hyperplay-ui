// .storybook/test-runner.ts
import { type TestRunnerConfig } from '@storybook/test-runner'

const config: TestRunnerConfig = {
  async preVisit(page) {
    if (await page.evaluate(() => !('takeScreenshot' in window))) {
      await page.exposeBinding('takeScreenshot', async ({ page }) => {
        const image = await page
          .locator('#storybook-root')
          .screenshot({ path: 'screenshot.png' })
      })
    }
  }
}

export default config

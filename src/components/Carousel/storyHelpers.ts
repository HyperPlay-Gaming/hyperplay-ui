import { wait } from '@hyperplay/utils'
import { expect, within } from '@storybook/test'

/**
 * @dev it is okay if slide overflows on bottom since we match width and keep the aspect ratio
 */
function slideIsVisible(slide: HTMLElement) {
  const box = slide.getBoundingClientRect()
  return (
    Math.ceil(box.top) >= 0 &&
    Math.ceil(box.left) >= 0 &&
    // there is some easing on the slide transition. some tolerance makes testing easier
    Math.floor(box.right) <= Math.ceil(window.innerWidth) + 16
  )
}

export async function expectSlideToBeVisible(slide: HTMLElement) {
  await expect(slide).toBeVisible()
  return expect(slideIsVisible(slide)).toBeTruthy()
}

export async function expectSlideToNotBeVisible(slide: HTMLElement) {
  return expect(slideIsVisible(slide)).toBeFalsy()
}

export async function expectItemsVisibility(
  canvas: ReturnType<typeof within>,
  isVisible: boolean[],
  testIdPrefix = 'carousel-controller-item-'
) {
  for (let i = 0; i < isVisible.length; ++i) {
    if (isVisible[i]) {
      await expect(canvas.getByTestId(`${testIdPrefix}${i}`)).toBeDefined()
    } else {
      const allItemsWithId = await canvas.queryByTestId(`${testIdPrefix}${i}`)
      await expect(allItemsWithId).toBe(null)
    }
  }
}

export async function expectSlidesVisibility(
  canvas: ReturnType<typeof within>,
  isVisible: boolean[],
  testIdPrefix = 'img-slide-'
) {
  for (let i = 0; i < isVisible.length; ++i) {
    if (isVisible[i]) {
      await expectSlideToBeVisible(canvas.getByTestId(`${testIdPrefix}${i}`))
    } else {
      await expectSlideToNotBeVisible(canvas.getByTestId(`${testIdPrefix}${i}`))
    }
  }
}

export async function checkThatLoaderBarStopped(
  canvas: ReturnType<typeof within>,
  loaderTestId: string
) {
  await wait(1000)
  const pausedLoaderWidthBefore = getLoaderBarWidth(canvas, loaderTestId)
  await wait(500)
  const pausedLoaderWidthAfter = getLoaderBarWidth(canvas, loaderTestId)
  expect(pausedLoaderWidthAfter).toEqual(pausedLoaderWidthBefore)
  return pausedLoaderWidthAfter
}

export function getLoaderBarWidth(
  canvas: ReturnType<typeof within>,
  loaderTestId: string
) {
  const itemLoader0 = canvas.getByTestId(loaderTestId)
  return itemLoader0.clientWidth
}

export async function checkThatLoaderBarIsProgressing(
  canvas: ReturnType<typeof within>,
  loaderTestId: string
) {
  await wait(1000)
  const pausedLoaderWidthBefore = getLoaderBarWidth(canvas, loaderTestId)
  await wait(500)
  const pausedLoaderWidthAfter = getLoaderBarWidth(canvas, loaderTestId)
  expect(pausedLoaderWidthAfter).toBeGreaterThan(pausedLoaderWidthBefore)
  return pausedLoaderWidthAfter
}

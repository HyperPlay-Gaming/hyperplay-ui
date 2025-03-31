export function scrollHorizontalIntoViewWithOffset(
  containerId: string,
  itemId: string,
  offsetInPx: number
) {
  const element = document.getElementById(itemId)
  const scrollableDiv = document.getElementById(containerId)
  if (element && scrollableDiv) {
    const rect = element.getBoundingClientRect()
    const scrollableDivRect = scrollableDiv.getBoundingClientRect()
    if (scrollableDiv) {
      const paddingPx = offsetInPx
      const farRightScrollableOffset =
        scrollableDiv.scrollLeft + scrollableDiv.clientWidth - paddingPx
      const shouldScrollRight =
        rect.right - scrollableDivRect.x + scrollableDiv.scrollLeft >
        farRightScrollableOffset
      const farLeftScrollableOffset = scrollableDiv.scrollLeft + paddingPx
      const shouldScrollLeft =
        farLeftScrollableOffset >
        rect.left - scrollableDivRect.x + scrollableDiv.scrollLeft
      if (shouldScrollRight) {
        scrollableDiv.scrollTo({
          left:
            rect.right -
            scrollableDivRect.x +
            scrollableDiv.scrollLeft +
            paddingPx -
            scrollableDiv.clientWidth,
          behavior: 'smooth'
        })
      } else if (shouldScrollLeft) {
        scrollableDiv.scrollTo({
          left:
            rect.left -
            scrollableDivRect.x +
            scrollableDiv.scrollLeft -
            paddingPx,
          behavior: 'smooth'
        })
      }
    }
  }
}

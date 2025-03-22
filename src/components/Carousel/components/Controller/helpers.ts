export function scrollHorizontalIntoViewWithOffset(
  containerId: string,
  itemId: string,
  offsetInPx: number
) {
  const element = document.getElementById(itemId)
  if (element) {
    const rect = element.getBoundingClientRect()
    const scrollableDiv = document.getElementById(containerId)
    if (scrollableDiv) {
      const paddingPx = offsetInPx
      const farRightScrollableOffset =
        scrollableDiv.scrollLeft + scrollableDiv.clientWidth - paddingPx
      const shouldScrollRight =
        rect.right + scrollableDiv.scrollLeft > farRightScrollableOffset
      const farLeftScrollableOffset = scrollableDiv.scrollLeft + paddingPx
      const shouldScrollLeft =
        farLeftScrollableOffset > rect.left + scrollableDiv.scrollLeft
      if (shouldScrollRight) {
        scrollableDiv.scrollTo({
          left:
            rect.right +
            scrollableDiv.scrollLeft +
            paddingPx -
            scrollableDiv.clientWidth,
          behavior: 'smooth'
        })
      } else if (shouldScrollLeft) {
        scrollableDiv.scrollTo({
          left: rect.left + scrollableDiv.scrollLeft - paddingPx,
          behavior: 'smooth'
        })
      }
    }
  }
}


export function getTruncatedUrl(url: string) {
  if (!url) return ''

  if (url.length  > 25) {
    return url.slice(0, 25) + '...'
  }

  return url.slice(0, 15) + '...'
}
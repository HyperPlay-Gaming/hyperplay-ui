// need to keep type as undefined because hyperplay-dev create quests form sometimes passes undefined
export function getTruncatedAddress(addr?: string) {
  if (addr === undefined) {
    return ''
  }
  return addr.slice(0, 5) + '...' + addr.slice(-5)
}

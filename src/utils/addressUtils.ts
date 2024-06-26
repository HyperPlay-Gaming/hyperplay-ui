export function getTruncatedAddress(addr: string, length = 5) {
  if (!addr) return ''
  if (addr.length < length * 2 + 3) return addr // 3 dots + length * 2 chars
  return addr.slice(0, length) + '...' + addr.slice(-length)
}

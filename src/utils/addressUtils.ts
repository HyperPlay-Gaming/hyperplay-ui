export function getTruncatedAddress(addr: string, length = 5) {
  if (!addr) return ''
  if (addr.length <= length * 2 + 2) return addr
  return addr.slice(0, length) + '...' + addr.slice(-length)
}

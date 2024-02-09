export function getTruncatedAddress(addr: string) {
  if (!addr) return ''
  
  return addr.slice(0, 5) + '...' + addr.slice(-5)
}

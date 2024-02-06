export function getTruncatedAddress(addr: string) {
  return addr.slice(0, 5) + '...' + addr.slice(-5)
}

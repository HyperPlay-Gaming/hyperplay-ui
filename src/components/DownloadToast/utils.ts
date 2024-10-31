import { bytesUnits, parseNumIntoReadableString } from '@hyperplay/utils'

export const size = (arg: number) =>
  parseNumIntoReadableString({
    num: String(arg),
    units: bytesUnits,
    minValue: '0',
    maxValue: '0'
  })

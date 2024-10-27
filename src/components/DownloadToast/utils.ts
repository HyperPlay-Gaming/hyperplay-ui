import * as fileSize from 'filesize'

export const size = fileSize.partial({ base: 10, round: 1, spacer: '' }) as (
  arg: unknown
) => string

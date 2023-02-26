import axios from 'axios'
import type { ReleaseList, ListingsQueryParams } from './games.types'

const URL = 'https://developers.hyperplay.xyz/api/listings'

export async function getGames(
  queryParams: ListingsQueryParams
): Promise<ReleaseList> {
  const res = await fetch(URL + new URLSearchParams(queryParams), {
    next: {
      revalidate: 60 * 5
    }
  })

  return res.json()
}

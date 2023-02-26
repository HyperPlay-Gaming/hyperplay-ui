import { Release } from '@/api/games.types'
import getYouTubeVideoId from '@/utils/getYouTubeId'
import getYouTubeThumbnail from '@/utils/getYouTubeThumbnail'

interface BaseMedia {
  type: 'image' | 'youtube'
}

interface ImageMedia extends BaseMedia {
  type: 'image'
  src: string
}

interface YouTubeMedia extends BaseMedia {
  type: 'youtube'
  youtubeId: string
  thumbnail: string
}

export function getMediaFromRelease(
  release: Release | undefined
): (ImageMedia | YouTubeMedia)[] {
  return release
    ? release.projectMeta.gallery.map((item) => {
        if (item.type === 'image') {
          return {
            type: 'image',
            src: item.src
          }
        }

        if (item.type === 'youtube') {
          const youtubeId = getYouTubeVideoId(item.src)

          if (youtubeId)
            return {
              type: 'youtube',
              youtubeId,
              thumbnail: getYouTubeThumbnail(youtubeId)
            }
        }

        return {
          type: 'image',
          src: ''
        }
      })
    : []
}

import { useEffect, useState } from 'react'

export default function useAllImagesLoaded(images: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
  useEffect(() => {
    const loadImage = async (image: string) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.onload = () => resolve(image)

        setTimeout(() => {
          resolve(image)
        }, 3000)

        loadImg.onerror = (err) => reject(err)
        loadImg.onabort = (err) => reject(err)
        loadImg.src = image
      })
    }

    Promise.allSettled(images.map(async (img) => loadImage(img)))
      .then(() => setImagesLoaded(true))
      .catch((err) =>
        console.error(`Failed to load images  ${err.toString()}`, err)
      )
  }, [])

  return imagesLoaded
}

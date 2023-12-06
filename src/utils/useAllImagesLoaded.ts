import { useEffect, useState } from 'react'

export default function useAllImagesLoaded(images: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)
  useEffect(() => {
    const loadImage = async (image: string) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = image
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            resolve(image)
          }, 5000)

        loadImg.onerror = (err) => reject(err)
        loadImg.onabort = (err) => reject(err)
      })
    }

    Promise.allSettled(images.map(async (img) => loadImage(img)))
      .then(() => setImagesLoaded(true))
      .catch((err) =>
        console.log(`Failed to load images  ${err.toString()}`, err)
      )
  }, [])

  return imagesLoaded
}

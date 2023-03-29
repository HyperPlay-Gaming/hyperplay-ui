async function preloadImages(imageUrls: string[]): Promise<void> {
  await Promise.allSettled(
    imageUrls.map(
      async (url) =>
        new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.onerror = resolve
          img.onabort = resolve
          img.src = url
        })
    )
  ).then(() => console.log('w00t'))
}

export default preloadImages

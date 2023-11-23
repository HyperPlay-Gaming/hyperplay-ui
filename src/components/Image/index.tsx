import React, { ReactNode, forwardRef, useState } from 'react'

import { Image, ImageProps, createPolymorphicComponent } from '@mantine/core'

export interface CustomImageProps extends ImageProps {
  placeholder?: string | ReactNode
}

const CustomImage = createPolymorphicComponent<'img', CustomImageProps>(
  forwardRef<HTMLImageElement, CustomImageProps>(function CustomImage(
    { placeholder: Placeholder, fallbackSrc, ...props }: CustomImageProps,
    ref
  ) {
    const [loadError, setLoadError] = useState(false)

    console.log(props)

    if ((loadError && Placeholder) || (loadError && fallbackSrc)) {
      if (typeof Placeholder === 'string' || fallbackSrc) {
        return (
          <Image
            ref={ref}
            fallbackSrc={fallbackSrc || (Placeholder as string)}
            onError={(error) => {
              setLoadError(true)

              props?.onError?.(error)
            }}
            {...props}
          />
        )
      }

      return <>{Placeholder}</>
    }

    return (
      <Image
        ref={ref}
        onError={(error) => {
          setLoadError(true)

          props?.onError?.(error)
        }}
        {...props}
      />
    )
  })
)

export default CustomImage

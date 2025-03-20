import React, { HTMLProps } from 'react'

import { Loader, LoaderProps } from '@mantine/core'
import classNames from 'classnames'

import styles from './Loading.module.scss'

interface LoadingProps extends HTMLProps<HTMLDivElement> {
  loaderProps?: LoaderProps
}

export default function Loading({
  className,
  loaderProps,
  ...props
}: LoadingProps) {
  return (
    <div
      className={classNames(styles.loadingSpinnerContainer, className)}
      {...props}
    >
      <Loader size={30} color="var(--color-neutral-100)" {...loaderProps} />
    </div>
  )
}

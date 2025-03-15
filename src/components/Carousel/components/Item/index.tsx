import React from 'react'

import cn from 'classnames'

import styles from './Item.module.scss'

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  imageElement: JSX.Element
  onClick: () => void
  showGradientBorder?: boolean
  showLoadBar?: boolean
}

const Item = ({
  isActive,
  imageElement,
  onClick,
  showGradientBorder = true,
  showLoadBar,
  ...props
}: ItemProps) => {
  let border = null
  if (showGradientBorder) {
    border = <div className={styles.border} />
  }
  let loadBar = null
  if (showLoadBar) {
    loadBar = <div />
  }
  return (
    <div
      className={cn(styles.itemContainer, { [styles.active]: isActive })}
      onClick={onClick}
      {...props}
    >
      {border}
      <div className={styles.imageContainer}>{imageElement}</div>
      {loadBar}
    </div>
  )
}

export default Item

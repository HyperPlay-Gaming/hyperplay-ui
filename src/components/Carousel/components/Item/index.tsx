import React from 'react'

import cn from 'classnames'

import styles from './Item.module.scss'

interface ItemProps {
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
  showLoadBar
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
    >
      {border}
      <div className={styles.imageContainer}>{imageElement}</div>
      {loadBar}
    </div>
  )
}

export default Item

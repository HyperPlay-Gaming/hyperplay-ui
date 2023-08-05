import React from 'react'

import classNames from 'classnames'

import styles from './Item.module.scss'

interface ItemProps {
  isActive: boolean
  imageElement: JSX.Element
  onClick: () => void
}

const Item = ({ isActive, imageElement, onClick }: ItemProps) => (
  <div
    className={classNames(styles.itemContainer, { [styles.active]: isActive })}
    onClick={onClick}
  >
    <div className={styles.border} />
    <div className={styles.imageContainer}>{imageElement}</div>
  </div>
)

export default Item

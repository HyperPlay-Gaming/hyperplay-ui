import React, { HTMLAttributes, PropsWithChildren, useState } from 'react'

import { chainMap } from '@hyperplay/chains'
import { Popover, Tooltip } from '@mantine/core'
import classNames from 'classnames'

import styles from './BlockchainsStack.module.scss'
import BlockchainIcon from '../BlockchainIcon'

export interface BlockchainsStackProps
  extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  title?: string
  chainId?: string[]
  maxVisible?: number
  showMoreCount?: boolean
  className?: string
  // Next/Image can be passed in here to use instead of img tag
  /* eslint-disable-next-line */
  Image?: any
  ipfsBaseUrl?: string
  i18n?: {
    chainId: string
  }
}

const BlockchainsStack = ({
  chainId = [],
  title = 'BLOCKCHAIN(S):',
  maxVisible = 5,
  showMoreCount = true,
  className,
  Image = 'img',
  ipfsBaseUrl = 'https://ipfs.io/ipfs/',
  i18n = {
    chainId: 'Chain id'
  },
  ...props
}: BlockchainsStackProps) => {
  const [isMoreHovered, setIsMoreHovered] = useState(false)

  const blockchains = chainId.map((id) => {
    const chain = chainMap[id]
    return {
      name: chain?.chain.name || `${i18n.chainId}: ${id}`,
      chainId: id
    }
  })

  const visibleBlockchains = blockchains.slice(0, maxVisible)
  const moreCount = blockchains.length - maxVisible
  const hasMoreBlockchains = moreCount > 0
  const remainingBlockchains = blockchains.slice(maxVisible)

  return (
    <div className={classNames(styles.blockchains, className)} {...props}>
      <span className={styles.title}>{title}</span>
      <div className={styles.blockchainIcons}>
        {visibleBlockchains.map((blockchain, index) => (
          <Tooltip
            key={`blockchain-${index}`}
            label={blockchain.name}
            className={styles.tooltip}
            events={{ hover: true, touch: true, focus: false }}
          >
            <div className={styles.icon}>
              <BlockchainIcon
                chainId={blockchain.chainId}
                ipfsBaseUrl={ipfsBaseUrl}
                ImageComponent={Image}
                className={styles.blockchainSvg}
              />
            </div>
          </Tooltip>
        ))}
        {hasMoreBlockchains && showMoreCount && (
          <Popover
            opened={isMoreHovered}
            position="top"
            withArrow
            classNames={{
              dropdown: styles.popover,
              arrow: styles.popoverArrow
            }}
          >
            <Popover.Target>
              <div
                className={styles.more}
                data-testid="blockchain-more-button"
                onMouseEnter={() => setIsMoreHovered(true)}
                onMouseLeave={() => setIsMoreHovered(false)}
              >
                <span className={styles.moreCount}>+{moreCount}</span>
              </div>
            </Popover.Target>
            <Popover.Dropdown>
              <div className={styles.popoverContent}>
                {remainingBlockchains.map((blockchain, index) => (
                  <div
                    key={`remaining-${index}`}
                    className={styles.popoverItem}
                  >
                    <BlockchainIcon
                      chainId={blockchain.chainId}
                      ipfsBaseUrl={ipfsBaseUrl}
                      ImageComponent={Image}
                      className={styles.popoverIcons}
                    />
                    <span className={styles.popoverBlockchainsName}>
                      {blockchain.name}
                    </span>
                  </div>
                ))}
              </div>
            </Popover.Dropdown>
          </Popover>
        )}
      </div>
    </div>
  )
}

export default BlockchainsStack

import React, { HTMLAttributes, PropsWithChildren, useState } from 'react'

import { chainMap } from '@hyperplay/chains'
import { Popover, Tooltip } from '@mantine/core'
import classNames from 'classnames'

import BlockchainIconImg from '@/assets/images/BlockchainIconImg.svg?url'

import styles from './BlockchainsStack.module.scss'

const formatIpfsUrl = (ipfsBaseUrl: string, url?: string) => {
  if (!url) return ''
  return url.replace('ipfs://', ipfsBaseUrl)
}

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
}

const BlockchainsStack = ({
  chainId = [],
  title = 'BLOCKCHAIN(S):',
  maxVisible = 5,
  showMoreCount = true,
  className,
  Image = 'img',
  ipfsBaseUrl = 'https://ipfs.io/ipfs/',
  ...props
}: BlockchainsStackProps) => {
  const [isMoreHovered, setIsMoreHovered] = useState(false)
  const [missingIcon, setMissingIcon] = useState<Record<string, boolean>>({})

  const blockchains = chainId.map((id) => {
    const chain = chainMap[id]
    const iconUrl = chain?.icon?.[0]?.url
      ? formatIpfsUrl(ipfsBaseUrl, chain.icon[0].url)
      : ''
    return {
      name: chain?.chain.name || id,
      iconUrl
    }
  })

  const handleImageError = (iconUrl: string) => {
    setMissingIcon((prev) => ({ ...prev, [iconUrl]: true }))
  }

  const getIconSrc = (iconUrl: string) => {
    if (!iconUrl || missingIcon[iconUrl]) {
      return BlockchainIconImg
    }
    return iconUrl
  }

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
          >
            <div className={styles.icon}>
              <Image
                src={getIconSrc(blockchain.iconUrl)}
                alt={blockchain.name}
                className={styles.blockchainSvg}
                onError={() => handleImageError(blockchain.iconUrl)}
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
                    <Image
                      src={getIconSrc(blockchain.iconUrl)}
                      alt={blockchain.name}
                      className={styles.popoverIcons}
                      onError={() => handleImageError(blockchain.iconUrl)}
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

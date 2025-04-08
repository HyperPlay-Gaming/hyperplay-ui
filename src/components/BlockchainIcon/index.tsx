import React, { useState } from 'react'
import { chainIconsSrcOverrides } from '@/utils/chainIconSrcOverrides'
import BlockchainIconImg from '@/assets/images/BlockchainIconImg.svg?url'
import { chainMap } from '@hyperplay/chains'

interface BlockchainIconProps {
  chainId: string
  className?: string
  ipfsBaseUrl?: string
  /* eslint-disable-next-line */
  ImageComponent?: any // Allow for a custom image component
}

const formatIpfsUrl = (ipfsBaseUrl: string, url?: string) => {
  if (!url) return ''
  return url.replace('ipfs://', ipfsBaseUrl)
}

const BlockchainIcon: React.FC<BlockchainIconProps> = ({
  chainId,
  className,
  ipfsBaseUrl = 'https://ipfs.io/ipfs/',
  ImageComponent = 'img' // Default to 'img' if no custom component is provided
}) => {
  const [missingIcon, setMissingIcon] = useState<boolean>(false)

  let iconUrl = undefined
  if (chainIconsSrcOverrides[chainId]) {
    iconUrl = chainIconsSrcOverrides[chainId]
  } else if (missingIcon) {
    iconUrl = BlockchainIconImg
  } else if (Object.hasOwn(chainMap, chainId)) {
    const chain = chainMap[chainId]
    iconUrl = chain?.icon?.[0]?.url
      ? formatIpfsUrl(ipfsBaseUrl, chain.icon[0].url)
      : undefined
  }
  if (iconUrl === undefined) {
    iconUrl = BlockchainIconImg
  }

  const handleImageError = () => {
    setMissingIcon(true)
  }

  return (
    <ImageComponent
      src={iconUrl}
      alt={`blockchain-icon-for-chain-id-${chainId}`}
      className={className}
      onError={() => handleImageError()}
    />
  )
}

export default BlockchainIcon

import React from 'react'
import { useGetChainIconSrc } from '@/utils/useGetChainIconSrc'

interface BlockchainIconProps {
  chainId: string
  className?: string
  ipfsBaseUrl?: string
  /* eslint-disable-next-line */
  ImageComponent?: any // Allow for a custom image component
}

const BlockchainIcon: React.FC<BlockchainIconProps> = ({
  chainId,
  className,
  ipfsBaseUrl = 'https://ipfs.io/ipfs/',
  ImageComponent = 'img' // Default to 'img' if no custom component is provided
}) => {
  const { iconUrl, handleImageError } = useGetChainIconSrc(chainId, ipfsBaseUrl)

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

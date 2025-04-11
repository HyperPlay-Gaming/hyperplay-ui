import { useState, useEffect } from 'react'
import { chainIconsSrcOverrides } from '@/utils/chainIconSrcOverrides'
import BlockchainIconImg from '@/assets/images/BlockchainIconImg.svg?url'
import { chainMap } from '@hyperplay/chains'

export function getChainIconSrc(
  missingIcon: boolean,
  chainId: string,
  ipfsBaseUrl: string
) {
  let url = undefined
  if (chainIconsSrcOverrides[chainId]) {
    url = chainIconsSrcOverrides[chainId]
  } else if (missingIcon) {
    url = BlockchainIconImg
  } else if (Object.hasOwn(chainMap, chainId)) {
    const chain = chainMap[chainId]
    url = chain?.icon?.[0]?.url
      ? chain.icon[0].url.replace('ipfs://', ipfsBaseUrl)
      : undefined
  }
  if (url === undefined) {
    url = BlockchainIconImg
  }
  return url
}

export const useGetChainIconSrc = (
  chainId: string,
  ipfsBaseUrl = 'https://ipfs.io/ipfs/'
) => {
  const [iconUrl, setIconUrl] = useState<string | undefined>(undefined)
  const [missingIcon, setMissingIcon] = useState<boolean>(false)

  useEffect(() => {
    const url = getChainIconSrc(missingIcon, chainId, ipfsBaseUrl)
    setIconUrl(url)
  }, [chainId, ipfsBaseUrl, missingIcon])

  const handleImageError = () => {
    setMissingIcon(true)
  }

  return { iconUrl, handleImageError }
}

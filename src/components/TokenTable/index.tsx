import React, { useEffect, useState } from 'react'

import { getChainMetadata } from '@hyperplay/chains'
import { Menu } from '@mantine/core'
// backend types
import { ContractMetadata } from '@valist/sdk/dist/typesApi'

import { Blockchain, DownArrow, Info, Token } from '@/assets/images'

import Button from '../Button'
import styles from './TokenTable.module.scss'

// types used in this component

interface NetworkRequirements {
  chainId: string
  tokens: TokenMetadata[]
}

type TokenType = 'fungible' | 'semiFungible' | 'nonFungible' | 'other'

interface TokenMetadata {
  address: string | null
  icon?: string | null
  type?: TokenType | null
  name?: string
  marketplaceUrls?: string[]
}

interface TokenTableProps
  extends React.DetailedHTMLProps<
    React.TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  contracts: ContractMetadata[]
  getTokenEnabled?: boolean
  onTokenClick: (tokenAddress: string | null) => void
  onGetTokenClick: (tokenAddress: string | null) => void
}

function getTokenTypeDisplayName(type: TokenType) {
  if (type === 'fungible') return 'Token'
  if (type === 'semiFungible') return 'Token'
  if (type === 'nonFungible') return 'NFT'
  if (type === 'other') return 'Other'
}

function getNetworkRequirements(contracts: ContractMetadata[]) {
  const netReqs: NetworkRequirements[] = []

  const chainIds: { [key: string]: TokenMetadata[] } = {}
  contracts.forEach((contract) => {
    if (!Object.hasOwn(chainIds, contract.chain_id))
      chainIds[contract.chain_id] = []
    chainIds[contract.chain_id].push({
      address: contract.address,
      icon: contract.icon,
      type: contract.type,
      name: contract.name,
      marketplaceUrls: contract.marketplace_urls
    })
  })

  for (const chainId in chainIds) {
    netReqs.push({
      chainId: chainId,
      tokens: chainIds[chainId]
    })
  }

  return netReqs
}

export default function TokenTable({
  contracts,
  getTokenEnabled = false,
  onTokenClick,
  onGetTokenClick,
  className,
  ...props
}: TokenTableProps) {
  const [allRows, setAllRows] = useState(<></>)
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
    {}
  )

  const networkReqs = getNetworkRequirements(contracts)

  useEffect(() => {
    getAllRows().then((val) => setAllRows(<>{val}</>))
  }, [expandedRows])

  function toggleExpanded(chainRowIndex: number) {
    let expanded = false
    if (
      !Object.hasOwn(expandedRows, chainRowIndex) ||
      !expandedRows[chainRowIndex]
    ) {
      expanded = true
    }
    const updatedValue: { [key: number]: boolean } = {}
    updatedValue[chainRowIndex] = expanded
    setExpandedRows((expandedRows) => ({ ...expandedRows, ...updatedValue }))
  }

  function getTokenType(token: TokenMetadata) {
    return token.type ? getTokenTypeDisplayName(token?.type) : 'Unknown'
  }

  function getTokenName(token: TokenMetadata) {
    let addressName = 'Unknown'
    if (token.address) {
      addressName =
        token.address.substring(0, 10) +
        (token.address.length > 10 ? '...' : '')
    }
    return token.name ? token?.name : addressName
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  function getAllTokenRows(tokens: TokenMetadata[], meta: any) {
    const allTokenRows = []
    for (const token of tokens) {
      const address = token.address
      allTokenRows.push(
        <tr key={token.address}>
          <td>
            <Token fill="var(--color-neutral-100)" />
          </td>
          <td>
            <Button
              type="link"
              size="small"
              onClick={(event) => {
                event?.stopPropagation()
                onTokenClick(address)
              }}
            >
              <a
                href={
                  meta.chain.explorers && meta.chain.explorers.length > 0
                    ? `${meta.chain.explorers[0].url}/address/${address}`
                    : ''
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {getTokenName(token)}
              </a>
            </Button>
          </td>
          <td>
            {/* if we don't have a marketplace url, then we have no url to open on get token click */}
            {getTokenEnabled && token.marketplaceUrls?.length ? (
              <div>
                {getTokenType(token)}

                <span
                  style={{
                    margin: '0 0 0 auto'
                  }}
                >
                  <Button
                    type="secondary"
                    size="small"
                    onClick={(event) => {
                      event?.stopPropagation()
                      onGetTokenClick(address)
                    }}
                  >
                    <div className="caption-sm">Get token</div>
                  </Button>
                </span>
              </div>
            ) : (
              getTokenType(token)
            )}
          </td>
        </tr>
      )
    }
    return allTokenRows
  }

  async function getAllRows() {
    const allRows = []
    for (const [i, networkReq_i] of networkReqs.entries()) {
      let meta
      try {
        meta = await getChainMetadata(networkReq_i.chainId)
      } catch (err) {
        console.warn(err)
        meta = {
          icon: [],
          chain: { name: 'Unknown Chain', nativeCurrency: { symbol: '???' } }
        }
      }
      let ipfsHash = ''
      if (meta.icon && meta.icon.length > 0)
        ipfsHash = meta.icon[0].url.split('//')[1]
      const imgUrl = `https://ipfs.io/ipfs/${ipfsHash}`

      const hasTokens = networkReq_i.tokens.length > 0

      const rowStyle = { cursor: 'default' }
      const showDropdown = hasTokens && expandedRows[i]
      if (hasTokens) rowStyle.cursor = 'pointer'
      allRows.push(
        <>
          <tr
            className={`caption ${hasTokens ? styles.chainRow : ''} ${
              showDropdown ? styles.expanded : ''
            }`}
            style={rowStyle}
            onClick={() => toggleExpanded(i)}
            key={networkReq_i.chainId}
          >
            <td
              className={styles.icon}
              style={(() => {
                if (showDropdown)
                  return {
                    borderBottomLeftRadius: '0px'
                  }
              })()}
            >
              <div>
                {ipfsHash === '' ? (
                  <Blockchain fill="var(--color-neutral-100)" />
                ) : (
                  <img src={imgUrl} />
                )}
              </div>
            </td>
            <td>
              <div>{meta.chain.name}</div>
            </td>
            {!hasTokens ? (
              <td>
                <div>
                  <div
                    style={{
                      marginRight: 'auto',
                      marginLeft: '0px',
                      position: 'relative'
                    }}
                  >
                    {meta.chain.nativeCurrency.symbol}
                    <Menu trigger="hover" position="top-start">
                      <Menu.Target>
                        <div className={`caption-sm ${styles.infoText}`}>
                          <Info fill="var(--color-neutral-400)" />
                          Network fee
                        </div>
                      </Menu.Target>
                      <Menu.Dropdown className={styles.infoDropdown}>
                        <div className="caption">Network token fee</div>
                        <div className="caption-sm">
                          This token is required to pay for transactions on this
                          network.
                        </div>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                </div>
              </td>
            ) : (
              <td
                style={(() => {
                  if (showDropdown)
                    return {
                      borderBottomRightRadius: '0px'
                    }
                })()}
              >
                <div>
                  <div>
                    {showDropdown
                      ? `Click to hide all tokens`
                      : `Click to see all tokens`}
                    <Menu trigger="hover" position="top-start">
                      <Menu.Target>
                        <div className={`caption-sm ${styles.infoText}`}>
                          <Info fill="var(--color-neutral-400)" width={16} />
                          <div className="caption-sm">Token gated access</div>
                        </div>
                      </Menu.Target>
                      <Menu.Dropdown className={styles.infoDropdown}>
                        <div className="caption">Token gated access</div>
                        <div className="caption-sm">
                          Some game content may require these tokens
                        </div>
                      </Menu.Dropdown>
                    </Menu>
                  </div>
                  <div
                    style={{
                      margin: '0 0 0 auto',
                      transform: `rotate(${expandedRows[i] ? 180 : 0}deg)`,
                      height: '7px',
                      width: '14px',
                      position: 'relative'
                    }}
                  >
                    <DownArrow
                      fill="var(--color-neutral-100)"
                      stroke="var(--color-neutral-100)"
                      width="100%"
                      height="100%"
                      style={{
                        position: 'absolute',
                        top: '0px',
                        left: '0px'
                      }}
                    />
                  </div>
                </div>
              </td>
            )}
          </tr>
          {showDropdown ? (
            <tr
              style={rowStyle}
              className={`${styles.tokenRow}`}
              onClick={() => toggleExpanded(i)}
              key={`${networkReq_i.chainId}_dropdown`}
            >
              <td
                colSpan={3}
                style={(() => {
                  if (showDropdown)
                    return {
                      borderTopLeftRadius: '0px',
                      borderTopRightRadius: '0px'
                    }
                })()}
              >
                <table className={styles.tokenTable}>
                  <tr className={`${styles.headerRow} eyebrow`}>
                    <th colSpan={2} style={{ maxWidth: '50%' }}>
                      Token
                    </th>
                    <th>Type</th>
                  </tr>
                  <>{getAllTokenRows(networkReq_i.tokens, meta)}</>
                </table>
              </td>
            </tr>
          ) : null}
          <tr className={styles.separator}></tr>
        </>
      )
    }
    return allRows
  }

  getAllRows()
  return (
    <table className={`${styles.chainTable} ${className}`} {...props}>
      <tbody className={styles.chainTable}>
        <tr className={`${styles.headerRow} eyebrow`}>
          <th colSpan={2} style={{ maxWidth: '50%' }}>
            Chain
          </th>
          <th>Token used</th>
        </tr>
        <tr className={styles.separator}></tr>
        {allRows}
      </tbody>
    </table>
  )
}

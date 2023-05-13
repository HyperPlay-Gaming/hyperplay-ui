import React, { useEffect, useState } from 'react'

import { getChainMetadata } from '@hyperplay/chains'
import { Menu } from '@mantine/core'

import { Blockchain, DownArrow, Info, Token } from '@/assets/images'

import Button from '../Button'
import styles from './TokenTable.module.scss'

interface NetworkRequirements {
  chainId: string
  address: string[]
}

interface TokenTableProps {
  networkReqs: NetworkRequirements[]
  getTokenEnabled?: boolean
  onTokenClick: (tokenAddress: string) => void
  onGetTokenClick: (tokenAddress: string) => void
}

export default function TokenTable({
  networkReqs,
  getTokenEnabled = false,
  ...props
}: TokenTableProps) {
  const [allRows, setAllRows] = useState(<></>)
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>(
    {}
  )

  useEffect(() => {
    getAllRows().then((val) => setAllRows(<>{val}</>))
  }, [expandedRows])

  function toggleExpanded(chainRowIndex: number) {
    let expanded = false
    console.log(
      '!Object.hasOwn(expandedRows, chainRowIndex) ',
      !Object.hasOwn(expandedRows, chainRowIndex)
    )
    console.log('!expandedRows[chainRowIndex] ', !expandedRows[chainRowIndex])
    if (
      !Object.hasOwn(expandedRows, chainRowIndex) ||
      !expandedRows[chainRowIndex]
    ) {
      console.log('expanding row')
      expanded = true
    } else {
      console.log('collapsing row')
    }
    const updatedValue: { [key: number]: boolean } = {}
    updatedValue[chainRowIndex] = expanded
    setExpandedRows((expandedRows) => ({ ...expandedRows, ...updatedValue }))
  }
  console.log(expandedRows)

  function getAllTokenRows(tokenAddresses: string[]) {
    const allTokenRows = []
    for (const address of tokenAddresses) {
      allTokenRows.push(
        <tr>
          <td>
            <Token fill="var(--color-neutral-100)" />
          </td>
          <td>
            <Button
              type="link"
              size="small"
              onClick={(event) => {
                console.log('token address clicked')
                event?.stopPropagation()
                props.onTokenClick(address)
              }}
            >
              {address}
            </Button>
          </td>
          <td>
            {getTokenEnabled ? (
              <div>
                {address}

                <span
                  style={{
                    margin: '0 0 0 auto'
                  }}
                >
                  <Button
                    type="secondary"
                    size="medium"
                    onClick={(event) => {
                      console.log('get token clicked')
                      event?.stopPropagation()
                      props.onGetTokenClick(address)
                    }}
                  >
                    <div className="button-sm">Get token</div>
                  </Button>
                </span>
              </div>
            ) : (
              address
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
        console.error(err)
        meta = {
          icon: [],
          chain: { name: 'Unknown Chain', nativeCurrency: { symbol: '???' } }
        }
      }
      console.log('chain metadata ', meta)
      let ipfsHash = ''
      if (meta.icon && meta.icon.length > 0)
        ipfsHash = meta.icon[0].url.split('//')[1]
      const imgUrl = `https://ipfs.io/ipfs/${ipfsHash}`

      const hasTokens = networkReq_i.address.length > 0

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
          >
            <td className={styles.icon}>
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
              <td>
                <div>
                  <div>
                    {showDropdown
                      ? `Click to hide all tokens`
                      : `Click to see all tokens`}
                    <Menu trigger="hover" position="top-start">
                      <Menu.Target>
                        <div className={`caption-sm ${styles.infoText}`}>
                          <Info fill="var(--color-neutral-400)" />
                          Token gated access
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
              className={`${styles.chainRow}`}
              onClick={() => toggleExpanded(i)}
            >
              <td colSpan={3}>
                <table className={styles.tokenTable}>
                  <tr className={`${styles.headerRow} eyebrow`}>
                    <th colSpan={2} style={{ maxWidth: '50%' }}>
                      Token
                    </th>
                    <th>Type</th>
                  </tr>
                  <>{getAllTokenRows(networkReq_i.address)}</>
                </table>
              </td>
            </tr>
          ) : null}
        </>
      )
    }
    return allRows
  }

  getAllRows()
  return (
    <table className={styles.chainTable}>
      <tr className={`${styles.headerRow} eyebrow`}>
        <th colSpan={2} style={{ maxWidth: '50%' }}>
          Chain
        </th>
        <th>Token used</th>
      </tr>
      {allRows}
    </table>
  )
}

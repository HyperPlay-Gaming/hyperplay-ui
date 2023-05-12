import React, { useEffect, useState } from 'react'

import { getChainMetadata } from '@hyperplay/chains'

import { Blockchain, DownArrow, Token } from '@/assets/images'

import Button from '../Button'
import styles from './TokenTable.module.scss'

interface NetworkRequirements {
  chainId: string
  address: string[]
}

interface TokenTableProps {
  networkReqs: NetworkRequirements[]
  getTokenEnabled?: boolean
}

export default function TokenTable({
  networkReqs,
  getTokenEnabled = false
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
              <td>{meta.chain.nativeCurrency.symbol}</td>
            ) : (
              <td>
                <div>
                  <div>
                    {showDropdown
                      ? `Click to hide all tokens`
                      : `Click to see all tokens`}
                  </div>
                  <span
                    style={{
                      margin: '0 0 0 auto',
                      transform: `rotate(${expandedRows[i] ? 180 : 0}deg)`
                    }}
                  >
                    <DownArrow stroke="var(--color-neutral-100)" />
                  </span>
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

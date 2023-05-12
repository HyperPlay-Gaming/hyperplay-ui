import React, { useEffect, useState } from 'react'

import { getChainMetadata } from '@hyperplay/chains'

import { DownArrow } from '@/assets/images'

import styles from './TokenTable.module.scss'

interface NetworkRequirements {
  chainId: string
  address: string[]
}

interface TokenTableProps {
  networkReqs: NetworkRequirements[]
}

export default function TokenTable({ networkReqs }: TokenTableProps) {
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
          <td>{address}</td>
          <td>{address}</td>
          <td>{address}</td>
        </tr>
      )
    }
    return allTokenRows
  }

  async function getAllRows() {
    const allRows = []
    for (const [i, networkReq_i] of networkReqs.entries()) {
      const meta = await getChainMetadata(networkReq_i.chainId)
      console.log('chain metadata ', meta)
      let ipfsHash = ''
      if (meta.icon && meta.icon.length > 0)
        ipfsHash = meta.icon[0].url.split('//')[1]
      const imgUrl = `https://ipfs.io/ipfs/${ipfsHash}`

      const hasTokens = networkReq_i.address.length > 0

      const rowStyle = { cursor: 'default' }
      if (hasTokens) rowStyle.cursor = 'pointer'
      allRows.push(
        <>
          <tr
            className={`caption`}
            style={rowStyle}
            onClick={() => toggleExpanded(i)}
          >
            <td className={styles.icon}>
              <div>
                <img src={imgUrl} />
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
                  <div>Click to see all tokens</div>
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
          {hasTokens && expandedRows[i] ? (
            <tr>
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

import React from 'react'

import TokenTable from '.'

export default {
  title: 'TokenTable',
  component: TokenTable
}

export const Default = () => {
  return (
    <div style={{ width: '600px' }}>
      <TokenTable
        networkReqs={[
          {
            chainId: '1',
            address: []
          },
          {
            chainId: '137',
            address: ['0x1234', '0x1111']
          },
          {
            chainId: '0',
            address: []
          }
        ]}
      ></TokenTable>
    </div>
  )
}

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
          },
          {
            chainId: '1',
            address: ['0x9c93f03d43a7f1b0384c97e7c47c2515e53bb2a5']
          }
        ]}
        onTokenClick={(addr) => console.log('token clicked', addr)}
        onGetTokenClick={(addr) => console.log('get token clicked', addr)}
      ></TokenTable>
    </div>
  )
}

export const GetTokenEnabled = () => {
  return (
    <div style={{ width: '600px' }}>
      <TokenTable
        getTokenEnabled={true}
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
        onTokenClick={(addr) => console.log('token clicked', addr)}
        onGetTokenClick={(addr) => console.log('get token clicked', addr)}
      ></TokenTable>
    </div>
  )
}

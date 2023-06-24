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
        contracts={[
          {
            chainId: '1',
            address: '0x12345'
          },
          {
            chainId: '137',
            address: '0x12346',
            name: 'Luffy NFTs',
            icon: '',
            type: 'fungible'
          },
          {
            chainId: '1',
            address: '0x11111',
            icon: '',
            type: 'nonFungible'
          },
          {
            chainId: '1',
            address: '0x9c93f03d43a7f1b0384c97e7c47c2515e53bb2a5'
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
        contracts={[
          {
            chainId: '1',
            address: '0x12345'
          },
          {
            chainId: '137',
            address: '0x1234'
          },
          {
            chainId: '1',
            address: '0x1234'
          }
        ]}
        onTokenClick={(addr) => console.log('token clicked', addr)}
        onGetTokenClick={(addr) => console.log('get token clicked', addr)}
      ></TokenTable>
    </div>
  )
}

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
            tokens: []
          },
          {
            chainId: '137',
            tokens: [
              {
                address: '0x1234',
                name: 'Luffy NFTs',
                iconSvg: '',
                type: 'fungible'
              },
              { address: '0x11111', iconSvg: '', type: 'nonFungible' }
            ]
          },
          {
            chainId: '0',
            tokens: []
          },
          {
            chainId: '1',
            tokens: [{ address: '0x9c93f03d43a7f1b0384c97e7c47c2515e53bb2a5' }]
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
            tokens: []
          },
          {
            chainId: '137',
            tokens: [{ address: '0x1234', iconSvg: '' }]
          },
          {
            chainId: '0',
            tokens: []
          }
        ]}
        onTokenClick={(addr) => console.log('token clicked', addr)}
        onGetTokenClick={(addr) => console.log('get token clicked', addr)}
      ></TokenTable>
    </div>
  )
}

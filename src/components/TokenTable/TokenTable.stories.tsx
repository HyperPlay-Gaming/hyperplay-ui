import React from 'react'

import TokenTable from '.'

export default {
  title: 'TokenTable',
  component: TokenTable
}

export const Default = () => {
  return (
    <div>
      <TokenTable
        contracts={[
          {
            id: 1,
            chain_id: '1',
            address: '0x12345'
          },
          {
            id: 2,
            chain_id: '137',
            address: '0x12346',
            name: 'Luffy NFTs',
            icon: '',
            type: 'fungible'
          },
          {
            id: 3,
            chain_id: '1',
            address: '0x11111',
            icon: '',
            type: 'nonFungible'
          },
          {
            id: 4,
            chain_id: '1',
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
    <div>
      <TokenTable
        getTokenEnabled={true}
        contracts={[
          {
            id: 5,
            chain_id: '1',
            address: '0x12345',
            type: 'fungible',
            marketplace_urls: ['www.hyperplay.xyz']
          },
          {
            id: 6,
            chain_id: '137',
            address: '0x1234',
            type: 'other',
            marketplace_urls: ['www.hyperplay.xyz']
          },
          {
            id: 7,
            chain_id: '1',
            address: '0x1234',
            type: 'nonFungible',
            marketplace_urls: ['www.hyperplay.xyz']
          }
        ]}
        onTokenClick={(addr) => console.log('token clicked', addr)}
        onGetTokenClick={(addr) => console.log('get token clicked', addr)}
      ></TokenTable>
    </div>
  )
}

export const DefaultWithMarginTop = () => {
  return (
    <TokenTable
      style={{ marginTop: '20px' }}
      contracts={[
        {
          id: 9,
          chain_id: '1',
          address: '0x12345'
        },
        {
          id: 10,
          chain_id: '137',
          address: '0x12346',
          name: 'Luffy NFTs',
          icon: '',
          type: 'fungible'
        },
        {
          id: 11,
          chain_id: '1',
          address: '0x11111',
          icon: '',
          type: 'nonFungible'
        },
        {
          id: 12,
          chain_id: '1',
          address: '0x9c93f03d43a7f1b0384c97e7c47c2515e53bb2a5'
        }
      ]}
      onTokenClick={(addr) => console.log('token clicked', addr)}
      onGetTokenClick={(addr) => console.log('get token clicked', addr)}
    ></TokenTable>
  )
}

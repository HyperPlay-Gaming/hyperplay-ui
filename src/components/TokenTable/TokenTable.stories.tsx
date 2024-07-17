import React from 'react'

import TokenTable from '.'

export default {
  title: 'TokenTable',
  component: TokenTable
}

export const Default = () => {
  return (
    <div style={{ width: '500px' }}>
      <TokenTable
        contracts={[
          {
            chain_id: '1',
            address: '0x12345'
          },
          {
            chain_id: '137',
            address: '0x12346',
            name: 'Luffy NFTs',
            icon: '',
            type: 'fungible'
          },
          {
            chain_id: '1',
            address: '0x11111',
            icon: '',
            type: 'nonFungible'
          },
          {
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
    <div style={{ width: '500px' }}>
      <TokenTable
        getTokenEnabled={true}
        contracts={[
          {
            chain_id: '1',
            address: '0x12345',
            type: 'fungible'
          },
          {
            chain_id: '137',
            address: '0x1234',
            type: 'other'
          },
          {
            chain_id: '1',
            address: '0x1234',
            type: 'nonFungible'
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
          chain_id: '1',
          address: '0x12345'
        },
        {
          chain_id: '137',
          address: '0x12346',
          name: 'Luffy NFTs',
          icon: '',
          type: 'fungible'
        },
        {
          chain_id: '1',
          address: '0x11111',
          icon: '',
          type: 'nonFungible'
        },
        {
          chain_id: '1',
          address: '0x9c93f03d43a7f1b0384c97e7c47c2515e53bb2a5'
        }
      ]}
      onTokenClick={(addr) => console.log('token clicked', addr)}
      onGetTokenClick={(addr) => console.log('get token clicked', addr)}
    ></TokenTable>
  )
}

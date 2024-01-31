import type { Meta, StoryObj } from '@storybook/react'

import { SelectCreatable, SelectCreatableProps } from '.'

const meta: Meta<typeof SelectCreatable> = {
  title: 'DevPortal/SelectCreatable',
  component: SelectCreatable
}

export default meta

type Story = StoryObj<typeof SelectCreatable>

const props: SelectCreatableProps = {
  options: [
    '🍎 Apples',
    '🍌 Bananas',
    '🥦 Broccoli',
    '🥕 Carrots',
    '🍫 Chocolate',
    '🍇 Grapes'
  ],
  onChange: (val) => console.log('changed to ', val),
  onCreated: (val) => console.log('created ', val)
}

export const Default: Story = {
  args: { ...props }
}

export const Required: Story = {
  args: {
    ...props,
    inputProps: { label: 'asdf', required: true, withAsterisk: true }
  }
}

const chains = [
  'Ethereum Mainnet',
  'Expanse Network',
  'Ropsten',
  'Rinkeby',
  'Goerli',
  'Ethereum Classic Testnet Kotti',
  'ThaiChain',
  'Ubiq',
  'Ubiq Network Testnet',
  'OP Mainnet',
  'Metadium Mainnet',
  'Metadium Testnet',
  'Diode Testnet Staging',
  'Flare Mainnet',
  'Diode Prenet',
  'Flare Testnet Coston',
  'ThaiChain 2.0 ThaiFi',
  'ThunderCore Testnet',
  'Songbird Canary-Network',
  'Elastos Smart Chain',
  'Elastos Smart Chain Testnet',
  'ELA-DID-Sidechain Mainnet',
  'ELA-DID-Sidechain Testnet',
  'KardiaChain Mainnet',
  'Cronos Mainnet',
  'Genesis L1 testnet',
  'ShibaChain',
  'Boba Network Rinkeby Testnet',
  'Genesis L1',
  'Rootstock Mainnet',
  'Rootstock Testnet',
  'GoodData Testnet',
  'GoodData Mainnet',
  'SecureChain Mainnet',
  'TBWG Chain',
  'Dxchain Mainnet',
  'Xpla Mainnet',
  'Valorbit',
  'U2U Solaris Mainnet',
  'Telos EVM Mainnet',
  'Telos EVM Testnet',
  'LUKSO Mainnet',
  'Darwinia Pangolin Testnet',
  'Crab Network',
  'Darwinia Pangoro Testnet',
  'Darwinia Network',
  'Acria IntelliChain',
  'Ennothem Mainnet Proterozoic',
  'Ennothem Testnet Pioneer',
  'XinFin XDC Network',
  'XDC Apothem Network',
  'CoinEx Smart Chain Mainnet',
  'CoinEx Smart Chain Testnet',
  'Openpiece Mainnet',
  'Zyx Mainnet',
  'BNB Smart Chain Mainnet',
  'Syscoin Mainnet',
  'Ontology Mainnet',
  'EOS EVM Legacy',
  'GoChain',
  'Ethereum Classic Mainnet',
  'Ethereum Classic Testnet Morden',
  'Ethereum Classic Testnet Mordor',
  'Ellaism',
  'OKExChain Testnet',
  'OKXChain Mainnet',
  'DBChain Testnet',
  'SoterOne Mainnet',
  'Optimism Kovan',
  'Hoo Smart Chain',
  'Conflux eSpace (Testnet)',
  'DxChain Testnet',
  'FNCY',
  'IDChain Mainnet',
  'Decimal Smart Chain Mainnet',
  'Mix',
  'POA Network Sokol',
  'PrimusChain mainnet',
  'Zenith Mainnet',
  'GeneChain',
  'Japan Open Chain Mainnet',
  'Meter Mainnet',
  'Meter Testnet',
  'Linqto Devnet',
  'GateChain Testnet',
  'GateChain Mainnet',
  'Nova Network',
  'TomoChain',
  'TomoChain Testnet',
  'Garizon Stage0',
  'Garizon Stage1',
  'Garizon Stage2',
  'Garizon Stage3',
  'SwissDLT',
  'CamDL Mainnet',
  'Bitkub Chain',
  'BNB Smart Chain Testnet',
  'Six Protocol',
  'POA Network Core',
  'Gnosis',
  'EtherInc',
  'Web3Games Testnet',
  'Worldland Mainnet',
  'Kaiba Lightning Chain Testnet',
  'Web3Games Devnet',
  'Velas EVM Mainnet',
  'Nebula Testnet',
  'ThunderCore Mainnet',
  'Shibarium',
  'Proton Testnet',
  'EtherLite Chain',
  'Coinbit Mainnet',
  'Dehvo',
  'Flare Testnet Coston2',
  'DeBank Testnet(Deprecated)',
  'DeBank Mainnet',
  'Uptick Mainnet',
  'Arcology Testnet',
  'ENULS Mainnet',
  'ENULS Testnet',
  'Realchain Mainnet',
  'Fuse Mainnet',
  'Fuse Sparknet',
  'Decentralized Web Mainnet',
  'OYchain Testnet',
  'OYchain Mainnet',
  'Factory 127 Mainnet'
]

export const LongList: Story = {
  args: {
    ...props,
    options: chains,
    inputProps: { required: true, withAsterisk: true }
  }
}

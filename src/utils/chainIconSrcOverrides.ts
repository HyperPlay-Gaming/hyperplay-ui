import EthereumIcon from '@/assets/chainIcons/ethereum.png?url'
import ArbNova from '@/assets/chainIcons/Arbitrum Nova.png'
import ArbOne from '@/assets/chainIcons/Arbitrum One.png'
import Beam from '@/assets/chainIcons/beam.png'
import Kroma from '@/assets/chainIcons/Kroma.png'
import LoopNetwork from '@/assets/chainIcons/LoopNetwork.png'
import Polygon from '@/assets/chainIcons/Polygon.png'
import SkaleNebulaHub from '@/assets/chainIcons/SKALE Nebula Hub.png'
import BNB from '@/assets/chainIcons/BNB.png'
import Linea from '@/assets/chainIcons/Linea.png'
import Mantle from '@/assets/chainIcons/Mantle.png'
import Oasys from '@/assets/chainIcons/Oasys.png'
import PlyrPhi from '@/assets/chainIcons/PLYR PHI.png'
import ShrapnelSubnet from '@/assets/chainIcons/Shrapnel Subnet.png'
import ImmutableX from '@/assets/chainIcons/immutable_zkevm_logo.png'

/**
 * @TODO pin these images on ipfs and polyfill in hp/chains with these urls
 */
export const chainIconsSrcOverrides: Record<string, string> = {
  '1': EthereumIcon,
  '42170': ArbNova,
  '42161': ArbOne,
  '4337': Beam,
  '200625': Kroma,
  '15551': LoopNetwork,
  '137': Polygon,
  '1482601649': SkaleNebulaHub,
  '56': BNB,
  '59144': Linea,
  '5000': Mantle,
  '5555': Oasys,
  '16180': PlyrPhi,
  '13371': ImmutableX,
  '2044': ShrapnelSubnet
}

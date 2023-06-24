import 'react-loading-skeleton/dist/skeleton.css'

import './fonts.css'
import './index.scss'

export { default as TransactionToast } from './components/TransactionToasts'
export { default as Button } from './components/Button'
export { default as NavBar } from './components/NavBar'
export { default as GameCard } from './components/GameCard'
export type {
  GameCardState,
  SettingsButtons
} from './components/GameCard/types'
export { FeaturedCarousel, ContentCarousel } from './components/Carousel'
export { default as Background } from './components/Background'
export { default as CircularButton } from './components/CircularButton'
export { default as GameInfo } from './components/GameInfo'
export { default as ModalAnimation } from './components/Modal/ModalAnimation'
export { default as AlertCard } from './components/AlertCard'
export { default as DownloadToast } from './components/DownloadToast'
export { default as Checkbox } from './components/Checkbox'
export { default as Tabs } from './components/Tabs'
export { default as Toggle } from './components/Toggle'
export {
  Dropdown,
  GenericDropdown,
  OptionsDropdown
} from './components/Dropdowns'
export { default as OptionsAccordion } from './components/OptionsAccordion'
export type { itemType as DropdownItemType } from './components/Dropdowns/Dropdown'
export { Menu } from '@mantine/core'

export * as Typography from './components/Typography'
export * as Images from './assets/images'
export { default as TokenTable } from './components/TokenTable'

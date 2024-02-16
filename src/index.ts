import 'react-loading-skeleton/dist/skeleton.css'

import './fonts.css'
import './index.scss'

export { default as TransactionToast } from './components/TransactionToasts'
export type { TransactionToastProps } from './components/TransactionToasts'
export type { statusType as TransactionStatus } from './components/TransactionToasts'
export { default as Button, type ButtonProps } from './components/Button'
export { default as NavBar } from './components/NavBar'
export { default as GameCard } from './components/GameCard'
export type {
  GameCardState,
  SettingsButtons
} from './components/GameCard/types'
export { default as Carousel } from './components/Carousel'
export { default as Background } from './components/Background'
export { default as CircularButton } from './components/CircularButton'
export { default as GameInfo } from './components/GameInfo'
export { default as ModalAnimation } from './components/Modal/ModalAnimation'
export { default as ModalSuccess } from './components/Modal/ModalSuccess'
export { default as Modal } from './components/Modal/Modal'
export { default as AlertCard } from './components/AlertCard'
export { default as Alert } from './components/Alert'
export type { AlertProps } from './components/Alert'
export { default as DownloadToast } from './components/DownloadToast'
export { default as Checkbox, type CheckboxProps } from './components/Checkbox'
export * from './components/Tabs'
export type { TabsTypes } from './components/Tabs'
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
export { default as GameRequirementsTable } from './components/GameRequirementsTable'
export { default as GameAbout } from './components/GameAbout'
export {
  default as AuthProviderButton,
  type AuthProviderButtonProps as AuthProvider
} from './components/AuthProviderButton'
export {
  default as TextInput,
  type TextInputProps
} from './components/TextInput'
export { default as SearchBar } from './components/SearchBar'

export { default as LoginModal } from './components/LoginModal'
export { default as LinkExternalAccounts } from './components/LinkExternalAccounts'
export { default as CheckEmail } from './components/CheckEmail'
export { default as EmailVerified } from './components/EmailVerified'
export { default as StoreRow } from './components/StoreRow'

export { default as AchievementCard } from './components/AchievementCard'
export { default as AchievementNav } from './components/AchievementNav'
export { default as AchievementProgress } from './components/AchievementProgress'
export { default as AchievementsInfo } from './components/AchievementsInfo'
export { default as AchievementSummaryTable } from './components/AchievementSummaryTable'
export { default as GameAchievements } from './components/GameAchievements'
export { default as HyperPlayDesignProvider } from './components/HyperPlayDesignProvider'
export { default as NoQuestContent } from './components/NoQuestsContent'
export { default as FAQ } from './components/FAQ'
export type { GameAdded } from './components/AchievementNav/index'
export {
  default as ZkSyncQuestBanner,
  type ZkSyncQuestBannerProps
} from './components/ZkSyncQuestBanner'
export { default as LinkAccountDialog } from './components/LinkAccount'
export { default as Activity, type ActivityProps } from './components/Activity'
export {
  default as Identicon,
  type IdenticonProps
} from './components/Identicon'
export { default as _404, type _404Props } from './components/404'
export { default as Item } from './components/Item'
export {
  default as AccountSelect,
  type AccountSelectProps,
  AccountSelectContext
} from './components/AccountSelect'
export {
  default as Gallery,
  type GalleryProps,
  type Asset,
  getYouTubeEmbedURL
} from './components/Gallery'
export {
  default as InfoButton,
  type InfoButtonProps
} from './components/InfoButton'
export { default as List, type ListProps } from './components/List'
export { default as Address, type AddressProps } from './components/Address'
export {
  default as AsyncTextInput,
  type AsyncTextInputProps
} from './components/AsyncTextInput'
export {
  default as Breadcrumbs,
  type BreadcrumbsProps,
  type Breadcrumb
} from './components/Breadcrumbs'
export { default as Card, type CardProps } from './components/Card'
export {
  default as CheckboxList,
  type CheckboxListProps
} from './components/CheckboxList'
export {
  default as GalleryInput,
  type GalleryInputProps
} from './components/GalleryInput'
export {
  default as ImageInput,
  type ImageInputProps
} from './components/ImageInput'
export * from './components/WebPlatformInput'
export * from './components/NativePlatformInput'
export * from './components/PlatformContainer'
export { default as Fab, type FabProps } from './components/Fab'
export * from './components/Member'
export * from './components/MemberList'
export * from './components/SelectCreatable'
export * from './components/TagsInput'
export * from './components/TextArea'
export * from './common/types'
export * from './components/RewardsSummary'
export * from './components/GameSelector'
export * from './components/GameSelector/types'
export { getTruncatedAddress } from './utils/addressUtils'
export * from './components/ButtonCopy'
export * from './components/ContainerInteractive'
export { default as LoadingSpinner } from './components/Loading'
export { default as AccountAvatar } from './components/AccountAvatar'
export * from './components/RewardsSummary/components/FormRewards/types'
export * from './components/QuestsTable'
export type QuestType = 'REPUTATION'
export type QuestTypeTranslations = Record<QuestType, string>

export type Arch = 'amd64' | 'arm64'
export type Platforms = 'windows' | 'linux' | 'darwin' | 'web'
export const platformLabels: Record<Platforms, string> = {
  windows: 'Windows',
  linux: 'Linux',
  darwin: 'macOS',
  web: 'Web'
}

export type TokenType = 'erc20' | 'erc1155' | 'erc721'

export type QuestType = 'REPUTATION'
export type QuestTypeTranslations = Record<QuestType, string>

export type Arch = 'amd64' | 'arm64'
export type Platforms = 'windows' | 'linux' | 'darwin'
export const platformLabels: Record<Platforms, string> = {
  windows: 'Windows',
  linux: 'Linux',
  darwin: 'macOS'
}

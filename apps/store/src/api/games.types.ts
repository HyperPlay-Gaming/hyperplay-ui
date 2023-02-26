interface GalleryItem {
  name: string
  type: string
  src: string
}

interface SystemRequirements {
  cpu: string
  gpu: string
  memory: string
  disk: string
  ram: string
}

interface Platforms {
  windows_amd64?: {
    external_url: string
    name: string
    executable: string
  }
  windows_arm64?: {
    external_url: string
    name: string
    executable: string
  }
  linux_amd64?: {
    external_url: string
    name: string
    executable: string
  }
  linux_arm64?: {
    external_url: string
    name: string
    executable: string
  }
  darwin_arm64?: {
    external_url: string
    name: string
    executable: string
  }
  darwin_amd64?: {
    external_url: string
    name: string
    executable: string
  }
}

interface ProjectMeta {
  image: string
  main_capsule: string
  name: string
  short_description: string
  description: string
  external_url: string
  type: string
  tags: string[]
  gallery: GalleryItem[]
  launch_external: boolean
  donation_address: string
  prompt_donation: boolean
  systemRequirements: SystemRequirements
  wineSupport: {
    mac: boolean
    linux: boolean
  }
  networks: any[]
}

interface ReleaseMeta {
  _metadata_version: string
  path: string
  name: string
  description: string
  external_url: string
  platforms: Platforms
  image: string
}

export interface Release {
  _id: string
  accountID: string
  projectID: string
  accountName: string
  projectName: string
  releaseID: string
  releaseMetaURI: string
  releaseName: string
  status: string
  timestamp: number
  projectMetaURI: string
  projectMeta: ProjectMeta
  releaseMeta: ReleaseMeta
}

export type ReleaseList = Release[]

export type ListingsQueryParams = {
  tag?: string
  id?: string
}

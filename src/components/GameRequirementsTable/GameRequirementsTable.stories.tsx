import React from 'react'

import GameRequirementsTable from '@/components/GameRequirementsTable/index'

export default {
  title: 'GameRequirementsTable',
  component: GameRequirementsTable
}

export const Default = () => (
  <GameRequirementsTable
    requirements={{
      platforms: {
        linux: true,
        mac: true,
        windows: true,
        web: true
      },
      cpu: 'Intel Core i5 / AMD Ryzen 3600',
      gpu: 'GeForce 600 series',
      memory: '8 GB RAM',
      disk: '300 MB available space'
    }}
  />
)

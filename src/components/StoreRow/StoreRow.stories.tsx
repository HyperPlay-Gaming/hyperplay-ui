import { Flex } from '@mantine/core'

import { Eye, Refresh } from '@/assets/images'

import StoreRow from '.'

export default {
  title: 'Store Row',
  component: StoreRow
}

export const Default = () => {
  return (
    <Flex direction="column" gap="8px">
      <StoreRow store="hyperplay" secondaryText="10 Games">
        <Eye />
      </StoreRow>
      <StoreRow store="epic" secondaryText="10 Games">
        <p>Link Store</p>
      </StoreRow>
      <StoreRow store="steam" secondaryText="10 Games">
        <Refresh />
      </StoreRow>
    </Flex>
  )
}

import React from "react";
import { render } from '@testing-library/react';
import { MantineProvider, MantineProviderProps } from'@mantine/core'

interface RenderWithMantineProps {
  providerProps?: MantineProviderProps,
}

export const renderWithMantine = (ui: React.ReactElement, { providerProps, ...renderOptions }: RenderWithMantineProps = {} as RenderWithMantineProps) => {
  return render(
    <MantineProvider {...providerProps}>
      {ui}
    </MantineProvider>,
    renderOptions,
  );
};
import React, { PropsWithChildren } from 'react'
import './theme.css'
import '../fonts.css'

// interface ThemeProviderProps {
//   theme?: {
//     colors: {
//       primary: string
//       secondary: string
//       whiteGray: string
//       white: string
//       background: string
//       card: string
//       darkGray: string
//       gray: string
//       lightGray: string
//       statusGreen: string
//       statusYellow: string
//       statusRed: string
//       gradientPrimary: string
//       gradientPrimaryHover: string
//       strokeHighlight: string
//       strokeError: string
//     }
//   }
// }

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <>{children}</>
}

export default ThemeProvider

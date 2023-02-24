import '@hyperplay/ui/designSystem/_buttons.scss'
import '@hyperplay/ui/designSystem/_colors.scss'
import '@hyperplay/ui/designSystem/_spacing.scss'
import '@hyperplay/ui/designSystem/_typography.scss'
import '@hyperplay/ui/utilities/_variables.scss'
import '@hyperplay/ui/fonts.css'
import '@hyperplay/ui/style.css'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { NavBar } from '@hyperplay/ui'
import Head from 'next/head'

try {
  require('@hyperplay/proprietary-fonts')
} catch (e) {
  console.warn('Proprietary fonts not installed')
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const { isLauncher } = router.query

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {!isLauncher && <NavBar activeSite="store" />}
      <Component {...pageProps} />
    </>
  )
}

// Libraries
import '../styles/globals.css'
// Types
import type { AppProps } from 'next/app'
// Components
import { SessionProvider } from 'next-auth/react'
import { Navbar } from '@components/common'
import AccountProvider from '@providers/AccountProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AccountProvider>
        <Navbar />
        <Component {...pageProps} />
      </AccountProvider>
    </SessionProvider>
  )
}

export default MyApp

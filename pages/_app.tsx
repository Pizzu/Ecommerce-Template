import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import AccountProvider from '@providers/AccountProvider'
import { Navbar } from '@components/common'

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

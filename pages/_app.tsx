// Libraries
import '../styles/globals.css'
import SEO from 'next-seo.config'
// Types
import type { AppProps } from 'next/app'
// Components
import { SessionProvider } from 'next-auth/react'
import { Navbar, Footer } from '@components/common'
import AccountProvider from '@providers/AccountProvider'
import { DefaultSeo } from 'next-seo'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AccountProvider>
        <Navbar />
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <Footer />
      </AccountProvider>
    </SessionProvider>
  )
}

export default MyApp

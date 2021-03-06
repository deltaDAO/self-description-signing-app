import Head from 'next/head'
import React, { ReactElement, ReactNode } from 'react'
import { useSiteMetadata } from '../hooks/UseSiteMetadata'
import Styles from '../styles/Styles'

export default function App({
  children
}: {
  children: ReactNode
}): ReactElement {
  const { site } = useSiteMetadata()

  return (
    <Styles>
      <Head>
        <title>{site.title}</title>
        <meta name="description" content={site.description} />
        <link rel="icon" href={site.siteIcon} />
      </Head>

      <div>
        <main>{children}</main>
      </div>
    </Styles>
  )
}

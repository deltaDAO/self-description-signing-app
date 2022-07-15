import React, { ReactElement } from 'react'
import styles from './Footer.module.css'

export default function Footer(): ReactElement {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.copyright}>
          &#169; {year} All Rights Reserved.
        </div>
        <div className={styles.links}>
          <a
            href="https://www.delta-dao.com/imprint"
            target="_blank"
            rel="noreferrer noopener"
          >
            Imprint
          </a>
          {' | '}
          <a
            href="https://www.delta-dao.com/privacy"
            target="_blank"
            rel="noreferrer noopener"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  )
}

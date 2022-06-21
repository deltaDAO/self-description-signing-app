import { forwardRef } from 'react'
import LogoFont from '../../../public/images/logo_font.svg'
import styles from './Logo.module.css'

const Logo = forwardRef(({ poweredBy }: { poweredBy?: boolean }, ref: any) => {
  return (
    <div ref={ref} className={styles.container}>
      {poweredBy && <p>powered by</p>}
      <LogoFont className={styles.logo} />
    </div>
  )
})

export default Logo

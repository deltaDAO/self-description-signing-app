import { ReactElement } from 'react'
import styles from './Warning.module.css'
import AlertIcon from '../../../public/images/alert.svg'

export default function Warning(): ReactElement {
  return (
    <div className={styles.container}>
      <AlertIcon />
      <p>
        Note: This is ONLY meant for testing purpose in the context of the
        Gaia-X hackathon
      </p>
    </div>
  )
}

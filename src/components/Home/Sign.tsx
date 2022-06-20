import { ReactElement, useState } from 'react'
import Button from '../atoms/Button'
import SignForm from './SignForm'
import Visualizer from './Visualizer'
import styles from './Sign.module.css'
import { downloadFile } from '../../utils/sign'
import { toast } from 'react-toastify'

export default function Sign(): ReactElement {
  const [signedSD, setSignedSD] = useState<string>()
  const [signatureErrors, setSignatureErrors] = useState<string>()

  return (
    <div>
      <h1>No own certificate prepared? - Say no more!</h1>
      <h2>
        We prepared the tool below to sign your Self Description for testing
        purpose in the context of the Gaia-X Hackathon #4. No need for your own
        certificate. All you need is your Self Description.
      </h2>
      <SignForm
        setSignedSD={setSignedSD}
        setSignatureErrors={setSignatureErrors}
      />
      {signedSD && (
        <div className={styles.signedContainer}>
          <h1>Find the signed Self Description here</h1>
          <Visualizer text={signedSD} />
          <div className={styles.actions}>
            <Button
              style="primary"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(signedSD, null, 2))
                toast.success('Copied to clipboard')
              }}
            >
              Copy
            </Button>
            <Button style="primary" onClick={() => downloadFile(signedSD)}>
              Download
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

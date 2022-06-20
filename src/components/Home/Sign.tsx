import { ReactElement, useRef, useState } from 'react'
import Button from '../atoms/Button'
import SignForm from './SignForm'
import Visualizer from './Visualizer'
import styles from './Sign.module.css'
import { downloadFile } from '../../utils/sign'
import { toast } from 'react-toastify'

export default function Sign(): ReactElement {
  const [signedSD, setSignedSD] = useState<string>()
  const [signatureErrors, setSignatureErrors] = useState<string>()
  const resultsRef = useRef(null)

  return (
    <div>
      <h1>No own certificate prepared? Say no more!</h1>
      <h3>
        We prepared the tool below to sign your Self Description for testing
        purpose in the context of the Gaia-X Hackathon #3. No need for your own
        certificate. All you need is your Self Description.
      </h3>
      <SignForm
        setSignedSD={setSignedSD}
        setSignatureErrors={setSignatureErrors}
        resultsRef={resultsRef}
      />
      {signedSD && (
        <div className={styles.signedContainer} ref={resultsRef}>
          <h1>Find the signed Self Description here</h1>
          <Visualizer text={signedSD} />
          <p>
            Note: This is ONLY meant for testing purpose in the context of the
            Gaia-X hackathon
          </p>
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
      {signatureErrors && (
        <div className={styles.signedContainer} ref={resultsRef}>
          <h1>Signing failed, see the errors below</h1>
          <Visualizer text={signatureErrors} />
        </div>
      )}
    </div>
  )
}

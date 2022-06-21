import { ReactElement, useRef, useState } from 'react'
import Button from '../atoms/Button'
import SignForm from './SignForm'
import Visualizer from './Visualizer'
import styles from './Sign.module.css'
import { downloadFile } from '../../utils/sign'
import { toast } from 'react-toastify'
import Warning from '../atoms/Warning'
import content from '../../../content/sign.json'

export default function Sign(): ReactElement {
  const { title, subtitle, titleSuccess, titleFail } = content
  const [signedSD, setSignedSD] = useState<string>()
  const [signatureErrors, setSignatureErrors] = useState<string>()
  const errorsRef = useRef(null)
  const resultsRef = useRef(null)

  return (
    <div id="signer">
      <div className={styles.header}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </div>
      <SignForm
        setSignedSD={setSignedSD}
        setSignatureErrors={setSignatureErrors}
        errorsRef={errorsRef}
        resultsRef={resultsRef}
      />
      {signedSD && (
        <div className={styles.signedContainer} ref={resultsRef}>
          <h1>{titleSuccess}</h1>
          <Visualizer text={signedSD} />
          <Warning />
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
        <div className={styles.signedContainer} ref={errorsRef}>
          <h1>{titleFail}</h1>
          <Visualizer text={signatureErrors} />
        </div>
      )}
    </div>
  )
}

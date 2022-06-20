import { ReactElement, useState } from 'react'
import SignForm from './SignForm'
import Visualizer from './Visualizer'

export default function Sign(): ReactElement {
  const [signedSD, setSignedSD] = useState<string>()
  const [signatureErrors, setSignatureErrors] = useState<string>()
  return (
    <div>
      <SignForm
        setSignedSD={setSignedSD}
        setSignatureErrors={setSignatureErrors}
      />
      <Visualizer text={signedSD || ''} />
    </div>
  )
}

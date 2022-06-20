import { ReactElement, useState } from 'react'
import { getFormattedCodeString } from '../../utils/sign'
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
      {signedSD && <Visualizer text={getFormattedCodeString(signedSD)} />}
    </div>
  )
}

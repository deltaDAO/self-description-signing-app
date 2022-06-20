import { ReactElement, useState } from 'react'
import SignForm from './SignForm'
import Visualizer from './Visualizer'

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
      {signedSD && <Visualizer text={signedSD} />}
    </div>
  )
}

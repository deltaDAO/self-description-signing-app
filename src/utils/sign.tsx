import axios from 'axios'
import { complianceUri } from '../../app.config'

export async function signServiceSelfDescription(body: any): Promise<{
  signed: boolean
  signedSD?: any
  errors?: any
}> {
  if (!body) return { signed: false }
  try {
    const response = await axios.post(`${complianceUri}/sign`, body)
    const { data, status } = response

    if (status === 200) {
      const signedServiceSelfDescription = {
        signed: true,
        signedSD: {
          selfDescriptionCredential: { ...body },
          ...data
        }
      }
      return signedServiceSelfDescription
    }

    if (status === 409) {
      return {
        signed: false,
        errors: data
      }
    }
    return { signed: false }
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message)
    console.error(String(error))

    return { signed: false }
  }
}

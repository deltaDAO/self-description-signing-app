import axios from 'axios'
import { complianceUri } from '../../app.config'

export async function signServiceSelfDescription(body: any): Promise<any> {
  if (!body) return
  try {
    const response = await axios.post(`${complianceUri}/sign`, body)
    const signedServiceSelfDescription = {
      selfDescriptionCredential: { ...body },
      ...response.data
    }

    return signedServiceSelfDescription
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message)
    console.error(String(error))
  }
}

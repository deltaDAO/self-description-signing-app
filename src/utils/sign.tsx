import axios from 'axios'
import { complianceUri } from '../../app.config'

export async function signServiceSelfDescription(body: any): Promise<{
  signed: boolean
  signedSD?: any
  errors?: any
}> {
  if (!body) return { signed: false }
  try {
    const response = await axios.post(`${complianceUri}/sign`, {
      selfDescription: body
    })
    const { data, status } = response

    if (status === 200 && data?.signedSelfDescription) {
      return {
        signed: true,
        signedSD: data.signedSelfDescription
      }
    }

    return {
      signed: false,
      errors: data
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message)
    console.error(String(error))

    return { signed: false }
  }
}

export function getFormattedCodeString(body: string): string {
  const formattedString = JSON.stringify(body, null, 2)
  return `\`\`\`\n${formattedString}\n\`\`\``
}

export async function downloadFile(text: string) {
  const fileName = 'signed-self-description'
  const json = JSON.stringify(text, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const href = await URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = href
  link.download = fileName + '.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

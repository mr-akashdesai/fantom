export interface IAttachment {
  id: string
  filename: string
  contentType: string
  disposition: string
  transferEncoding: string
  related: boolean
  size: number
  downloadUrl: string
}

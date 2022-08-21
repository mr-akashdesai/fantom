import axios from 'axios'

export const getMailAttachment = async (token: string, downloadUrl: string) =>
  await axios.get(`${process.env.MAIL_API_URL}${downloadUrl}`, {
    headers: {
      authorization: `Bearer ${token}`
    },
    responseType: 'arraybuffer'
  })

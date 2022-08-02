export const loginWithToken = async (token: string, mailjs: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  mailjs.token = token

  const res = await mailjs.me()

  // Throw the error message if the request failed.
  if (!res.status) throw new Error(res.message)

  mailjs.id = res.data.id
  mailjs.address = res.data.address

  return mailjs
}

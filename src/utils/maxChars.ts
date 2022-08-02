export const maxChars = (input: string, maxChars: number) => {
  return input.length > maxChars ? input.substring(0, maxChars) + '...' : input
}

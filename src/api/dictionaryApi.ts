import axios from 'axios'

export const fetchDefinition = async (searchWord: string) => {
  return await axios.get(`${process.env.DICTIONARY_API_URL}v2/entries/en/${searchWord}`)
}

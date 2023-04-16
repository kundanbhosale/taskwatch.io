import { customAlphabet } from 'nanoid'

const alphabet =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

export const idGenerate = (prefix?: string) => {
  const id = customAlphabet(alphabet)()
  return prefix ? prefix + '_' + id : id
}

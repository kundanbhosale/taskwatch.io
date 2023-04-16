import { idGenerate } from '@utils/idGenerate'
import { OutputData } from '@editorjs/editorjs'
import dayjs from 'dayjs'
import { toast } from 'react-hot-toast'
import { LocalDB } from '.'

export type PageParams = { content: Page['content'] }
export class Page {
  id!: string
  content: OutputData
  updated_at!: string
  created_at: string

  constructor({ content }: PageParams) {
    this.id = idGenerate()
    this.content = content
    this.updated_at = dayjs().toISOString()
    this.created_at = dayjs().toISOString()
  }
}

export const getPage = async (db: LocalDB, id: Page['id']) => {
  try {
    return await db.pages.get(id)
  } catch (err) {
    console.error(err)
    toast.error('Failed to add page!')
    return undefined
  }
}

export const addPage = async (db: LocalDB, params: PageParams) => {
  try {
    const page = new Page(params)
    await db.pages.add(page)
    return page
  } catch (err) {
    console.error(err)
    toast.error('Failed to add page!')
    return undefined
  }
}

export const updatePage = async (
  db: LocalDB,
  id: Page['id'],
  params: PageParams
) => {
  try {
    return await db.pages.update(id, {
      ...params,
      updated_at: dayjs().toISOString(),
    })
  } catch (err) {
    console.error(err)
    toast.error('Failed to update page!')
    return undefined
  }
}

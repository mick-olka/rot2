import { LocalesObjectT } from './locales-model'

export interface I_TextBlock {
  _id: string
  name: string
  text: LocalesObjectT<string>
  font: object
  url: string
}

export enum TextBlocks {
  main_page_text = 'main_page_text',
  header_text = 'header_text',
  dollar = 'dollar',
  order = 'order',
}

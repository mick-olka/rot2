import { LocalesObjectT } from '@/models'
import { t } from '@/utils'

export const links: { path: string; name: LocalesObjectT<string> }[] = [
  { path: '/', name: t.sidebar.home },
  // { path: '/collections', name: t.sidebar.categories },
  { path: '/contacts', name: t.sidebar.contacts },
]

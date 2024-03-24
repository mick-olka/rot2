import { Skeleton } from '@mui/material'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import useSWR from 'swr'

import { E_Locales, I_TextBlock } from '@/models'
import { E_ApiPaths } from '@/utils/constants'
import { fetcher, getLocaleSafe, getURL } from '@/utils/helpers'

const path = E_ApiPaths.text

export const getTextList = async (): Promise<I_TextBlock[]> => {
  const res = await fetch(getURL(path))
  if (res.ok) {
    return await res.json()
  } else throw new Error(String(res.body))
}

export const getTextById = async (id: string): Promise<I_TextBlock | null> => {
  const res = await fetch(getURL(path) + id)
  if (res.ok) {
    return await res.json()
  } else return null
}

// for general use
export const useGetTextList = () => {
  const data = useSWR<I_TextBlock[]>(path, fetcher)
  return data
}

export const useGetTextByName = (name: string, l?: E_Locales): string | null => {
  const { locale } = useRouter()
  const data = useSWR<I_TextBlock>(path + name, fetcher)
  if (data.error) return null
  if (data.data && data.data._id) return data.data.text[getLocaleSafe(l || locale || 'ua')]
  return ''
}

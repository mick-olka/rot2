import useSWR from 'swr'

import { I_SWR_Fallback } from '@/models'
import { I_Collection } from '@/models/collections-model'
import { E_ApiPaths } from '@/utils/constants'
import { fetcher, getURL } from '@/utils/helpers'

const path = E_ApiPaths.collections

// for preload
export const getCollectionsList = async (): Promise<I_Collection[]> => {
  const res = await fetch(getURL(path))
  if (res.ok) {
    return await res.json()
  } else throw new Error(String(res.body))
}

export const useGetCollectionsListFallback = () => {
  const data = useSWR<I_Collection[]>(path, fetcher)
  return data as I_SWR_Fallback<I_Collection[]>
}

export const useGetCollectionsList = () => {
  const { data } = useSWR<I_Collection[]>('/collections', fetcher)
  return data
}

export const getCollectionById = async (id: string): Promise<I_Collection | null> => {
  const res = await fetch(getURL(path) + id)
  if (res.ok) {
    return await res.json()
  } else return null
}

export const useGetCollectionById = (id: string) => {
  const data = useSWR<I_Collection>(path + id, fetcher)
  return data as I_SWR_Fallback<I_Collection>
}

import { SWRResponse } from 'swr'

export interface I_SWR_Fallback<T> extends SWRResponse<T> {
  data: T
}

import { useSearchParams, useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export const usePaginator = () => {
  const params = useSearchParams()
  const r = useRouter()
  // console.log(params.getAll('page'))
  const [page, setPage] = useState(1)
  useEffect(() => {
    const p = localStorage.getItem('page')
    // const p = params.getAll('page')[0]
    if (p) setPage(Number(p))
    // else r.push(`?page=${page}`)
  }, [params, page, r])
  const onPageChange = (p: number) => {
    setPage(p)
    localStorage.setItem('page', String(p))
    // r.push(`?page=${p}`)
  }
  return { page, onPageChange }
}

/**
 * Sets Search Param to the url using react router setSearchParams() Fn
 * @param key search param key
 * @param value search param value
 * @param searchParams from useSearchParam()
 * @param setSearchParams from useSearchParam()
 */
export const setUrlParams = (
  key: string,
  value: string,
  searchParams: URLSearchParams,
  setSearchParams: any
) => {
  const updatedSearchParams = new URLSearchParams(searchParams.toString())
  updatedSearchParams.set(key, value)
  setSearchParams(updatedSearchParams.toString(), { replace: true })
}

export const removeUrlParam = (
  key: string,
  searchParams: URLSearchParams,
  setSearchParams: any
) => {
  const updatedSearchParams = new URLSearchParams(searchParams.toString())
  updatedSearchParams.delete(key)
  setSearchParams(updatedSearchParams.toString(), { replace: true })
}

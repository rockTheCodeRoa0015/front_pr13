import { useState } from 'react'

const useLoading = () => {
  const [load, setLoad] = useState(false)

  const setLoading = (val) => {
    setLoad(val)
  }

  return { load, setLoading }
}

export default useLoading

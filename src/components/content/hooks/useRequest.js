import { useDispatch } from 'react-redux'
import { _getInvitedWorker } from 'redux/redusers/WorkerReduser'
import React, { useState, useEffect } from 'react'

export default function useRequest (request, dispatchFunctions, objectKyesOfData, callBack) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const dispatch = useDispatch()

  async function fetchData (isFetching = true) {
    if (isFetching) {
      setLoading(true)

      const data = await request()
        .then(resp => resp.data)
        .catch(error => setError(error))
        .finally(() => setLoading(false))

      for (const key in dispatchFunctions) {
        if (Object.hasOwnProperty.call(dispatchFunctions, key)) {
          const dispatchFunction = dispatchFunctions[key]
          dispatch(dispatchFunction(data[objectKyesOfData[key]]))
        }
      }
      callBack(data)
    }
  }

  useEffect(() => {
    fetchData()
    return () => {
      fetchData(false)
    }
  }, [])

  return { loading, error }
}

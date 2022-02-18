import { useState, useEffect } from 'react'
import { api } from './getFeedback'

/**
 * 
 * @param url Indicates the url to be fetched using the GET method.
 * @param realTime Indicates whether the fetching should running on a infinite loop.
 * Recomended in real-time data situations.
 * @returns An object with the existing data, or an a possible error, and a "isFetching" variable that indicates
 * the current state of the fetching process.
 */

export default function useFetch<T = unknown>(url: string, realTime?: boolean) {
    type fetchType = | Array<T>
                     | null

    const [data, setData] = useState<fetchType>(null)
    const [isFetching, setIsFetching] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)
    const shouldFetch = realTime || !data

    useEffect(()=>{
        shouldFetch && (async()=>{
            try {
                const { data } = await api.get(url)!
                setData(data)
            }
            catch(e: any) {
                setError(e)
            }
            finally {
                setIsFetching(false)
            }
        })()
    },[data, url, shouldFetch])

    return {
        data,
        isFetching,
        error,
    }
}
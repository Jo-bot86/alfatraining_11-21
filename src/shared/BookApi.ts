import {useState, useEffect} from 'react';
import axios, {AxiosResponse, Method} from 'axios';

type Setter<T> = (data: T) => void

/*
 * Abstracts away both needs for api calls,
 * on rendering and on events / conditions
 *
 * useBookApi, hook
 * bookApi, normal function
 *
 */

/*
 * Useful for http data as a dependency in rendering
 *
 * @param method [Method], http method
 * @param path [string], relative path to baseUrl
 * @return, Response Data
*/
export function useBookApi<T>(path: string): [T | undefined, Setter<T>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    bookApi(
      'GET',
      path,
      (data_: T) => setData(data_)
    )
  }, [path])

  return [data, setData];
}

/*
 * Useful for calls on events or in conditions
 *
 * @param method [Method], http method
 * @param path [string], relative path to baseUrl
 * @param data [function], callback, gets `response.data` as an argument
 * @param data [object], body data
*/
export function bookApi<T>(method: Method, path: string, callback: Setter<T>, data = {}): void {
  const baseUrl = 'https://api3.angular-buch.com/secure'

  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    headers: {Authorization: 'Bearer 1234567890'},
    data
  })
    .then((response: AxiosResponse<T>) => callback(response.data))
}

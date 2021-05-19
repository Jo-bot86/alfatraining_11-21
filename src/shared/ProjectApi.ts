import {useState, useEffect} from 'react';
import axios, {AxiosResponse, Method} from 'axios';

import {isProject, isProjectArray, factoryRawToProject} from '../types/Project'

type Setter<T> = (data: T) => void

/*
 * Abstracts away both needs for api calls,
 * on rendering and on events / conditions
 *
 * useProjectApi, hook
 * projectApi, normal function
 *
 */

/*
 * Useful for http data as a dependency in rendering
 *
 * @param method [Method], http method
 * @param path [string], relative path to baseUrl
 * @return, Response Data
*/
export function useProjectApi<T>(path: string): [T | undefined, Setter<T>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    projectApi(
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
export function projectApi<T>(method: Method, path: string, callback: Setter<T>, data = {}): void {
  const baseUrl = '/api'

  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    data
  })
    .then((response: AxiosResponse<T>) => callback(response.data))
}


/*
* Axios Interceptor
* Factory ProjectRaw to Project
*/
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (isProject(response.data)) {
      response.data = factoryRawToProject(response.data)
    } else if (isProjectArray(response.data)) {
      response.data = response.data.map(project => factoryRawToProject(project))
    }
    return response;
  },
  error => Promise.reject(error)
);

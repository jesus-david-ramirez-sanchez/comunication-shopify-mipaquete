import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from 'axios';
import handler from '../lib/logger';

const post = (uri: string | undefined, service: string, data: object, headers: AxiosRequestHeaders): Promise<any> =>
  axios.post(`${uri}/${service}`, data, { headers: headers || {} })
    .then((response: AxiosResponse) => response.data)
    .catch(
      (error: AxiosError) => {
        if (error.response) {
          throw handler.handlerError(2109, `${error.response.data?.message?.detail}`, error.response.status);
        }
        throw handler.handlerError(2109, error.message, 404);
      });


const put = (uri: string | undefined, service: string, data: object, headers: AxiosRequestHeaders): Promise<any> =>
  axios.put(`${uri}/${service}`, data, { headers: headers || {} })
    .then((response: AxiosResponse) => response.data)
    .catch(
      (error: AxiosError) => {
        if (error.response) {
          throw handler.handlerError(2110, `${error.response.data?.message?.detail}`, error.response.status);
        }
        throw handler.handlerError(2110, error.message, 404);
      });


const get = (uri: string | undefined, service: string, data: string, headers: AxiosRequestHeaders): Promise<any> =>
  axios.get(`${uri}/${service}/${data}`, { headers: headers || {} })
    .then((response: AxiosResponse) => response.data)
    .catch(
      (error: AxiosError) => {
        if (error.response) {
          throw handler.handlerError(2111, `${error.response.data?.message?.detail}`, error.response.status);
        }
        throw handler.handlerError(2111, error.message, 404);
      });


const getWithQuery = (uri: string | undefined, service: string, headers: AxiosRequestHeaders): Promise<any> =>
  axios.get(`${uri}/${service}`, { headers: headers || {} })
    .then((response: AxiosResponse) => response.data)
    .catch(
      (error: AxiosError) => {
        if (error.response) {
          throw handler.handlerError(2112, `${error.response.data?.message?.detail}`, error.response.status);
        }
        throw handler.handlerError(2112, error.message, 404);
      });


const getS3 = (uri: string | undefined): Promise<any> => axios.get(`${uri}`)
  .then((response: AxiosResponse) => response.data)
  .catch(
    (error: AxiosError) => {
      if (error.response) {
        throw handler.handlerError(2113, `${error.response.data?.message?.detail}`, error.response.status);
      }
      throw handler.handlerError(2113, error.message, 404);
    });

export {
  post,
  get,
  getWithQuery,
  getS3,
  put,
};

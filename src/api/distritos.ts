// bibliotecas
import axios, { AxiosResponse } from 'axios';

// Types
import { GetDistritoByCPBody, GetDistritoByCPResponse } from 'types/api';

// Constantes
// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL;

export const getDistritoByCP = (data: GetDistritoByCPBody): Promise<AxiosResponse<GetDistritoByCPResponse>> => {
  return axios.post(`${API_URL}/distritos/get-distrito`, data);
};
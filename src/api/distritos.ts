// bibliotecas
import axios, { AxiosResponse } from 'axios';

// Types
import { GetDiputadeRequest, GetDiputadeResponse } from 'types/api';

// Constantes
// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL;

export const getDiputade = (data: GetDiputadeRequest): Promise<AxiosResponse<GetDiputadeResponse>> => {
  return axios.post(`${API_URL}/distritos/get-diputade`, data);
};
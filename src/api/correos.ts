// bibliotecas
import axios, { AxiosResponse } from 'axios';

// Types
import { SetCorreoRequest } from 'types/api';

// Constantes
// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL;

export const setCorreo = (data: SetCorreoRequest): Promise<AxiosResponse<Record<string, never>>> => {
  return axios.post(`${API_URL}/correos/set-correo`, data);
};
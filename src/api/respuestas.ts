// bibliotecas
import axios, { AxiosResponse } from 'axios';

// Types
import { SetPreguntaRequest } from 'types/api';

// Constantes
// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL;

export const setRespuesta = (data: SetPreguntaRequest[]): Promise<AxiosResponse<Record<string, never>>> => {
  return axios.post(`${API_URL}/respuestas/set-respuestas`, data);
};
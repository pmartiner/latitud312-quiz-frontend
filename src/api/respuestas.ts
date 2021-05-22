// bibliotecas
import axios, { AxiosResponse } from 'axios';

// Types
import { PartidoResponse, RespuestaDP, SetPreguntaRequest } from 'types/api';

// Constantes
// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL;

export const setRespuesta = (data: SetPreguntaRequest[]): Promise<AxiosResponse<Record<string, never>>> => {
  return axios.post(`${API_URL}/respuestas/set-respuestas`, data);
};

export const getRespuestasPartidos = (): Promise<AxiosResponse<PartidoResponse[]>> => {
  return axios.get(`${API_URL}/respuestas/get-respuestas-partidos`);
};

export const getRespuestasDiputade = (id: number): Promise<AxiosResponse<RespuestaDP[]>> => {
  return axios.get(`${API_URL}/respuestas/get-respuestas-diputade/${id}`);
};
// bibliotecas
import axios, { AxiosResponse } from 'axios';

// Types
import { QuizQuestionsType } from 'types/api';

// Constantes
// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL;

export const getPreguntas = (): Promise<AxiosResponse<QuizQuestionsType>> => {
  return axios.get(`${API_URL}/preguntas`);
};
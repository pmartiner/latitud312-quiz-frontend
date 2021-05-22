export type GetDiputadeRequest = {
  entidad: string;
  seccion: string;
}

export type GetDiputadeResponse = {
  bancada_original: string;
  nombre_diputade: string;
  num_entidad: number;
  distrito: number;
  tipo: string;
  id_legislativo: number;
  bancada_actual: string;
  reeleccion: boolean;
  reeleccion_suplente: boolean;
  licencia: boolean;
  licencia_deceso: boolean;
  nombre_suplente: string;
  foto: string;
  genero: string;
  nombre_entidad: string;
  municipio: number;
  nombre_municipio: string;
  seccion: number;
}

type QuizInputType = {
  label: string;
  value: string;
};

type QuizPagesType = {
  id_pregunta: number;
  pregunta: string;
  pregunta_corta: string;
  input: {
    type: string;
    values: QuizInputType[];
  };
}

export type QuizQuestionsType = {
  quiz: {
    pages: QuizPagesType[];
  };
}

export type PreguntaType = {
  id_pregunta: number;
  respuesta: string | number | boolean | string[] | number[] | boolean[];
  distrito_usuarie: number;
}

export type SetPreguntaRequest = PreguntaType | '';

export type SetCorreoRequest = {
  correo: string;
}

export type Partidos = 'SP'
  | 'PES'
  | 'PRD'
  | 'MORENA'
  | 'PRI'
  | 'PAN'
  | 'PT'
  | 'PVEM'
  | 'MC'
  | '';

export type Partido = {
  id_pregunta: number;
  partido: Partidos;
  votacion: string;
}

export type RespuestaDP = {
  id_pregunta: number;
  votacion: string;
}

export type PartidoResponse = {
  id: string;
  name: Partidos;
  color: string;
  answers: RespuestaDP[];
}
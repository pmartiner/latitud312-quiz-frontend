export type GetDiputadeRequest = {
  entidad: string;
  seccion: string;
}

export type GetDiputadeResponse = {
  bancada_original: string;
  nombre_diputade: string;
  num_entidad: number;
  distrito: string;
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
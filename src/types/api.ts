
export type GetDistritoByCPBody = {
  cp: string;
}

export type GetDistritoByCPResponse = {
  bancada_original: string,
  nombre_diputade: string,
  entidad: number,
  num_entidad: number,
  num_distrito: number,
  distrito: number,
  id_legislativo: number,
  bancada_actual: string,
  reeleccion: boolean,
  reeleccion_suplente: boolean,
  licencia: boolean,
  licencia_deceso: boolean,
  nombre_suplente: string,
  foto: string,
  genero: string,
  nombre_entidad: string,
  municipio: 12,
  nombre_municipio: string,
  seccion: 3756,
}
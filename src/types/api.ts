
type Distrito = {
    distrito: number;
  }

export type GetDistritoByCPBody = {
  cp: string;
}

export type GetDistritoByCPResponse = {
  data: Distrito[];
}
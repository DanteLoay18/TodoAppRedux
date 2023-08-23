import { Action } from "@ngrx/store";

export const SET_FILTRO= '[Filtro] Set Filtro';
export type filtrosValidos = 'todos' | 'completados' | 'pendientes';

export class SetFiltroAction implements Action {
  readonly type: string =  SET_FILTRO;

  constructor(public filtro:filtrosValidos){}
}



import { Action } from "@ngrx/store";
import * as filtro from "./filter.actions";

const estadoInicial: filtro.filtrosValidos= 'todos';


export function filtroReducer(state = estadoInicial,
                              action: Action): filtro.filtrosValidos{
    switch(action.type){
      case filtro.SET_FILTRO:
        return (action as any).filtro;
      default:
        return state;
    }
}

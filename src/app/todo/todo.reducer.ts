import { Action } from '@ngrx/store';
import * as fromTODO from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Vencer a Thanos');
const todo2 = new Todo('Salvar el mundo');
const todo3 = new Todo('Pedir prestado el traje de Ironman');
todo2.completado=true
const estadoInicial: Todo[] = [
  todo1,
  todo2,
  todo3
];

export function todoReducer(state=estadoInicial, action:Action):Todo[]{


  switch(action.type){
    case fromTODO.AGREGAR_TODO:
      const todo = new Todo((action as any).texto)
      return [...state, todo];
    case fromTODO.TOGGLE_ALL_TODO:
      return state.map(todo => {
        return {
          ...todo,
          completado:(action as any).completado
        }
      })
    case fromTODO.TOGGLE_TODO:

      return state.map(todoEdit => {

        if(todoEdit.id === (action as any).id){
          return {
            ...todoEdit,
            completado: !todoEdit.completado
          }
        }else {
          return todoEdit;
        }
      });
    case fromTODO.EDITAR_TODO:
      return state.map(todo => {
        if(todo.id === (action as any).id){
          return {
            ...todo,
            texto: (action as any).texto
          }
        }else{
          return todo;
        }
      })
    case fromTODO.BORRAR_TODO:
      return state.filter(todo => todo.id !== (action as any).id)
    case fromTODO.BORRAR_COMPLETADOS_TODO:
        return state.filter(todo=> !todo.completado)

    default:
      return state;
  }
}


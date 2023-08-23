import { Component, NgModule, OnInit } from '@angular/core';
import * as fromFiltroActions from '../../filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo.model';
import { BorrarCompletadosTodoAction } from '../todo.actions';
@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: [
  ]
})
export class TodoFooterComponent implements OnInit{
    filtrosValidos: fromFiltroActions.filtrosValidos[]= ['todos', 'completados', 'pendientes']
    filtroActual$!: Observable<fromFiltroActions.filtrosValidos>;
    pendientes!:number;

    constructor(private store:Store<AppState>){}

    ngOnInit(): void {
      this.filtroActual$= this.store.select('filtro');
      this.store.select('todos').subscribe(todos =>{
        this.contarPendientes(todos);
      })

    }

    cambiarFiltro(nuevoFiltro: fromFiltroActions.filtrosValidos){
      const action = new fromFiltroActions.SetFiltroAction(nuevoFiltro);
      this.store.dispatch(action)
    }

    contarPendientes(todos: Todo[]){
      this.pendientes = todos.filter(todo => !todo.completado).length;
    }
    limpiarTodosCompletados(){
      const accion = new BorrarCompletadosTodoAction();
      this.store.dispatch(accion)
    }
  }

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import { filtrosValidos } from 'src/app/filter/filter.actions';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: [
  ]
})
export class TodosListComponent implements OnInit {
  todos$!:Todo[];
  filtro!: filtrosValidos;
  constructor( private store:Store<AppState>){

  }

  ngOnInit(): void {
    this.store.subscribe(state=>{
      this.filtro=state.filtro;
      this.todos$=state.todos;
    })
  }
}

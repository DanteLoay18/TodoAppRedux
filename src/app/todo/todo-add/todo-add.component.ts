import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/app.reducers';
import {Store} from '@ngrx/store'
import {FormControl, Validators} from '@angular/forms'
import { AgregarTodoAction } from '../todo.actions';
@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styles: [
  ]
})
export class TodoAddComponent implements OnInit{

  txtInput:FormControl;

  constructor(private store:Store<AppState>){
    this.txtInput= new FormControl('',Validators.required)
  }
  ngOnInit(): void {

  }
  agregarTodo(){
    if(this.txtInput.invalid){
      return;
    }
    const action= new AgregarTodoAction(this.txtInput.value);
    
    this.store.dispatch(action)

    this.txtInput.setValue('');
  }

}

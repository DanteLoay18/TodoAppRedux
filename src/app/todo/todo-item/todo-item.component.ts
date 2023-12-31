import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { BorrarTodoAction, EditarTodoAction, ToggleTodoAction } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: [
  ]
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @ViewChild('txtInputFisico') txtInputFisico!: ElementRef;


  checkField!: FormControl;
  txtInput!: FormControl;
  editando:boolean = false;
  constructor(private store: Store<AppState>){}

  ngOnInit(): void {
    this.checkField= new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required)

    this.checkField.valueChanges.subscribe(valor =>{
      const action = new ToggleTodoAction(this.todo.id)
      this.store.dispatch(action);
    })
  }

  editar(){
    this.editando=true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select()
    }, 1);

  }

  terminarEdicion(){
    this.editando=false;
    if(this.txtInput.invalid){
      return;
    }
    if(this.txtInput.value === this.todo.texto){
      return;
    }

    if(this.txtInput.valid){

      const action = new EditarTodoAction(this.todo.id, this.txtInput.value)
      this.store.dispatch(action)
    }
  }
  borrarTodo(){
    const action = new BorrarTodoAction(this.todo.id)
    this.store.dispatch(action)
  }
}

import { makeAutoObservable } from 'mobx';
import { Todo } from './model';
import { todoService } from './service';

export class HomeViewModel {
  todo: Todo = new Todo('Test', 1);

  constructor() {
    makeAutoObservable(this);
  }

  async getTodoById() {
    const todo = await todoService.getTodo();
    this.updateTodo(todo.title, todo.id);
  }

  updateTodo(name: string, id: number) {
    this.todo = new Todo(name, id);
  }
}

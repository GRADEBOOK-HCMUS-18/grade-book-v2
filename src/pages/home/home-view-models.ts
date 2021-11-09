import { action, observable, makeObservable } from 'mobx';
import { BaseViewModel } from 'shared/view-models';
import { Todo } from './model';
import { todoService } from './service';

export class HomeViewModel extends BaseViewModel {
  todo: Todo = new Todo('Test', 1);

  constructor() {
    super();
    makeObservable(this, {
      todo: observable,
      getTodoById: action,
      updateTodo: action,
    });
  }

  async getTodoById() {
    this.startLoading();
    const todo = await todoService.getTodo();
    this.updateTodo(todo.title, todo.id);
    this.stopLoading();
  }

  updateTodo(name: string, id: number) {
    this.todo = new Todo(name, id);
  }
}

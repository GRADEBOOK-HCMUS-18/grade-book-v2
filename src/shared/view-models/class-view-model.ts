import { makeAutoObservable } from 'mobx';
import { Class } from 'shared/models';
class ClassViewModel {
  private class: Class = new Class();

  constructor() {
    makeAutoObservable(this);
  }

  getClass() {
    return this.class;
  }
}

export const classViewModel = new ClassViewModel();

import { makeAutoObservable } from 'mobx';
import { ClassInfo } from 'shared/models';
class ClassViewModel {
  private class: ClassInfo = new ClassInfo();

  constructor() {
    makeAutoObservable(this);
  }

  getClass() {
    return this.class;
  }
}

export const classViewModel = new ClassViewModel();

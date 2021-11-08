import { makeAutoObservable } from 'mobx';
import { Class } from 'shared/models';
class ClassViewModel {
  private class: Class = new Class();

  constructor() {
    makeAutoObservable(this);
  }

  getClassId() {
    return this.class.classID;
  }
}

export const classViewModel = new ClassViewModel();

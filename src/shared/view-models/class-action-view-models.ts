import { makeObservable, observable, action } from 'mobx';
export class ClassActionViewModel {
  showCreateClassModal: boolean = false;
  showJoinClassModal: boolean = false;
  constructor() {
    makeObservable(this, {
      showCreateClassModal: observable,
      showJoinClassModal: observable,
      setShowCreateClassModal: action,
      setShowJoinClassModal: action,
    });
  }
  setShowCreateClassModal(value: boolean) {
    this.showCreateClassModal = value;
  }

  setShowJoinClassModal(value: boolean) {
    this.showJoinClassModal = value;
  }
}

export const classActionViewModel = new ClassActionViewModel();

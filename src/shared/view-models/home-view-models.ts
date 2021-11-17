import { makeObservable, observable,action,computed } from 'mobx';
import { Class } from 'shared/models';
export class HomeViewModel {
  showCreateClassModal:boolean=false;
  showJoinClassModal:boolean = false;
  constructor() {
    makeObservable(this,{
      showCreateClassModal:observable,
      showJoinClassModal:observable,
      setShowCreateClassModal:action,
      setShowJoinClassModal:action,
      getterShowCreateClassModal:computed,
      getterShowJoinClassModal:computed,
    });
  }
  setShowCreateClassModal(value:boolean){
    this.showCreateClassModal= value
  }
  get getterShowCreateClassModal(){
    return this.showCreateClassModal;
  }
  setShowJoinClassModal(value:boolean) {
    this.showJoinClassModal = value;
  }
  get getterShowJoinClassModal(){
    return this.showJoinClassModal;
  }
}

export const homeViewModel = new HomeViewModel();

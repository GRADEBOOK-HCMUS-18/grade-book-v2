import { action, makeObservable, observable } from 'mobx';

export class BaseViewModel {
  loading: boolean = false;
  isError: boolean = false;
  isSuccess:boolean = false;
  message: string = '';
  constructor() {
    makeObservable(this, {
      loading: observable,
      isError: observable,
      isSuccess: observable,
      startLoading: action,
      stopLoading: action,
      makeError: action,
      deleteError: action,
    });
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  makeSuccess(message:string){
    this.isSuccess = true;
    this.message = message;
  }

  deleteSuccess(){
    this.isSuccess = false;
    this.message = '';
  }

  makeError(message: string) {
    this.isError = true;
    this.message = message;
  }
  deleteError() {
    this.isError = false;
    this.message = '';
  }
}

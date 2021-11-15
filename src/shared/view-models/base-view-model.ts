import { action, makeObservable, observable } from 'mobx';

export class BaseViewModel {
  loading: boolean = false;
  isError: boolean = false;
  message: string = '';
  constructor() {
    makeObservable(this, {
      loading: observable,
      isError: observable,
      startLoading: action,
      stopLoading: action,
      makeError: action,
    });
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }

  makeError(message: string) {
    this.isError = true;
    this.message = message;
  }
}

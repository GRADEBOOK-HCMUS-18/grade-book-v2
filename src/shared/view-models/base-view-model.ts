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
    });
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    this.loading = false;
  }
}

import { action, makeObservable, observable } from 'mobx';
export class BaseViewModel {
  loading: boolean = false;
  constructor() {
    makeObservable(this, {
      loading: observable,

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

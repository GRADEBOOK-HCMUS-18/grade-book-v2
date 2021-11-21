import { makeAutoObservable } from 'mobx';
class LineLoadingViewModel {
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  makeLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}

export const lineLoadingViewModel = new LineLoadingViewModel();

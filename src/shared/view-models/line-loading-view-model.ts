import { makeAutoObservable } from 'mobx';
class LineLoadingViewModel {
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }
}

export const lineLoadingViewModel = new LineLoadingViewModel();

import { TOKEN_KEY } from 'shared/constants';
class StorageService {
  getLocalStorage(key: string) {
    const data = localStorage.getItem(key);
    return data;
  }

  setLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  deleteLocalStorage(key: string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  getSessionStorage(key: string) {
    const data = sessionStorage.getItem(key);
    return data;
  }

  setSessionStorage(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  deleteSessionStorage(key: string) {
    sessionStorage.removeItem(key);
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  clearUser() {
    this.deleteLocalStorage(TOKEN_KEY);
  }
}

export const storageService = new StorageService();

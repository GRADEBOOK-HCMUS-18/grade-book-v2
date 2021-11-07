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
}

export const storageService = new StorageService();

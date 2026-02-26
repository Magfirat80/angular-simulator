import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setValueStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValueStorage<T>(key: string): T | null {
    const localValue: string | null = localStorage.getItem(key);
    return localValue ? JSON.parse(localValue) as T : null;
  }

  removeValueStorage(key:string): void {
    localStorage.removeItem(key);
  }

  clearStorage(): void {
    localStorage.clear();
  }
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setValue<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue<T>(key: string): T | null {
    const localValue: string | null = localStorage.getItem(key);
    return localValue ? JSON.parse(localValue) as T : null;
  }

  removeValue(key:string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
    console.warn('Hello');
    console.error('Hello');
  }

}
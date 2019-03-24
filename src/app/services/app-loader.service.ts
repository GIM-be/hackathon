import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {

  loading = true;
  constructor() { }

  setLoaded() {
    this.loading = false;
  }

  isLoaded() {
    return !this.loading;
  }
}

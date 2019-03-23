import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  doConnect = false;

  constructor() { }

  toggleLoginForm() {
    this.doConnect = !this.doConnect;
  }

  getDoConnect() {
    return this.doConnect;
  }
}

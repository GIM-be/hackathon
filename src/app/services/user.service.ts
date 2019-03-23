import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userId: number;
  email: string;
  isLogged: boolean;
  error:string;

  constructor(private http: HttpClient) {
    this.logout();
  }

  login(email: string) {
    this.http.get(`http://localhost:8080/hackathon/user?login=${email}`).subscribe(
      (response: any) => {
        if(response) {
          this.email = response.login;
          this.userId = response.id;
          this.isLogged = true;
          this.error = null;
        } else {
          this.error = "Impossible de se connecter.";
        }
      },
      error => {
        console.log('error');
      });

  }

  logout() {
    this.email = null;
    this.userId = null;
    this.isLogged = false;
    this.error = null;
  }

  getEmail() { return this.email; }
  getuserId() { return this.userId; }
  getLogged() { return this.isLogged; }
  getError() { return this.error; }
}

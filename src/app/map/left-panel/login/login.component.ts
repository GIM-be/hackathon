import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  userEmail = '';
  error: string;

  constructor(private userService: UserService) {  }

  ngOnInit() {}

  login() {
    this.userService.login(this.userEmail);
  }
}

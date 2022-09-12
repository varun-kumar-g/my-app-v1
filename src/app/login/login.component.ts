import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
//import { AuthenticatedResponse } from './../_interfaces/authenticated-response.model';

import { Form, NgForm } from '@angular/forms';
import { LoginModel } from '../common/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean | undefined;
  jwtResponse: any;
  credentials: LoginModel = { username: '', password: '' };

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login = (form: NgForm) => {
    if (form.valid) {
      this.http.post<any>("https://localhost:44355/api/Authentication", this.credentials)
        .subscribe({
          next: (data) => {
            this.jwtResponse = data;
            localStorage.setItem("jwt", data);
            this.invalidLogin = false;
            this.router.navigate(["/users"]);
          },
          error: (e) => console.error(e)
        });
    }
  }

}
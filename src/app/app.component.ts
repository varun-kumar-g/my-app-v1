import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  apiResponse!: string;

  constructor(private router:Router, private httpClient: HttpClient, private jwtHelper: JwtHelperService) {

  }

  isLoggedIn() : boolean
  {
    const token = localStorage.getItem("jwt") || '{}';

    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }

  
  callUserApi()
  {
    this.httpClient.get("https://localhost:44355/api/UsersManagement").subscribe(resp => {
      this.apiResponse = JSON.stringify(resp);
    })
  }

  logout()
  {
    localStorage.removeItem("jwt");
    this.router.navigate(["login"]);
  }

}

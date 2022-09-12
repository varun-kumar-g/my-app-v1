import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from '../common/User';
import { DataService } from '../data.service';

@Component({
  selector: 'pm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private httpUrl = 'https://localhost:44355/api/UsersManagement'
  users: User[] = [];
  errorMessage = '';
  sub!: Subscription;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  editUser(){
    this.router.navigate(['/users', this.users[0]]);
  }

  deleteUser(id: number)
  {
    this.sub = this.dataService.deleteUser(id).subscribe({
      next: userData => {
        this.loadUserData();
      },
      error: err => this.errorMessage = err
    });
  }

  loadUserData()
  {
    this.sub = this.dataService.getUsers().subscribe({
      next: userData => {
        this.users = userData;
      },
      error: err => this.errorMessage = err
    });
  }

}

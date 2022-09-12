import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../common/User';
import { DataService } from '../data.service';
import { UsersComponent } from '../users/users.component';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'pm-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit {
  user: User;
  id: number | undefined;
  sub!: Subscription;
  errorMessage: any;

  constructor( private router: Router, 
    private route: ActivatedRoute,
    private dateService: DataService) 
  {
    this.user = {
      id: 0,
      firstName: '',
      lastName: '',
      dateOfBirth: ''
    };
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(parameterMap => 
      {
        const id = parameterMap.get('id');
        this.getUser(+id!);
      });
  }

  private getUser(id: number) {
    if(id === 0)
    {
      this.user = {
        id: 0,
        firstName: '',
        lastName: '',
        dateOfBirth: ''
      };
    }
    else{
      this.sub = this.dateService.getUser(id).subscribe({
        next: userData => {
          this.user = userData!;
        },
        error: err => this.errorMessage = err
      });
    }
  }

  addUser() {
    this.dateService.addUser(this.user)
      .subscribe(data => {
        this.router.navigate(["/users"]);   
      });
      
  }

}

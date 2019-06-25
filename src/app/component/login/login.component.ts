import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/domain/service/auth.service';

@Component({
  selector: 'login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loginForm:FormGroup;
  msg = [{
   severity:'info',
   summary:"The purpose of the application is to provide you with a maintainable architecture for a front-end translation development." 
  }];
  msgApp = [{
    severity:'info',
    summary: "The app allows the user to filter between multiple dates to get the number of searches for a category by keyword and month."
  }]

  constructor(private fb:FormBuilder, 
               private router: Router,
               @Inject('AuthService') private authService: AuthService
               ) { }

  ngOnInit() {
    this.authService.logout();
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
        name: ['',Validators.required],
        password: ['',Validators.required]
    });
  }

  login() {
      const val = this.loginForm.value;
      if (val.name && val.password) {
        this.authService.login(val.name, val.password).subscribe((res) => {
          this.router.navigateByUrl('/top-category');
        })
      }      
    }
  }


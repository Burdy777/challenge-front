import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  loginForm:FormGroup;

  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router) { }

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
        this.authService.login(val.name, val.password).subscribe(() => {
          this.router.navigateByUrl('/top-category');
        })
      }      
    }
  }


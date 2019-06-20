import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
isLoginPage: boolean
constructor(private router:Router, private auth:AuthService, public route:ActivatedRoute) { 

}

ngOnInit(){
  this.router.events.subscribe(e => {
    if(e instanceof NavigationStart) {
      if(e.url === '/' || e.url === '/login') {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    }
  })
}


public logout() {
  this.auth.logout();
  this.router.navigate(['/']);
}


  
}

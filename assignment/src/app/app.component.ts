import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment';
  login : boolean = false;
  constructor(private loginService : LoginService,private router : Router){

  }

  ngOnInit(): void {
    this.loginService.isUserLoggedIn().subscribe(auth => this.login =auth)
    // if(this.loginService.isUserLoggedIn()){
    //   this.login=true;
    // }
  }

  LogoutUser() {
    this.loginService.logout();
    this.router.navigate(['login']);
  }

 }

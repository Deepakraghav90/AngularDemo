import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private logServe : LoginService, private router : Router ) { }
  login : boolean = false;
  loginError :string ;
   ///user : User;
  ngOnInit(): void {
    this.logServe.isUserLoggedIn().subscribe(auth => this.login =auth)
  }
  LoginUser(f : NgForm) {
    this.loginError="";
    if(f.valid){
     console.log(f);
     const user : User = { username : f.form.controls.login.value ,
     password : f.form.controls.password.value}
     this.logServe.login(user);
     if(this.login){
      this.router.navigate(['home']);
     }
     else{
       this.loginError="Username or Password is not correct!";
     }

    }
  }
}

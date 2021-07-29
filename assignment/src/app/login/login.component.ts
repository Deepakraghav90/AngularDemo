import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private logServe : LoginService, private router : Router ) { }

  ngOnInit(): void {
  }
  LoginUser(f : NgForm) {
    if(f.valid){
    console.log(f);
    this.logServe.login();
    this.router.navigate(['home']);
    }
  }
}

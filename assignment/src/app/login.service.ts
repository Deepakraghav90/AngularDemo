import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private  loggedIn : BehaviorSubject<boolean> =new BehaviorSubject(false);
  constructor() { }
 login(){
   this.loggedIn.next(true);
 }
 logout(){
  this.loggedIn.next(false);
}
 isUserLoggedIn():Observable<boolean> {
  return this.loggedIn.asObservable();
}
}

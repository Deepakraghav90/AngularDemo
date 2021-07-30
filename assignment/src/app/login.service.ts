import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private  loggedIn : BehaviorSubject<boolean> =new BehaviorSubject(false);
  constructor() { }
 login(userModel : User){
   console.log(userModel);
   if(userModel.username == "testuser" && userModel.password =="12345")
   {
     console.log(1);
    this.loggedIn.next(true);
   }
   else{
   this.loggedIn.next(false);}

 }
 logout(){
  this.loggedIn.next(false);
}
 isUserLoggedIn():Observable<boolean> {
  return this.loggedIn.asObservable();
}
}

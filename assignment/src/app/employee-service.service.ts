import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Update } from "@ngrx/entity";
import { observable, Observable } from "rxjs";
import { Employee } from "./employee/store/employee.store";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  pathURL = "http://localhost:3000/employees";

  constructor(public http: HttpClient) {

}

  public getEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.pathURL);
  }

  public deleteEmployee(id :string) {
  return this.http.delete(this.pathURL + "/" + id);
  }
  public addEmployee(emp : Employee){
    return this.http.post(this.pathURL,emp);
  }
  public updateEmployee(emp : Update<Employee>){
    return this.http.put(this.pathURL +"/"+ emp.id ,emp.changes);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { employeeActions } from '../actions/employee.actions';
import { employeeFeatureKey } from '../reducers/employee.reducers';
import { selectAllEmployees } from '../selectors/employee.selectors';
import { Employee } from '../store/employee.store';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees$ : Observable<Employee[]>;

  public editEmployee: Employee;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'dept','salary','action'];
  constructor(private readonly store : Store<{[employeeFeatureKey] : Employee[]}>) {
    this.employees$=this.store.pipe(select(selectAllEmployees));
   }


  ngOnInit(): void {
    this.store.dispatch(employeeActions.loadEmployees());
  }

  public addEmployees() {
    this.store.dispatch(employeeActions.loadEmployees());
  }
  public delete(employee: Employee) {
    this.store.dispatch(employeeActions.deleteEmployee({data: employee.id}));
  }

  public editStart(employee: Employee) {
    this.editEmployee = {...employee};
  }

  public editSave() {
    this.store.dispatch(employeeActions.updateEmployee({data: {
      id: this.editEmployee.id,
      changes: {
        firstName: this.editEmployee.firstName,
        lastName: this.editEmployee.lastName,
        dept: this.editEmployee.dept,
        salary: this.editEmployee.salary
      }
    }}));
    this.editEmployee  = null;
  }
}

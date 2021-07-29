import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { employeeActions } from '../actions/employee.actions';
import { employeeFeatureKey } from '../reducers/employee.reducers';
import { selectAllEmployees } from '../selectors/employee.selectors';
import { Employee } from '../store/employee.store';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm: FormGroup;


   public employee: Employee = {
      id: '',
      firstName: '',
      lastName: '',
      dept: '',
      salary:''
    };
    public loaded = false;
    sub: Subscription = new Subscription();
    private lastEmployeeCount = -1;

  constructor(private readonly store :Store<{[employeeFeatureKey] : Employee}>) {
    this.sub = this.store.pipe(select(selectAllEmployees)).subscribe({
      next: (employee) => {
        if(employee.length > 0){
         this.lastEmployeeCount=employee.length;
         this.loaded=true;
         if(this.sub){
          this.sub.unsubscribe();
         }

        }
      }
    })
   }

  ngOnInit(): void {
    this.addEmployeeForm = new FormGroup( {

      firstName: new FormControl(null,[Validators.required]),
      lastName: new FormControl(null,[Validators.required]),
      dept: new FormControl(null,[Validators.required]),
      salary: new FormControl(null,[Validators.required]),

   } )
  }

  public add() {
    const newEmployee: Employee = {
      id: String(++this.lastEmployeeCount),
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      dept: this.employee.dept,
      salary:this.employee.salary
    }
    this.store.dispatch(employeeActions.addEmployee({data: newEmployee}));
    this.employee.firstName='';
    this.employee.lastName='';
    this.employee.dept='';
    this.employee.salary='';
  }
  public submitForm(){
    // console.log(this.addEmployeeForm)
    // console.log(this.addEmployeeForm.controls.firstName.value)
    const newEmployee: Employee = {
      id: String(++this.lastEmployeeCount),
      firstName: this.addEmployeeForm.controls.firstName.value,
      lastName: this.addEmployeeForm.controls.lastName.value,
      dept: this.addEmployeeForm.controls.dept.value,
      salary:this.addEmployeeForm.controls.salary.value
    }
    this.store.dispatch(employeeActions.addEmployee({data: newEmployee}));
    this.addEmployeeForm.reset();
  }
}

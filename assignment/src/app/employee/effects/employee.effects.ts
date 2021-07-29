import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { addEmployee, employeeActions } from "../actions/employee.actions";
import { EmployeeService } from "../../employee-service.service";
import { Employee } from "../store/employee.store";
import { Update } from "@ngrx/entity";

@Injectable()
export class EmployeeEffects {
       public loadEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(employeeActions.loadEmployees),
            mergeMap(() =>
                this.employeeService.getEmployees().pipe(
                   // tap(console.debug),
                    map((res: Employee[]) => employeeActions.loadEmployeesSuccess({ data: res}),
                    catchError(() => of ({type: employeeActions.loadEmployeesFailure}))
                )
            )
        )
    ));

    public deleteEmployee$ = createEffect(() =>
     this.actions$.pipe(
       ofType(employeeActions.deleteEmployee),
       mergeMap((action) =>
          this.employeeService.deleteEmployee(action.data).pipe(
           //tap(console.log),
           map( () => employeeActions.deleteEmployeeSuccess({ data: action.data}),
                    catchError(() => of ({type: employeeActions.loadEmployeesFailure}))
          )
        )
       )
     ));

     public addEmployee$ = createEffect(() =>
     this.actions$.pipe(
       ofType(employeeActions.addEmployee),
       mergeMap((action) =>
          this.employeeService.addEmployee(action.data).pipe(
            //tap(console.log),
           map((res: Employee) => employeeActions.addEmployeeSuccess({ data: res}),
                    catchError(() => of ({type: employeeActions.loadEmployeesFailure}))
          )
        )
       )
     ));

     public updateEmployee$ = createEffect(() =>
     this.actions$.pipe(
       ofType(employeeActions.updateEmployee),
       mergeMap((action) =>
          this.employeeService.updateEmployee(action.data).pipe(
           //tap(console.log),
           map((res: Update<Employee>) => employeeActions.updateEmployeeSuccess({ data: res}),
                    catchError(() => of ({type: employeeActions.loadEmployeesFailure}))
          )
        )
       )
     ));


    constructor(
        private readonly actions$: Actions,
        private readonly employeeService: EmployeeService
    ) {}
}

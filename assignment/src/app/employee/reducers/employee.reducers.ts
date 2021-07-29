import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { _REDUCER_FACTORY } from "@ngrx/store/src/tokens";
import { Employee } from '../store/employee.store';
import { employeeActions } from "../actions/employee.actions";

export const employeeFeatureKey = 'employee';

// 1. Define State i.e. What it will contain
export interface EmployeeState extends EntityState<Employee> {
  loaded: boolean;
  error?: Error
}

// 2. Since we need CRUD, we will use Entity Adapter
export const employeeAdapter: EntityAdapter<Employee> = createEntityAdapter<Employee>({
  selectId: (employee) => employee.id
});

// 3. Define how we want to store our State, it's partial, becaus there could be other states for other parts of App
export interface EmployeePartialState {
  readonly [employeeFeatureKey]: EmployeeState;
}

// 4. Define Initial State
export const employeeInitialState: EmployeeState = employeeAdapter.getInitialState({
  loaded: false,
  error: null
});

const _employeeReducer = createReducer(
  employeeInitialState,
  on(employeeActions.loadEmployeesSuccess, (state, { data }) => {
   return employeeAdapter.addMany(data, {
        ...state,
        loaded: true
    })
  }),
  on(employeeActions.loadEmployeesFailure, (state, { error }) => {
      return {
          ...state,
          error
      }
  }),
  on(employeeActions.deleteEmployeeSuccess, (state, { data }) => {
      return employeeAdapter.removeOne(data, {
          ...state,
          loaded: true
      })
  }),
  on(employeeActions.addEmployeeSuccess, (state, { data }) => {
      return employeeAdapter.addOne(data, {
          ...state,
          loaded: true
      })
  }),
  on(employeeActions.updateEmployee, (state, { data }) => {
    //console.log(data);
      return employeeAdapter.updateOne(data, {
          ...state,
          loaded: true
      })
  })
);

export function employeeReducer(state: EmployeeState | undefined, action: Action) {
  return _employeeReducer(state, action);
}




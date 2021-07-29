import { createFeatureSelector, createSelector } from "@ngrx/store";
import { employeeAdapter, employeeFeatureKey, EmployeeState } from "../reducers/employee.reducers";

const getEmployeeState = createFeatureSelector<EmployeeState>(employeeFeatureKey);

// Think it as -> const selectAll = EmployeeAdapter.getSelectors().selectAll;
const { selectIds, selectAll, selectTotal } = employeeAdapter.getSelectors();

export const selectEmployeeIds = createSelector(
    getEmployeeState,
    selectIds
);

export const selectAllEmployees = createSelector(
    getEmployeeState,
    selectAll
);

export const selectEmployeeCount = createSelector(
    getEmployeeState,
    selectTotal
);

export const selectEmployeeLoaded = createSelector(
    getEmployeeState,
    (state) => state.loaded
);

export const selectEmployeeError = createSelector(
    getEmployeeState,
    (state) => state.error
);

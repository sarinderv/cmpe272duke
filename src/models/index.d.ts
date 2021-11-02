import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type EmployeeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Employee {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly title: string;
  readonly department?: string;
  readonly startDate: string;
  readonly phone?: string;
  readonly address?: string;
  readonly emergencyContactName?: string;
  readonly emergencyContactPhone?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Employee, EmployeeMetaData>);
  static copyOf(source: Employee, mutator: (draft: MutableModel<Employee, EmployeeMetaData>) => MutableModel<Employee, EmployeeMetaData> | void): Employee;
}
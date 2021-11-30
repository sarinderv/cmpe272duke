/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPayroll = /* GraphQL */ `
  mutation CreatePayroll(
    $input: CreatePayrollInput!
    $condition: ModelPayrollConditionInput
  ) {
    createPayroll(input: $input, condition: $condition) {
      id
      employeeId
      providentFund
      basicSalary
      allowance
      tax
      totalHours
      grossSalary
      netSalary
      month
      employee {
        id
        firstName
        lastName
        title
        department
        startDate
        phone
        address
        emergencyContactName
        emergencyContactPhone
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePayroll = /* GraphQL */ `
  mutation UpdatePayroll(
    $input: UpdatePayrollInput!
    $condition: ModelPayrollConditionInput
  ) {
    updatePayroll(input: $input, condition: $condition) {
      id
      employeeId
      providentFund
      basicSalary
      allowance
      tax
      totalHours
      grossSalary
      netSalary
      month
      employee {
        id
        firstName
        lastName
        title
        department
        startDate
        phone
        address
        emergencyContactName
        emergencyContactPhone
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePayroll = /* GraphQL */ `
  mutation DeletePayroll(
    $input: DeletePayrollInput!
    $condition: ModelPayrollConditionInput
  ) {
    deletePayroll(input: $input, condition: $condition) {
      id
      employeeId
      providentFund
      basicSalary
      allowance
      tax
      totalHours
      grossSalary
      netSalary
      month
      employee {
        id
        firstName
        lastName
        title
        department
        startDate
        phone
        address
        emergencyContactName
        emergencyContactPhone
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createHourlyRate = /* GraphQL */ `
  mutation CreateHourlyRate(
    $input: CreateHourlyRateInput!
    $condition: ModelHourlyRateConditionInput
  ) {
    createHourlyRate(input: $input, condition: $condition) {
      id
      employeeId
      ratePerHour
      employee {
        id
        firstName
        lastName
        title
        department
        startDate
        phone
        address
        emergencyContactName
        emergencyContactPhone
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateHourlyRate = /* GraphQL */ `
  mutation UpdateHourlyRate(
    $input: UpdateHourlyRateInput!
    $condition: ModelHourlyRateConditionInput
  ) {
    updateHourlyRate(input: $input, condition: $condition) {
      id
      employeeId
      ratePerHour
      employee {
        id
        firstName
        lastName
        title
        department
        startDate
        phone
        address
        emergencyContactName
        emergencyContactPhone
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteHourlyRate = /* GraphQL */ `
  mutation DeleteHourlyRate(
    $input: DeleteHourlyRateInput!
    $condition: ModelHourlyRateConditionInput
  ) {
    deleteHourlyRate(input: $input, condition: $condition) {
      id
      employeeId
      ratePerHour
      employee {
        id
        firstName
        lastName
        title
        department
        startDate
        phone
        address
        emergencyContactName
        emergencyContactPhone
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      title
      department
      startDate
      phone
      address
      emergencyContactName
      emergencyContactPhone
      createdAt
      updatedAt
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      title
      department
      startDate
      phone
      address
      emergencyContactName
      emergencyContactPhone
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      firstName
      lastName
      title
      department
      startDate
      phone
      address
      emergencyContactName
      emergencyContactPhone
      createdAt
      updatedAt
    }
  }
`;
export const createTimesheet = /* GraphQL */ `
  mutation CreateTimesheet(
    $input: CreateTimesheetInput!
    $condition: ModelTimesheetConditionInput
  ) {
    createTimesheet(input: $input, condition: $condition) {
      id
      hours
      fillDate
      createdAt
      updatedAt
    }
  }
`;
export const updateTimesheet = /* GraphQL */ `
  mutation UpdateTimesheet(
    $input: UpdateTimesheetInput!
    $condition: ModelTimesheetConditionInput
  ) {
    updateTimesheet(input: $input, condition: $condition) {
      id
      hours
      fillDate
      createdAt
      updatedAt
    }
  }
`;
export const deleteTimesheet = /* GraphQL */ `
  mutation DeleteTimesheet(
    $input: DeleteTimesheetInput!
    $condition: ModelTimesheetConditionInput
  ) {
    deleteTimesheet(input: $input, condition: $condition) {
      id
      hours
      fillDate
      createdAt
      updatedAt
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPayroll = /* GraphQL */ `
  query GetPayroll($id: ID!) {
    getPayroll(id: $id) {
      id
      employeeId
      providentFund
      basicSalary
      allowance
      tax
      grossSalary
      netSalary
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
export const listPayrolls = /* GraphQL */ `
  query ListPayrolls(
    $filter: ModelPayrollFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPayrolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        employeeId
        providentFund
        basicSalary
        allowance
        tax
        grossSalary
        netSalary
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
      nextToken
    }
  }
`;
export const getHourlyRate = /* GraphQL */ `
  query GetHourlyRate($id: ID!) {
    getHourlyRate(id: $id) {
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
export const listHourlyRates = /* GraphQL */ `
  query ListHourlyRates(
    $filter: ModelHourlyRateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHourlyRates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
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
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;

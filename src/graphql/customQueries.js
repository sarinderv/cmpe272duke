export const listEmployeeIdsByManager = /* GraphQL */ `
query listEmployeeIdsByManager($managerId: ID!) {
    listEmployees(filter: {managerId: {eq: $managerId}}) {
    items {
        id
      }
      nextToken
    }
  }
`;

export const listEmployeesByManager = /* GraphQL */ `
query listEmployeesByManager($managerId: ID!) {
    listEmployees(filter: {managerId: {eq: $managerId}}) {
    items {
        id
        firstName
        lastName
        title
        department
        managerId
        managerName
        managerLastName
        email
        hrManagerId
        hrManagerName
        hrManagerLastName
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

export const listEmployeesByHrManager = /* GraphQL */ `
query listEmployeesByHrManager($hrManagerId: ID!) {
    listEmployees(filter: {hrManagerId: {eq: $hrManagerId}}) {
    items {
        id
        firstName
        lastName
        title
        department
        managerId
        managerName
        managerLastName
        email
        hrManagerId
        hrManagerName
        hrManagerLastName
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

export const listTimesheetByEmployee = /* GraphQL */ `
query listTimesheets($employeeID: ID!,$fillDate: String!) {
    listTimesheets(filter: {employeeID: {eq: $employeeID}, fillDate: {ge: $fillDate}}) {
    items {
      id
      fillDate
      hours
    }
  }
}
`;

export const listPayrollsByEmployee = /* GraphQL */ `
query listPayrollsByEmployee($employeeId: ID!) {
  listPayrolls(filter: {employeeId: {eq: $employeeId}}) {
    items {
      allowance
      basicSalary
      createdAt
      employeeId
      employee {
        firstName
        lastName
      }
      grossSalary
      month
      netSalary
      providentFund
      tax
      totalHours
      id
      updatedAt
    }
    nextToken
  }
}
`;
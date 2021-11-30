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
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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

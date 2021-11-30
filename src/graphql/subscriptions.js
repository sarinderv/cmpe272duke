/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePayroll = /* GraphQL */ `
  subscription OnCreatePayroll {
    onCreatePayroll {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePayroll = /* GraphQL */ `
  subscription OnUpdatePayroll {
    onUpdatePayroll {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePayroll = /* GraphQL */ `
  subscription OnDeletePayroll {
    onDeletePayroll {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHourlyRate = /* GraphQL */ `
  subscription OnCreateHourlyRate {
    onCreateHourlyRate {
      id
      employeeId
      ratePerHour
      employee {
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
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateHourlyRate = /* GraphQL */ `
  subscription OnUpdateHourlyRate {
    onUpdateHourlyRate {
      id
      employeeId
      ratePerHour
      employee {
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
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteHourlyRate = /* GraphQL */ `
  subscription OnDeleteHourlyRate {
    onDeleteHourlyRate {
      id
      employeeId
      ratePerHour
      employee {
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
      createdAt
      updatedAt
    }
  }
`;
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee {
    onCreateEmployee {
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
  }
`;
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee {
    onUpdateEmployee {
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
  }
`;
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee {
    onDeleteEmployee {
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
  }
`;
export const onCreateTimesheet = /* GraphQL */ `
  subscription OnCreateTimesheet {
    onCreateTimesheet {
      id
      hours
      fillDate
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTimesheet = /* GraphQL */ `
  subscription OnUpdateTimesheet {
    onUpdateTimesheet {
      id
      hours
      fillDate
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTimesheet = /* GraphQL */ `
  subscription OnDeleteTimesheet {
    onDeleteTimesheet {
      id
      hours
      fillDate
      createdAt
      updatedAt
    }
  }
`;

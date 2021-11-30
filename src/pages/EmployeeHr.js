import { API, Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { listEmployeesByHrManager,  } from '../graphql/customQueries';
import { deleteEmployee,  } from '../graphql/mutations';
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import UpdateEmployeeByHrModal from "./UpdateEmployeeByHrModal";


export default function EmployeeHR() {

    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [employees, setEmployees] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const history = useHistory();
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [updateModalShow, setUpdateModalShow] = React.useState(false);

    useEffect(() => {
        fetchUserData();
        }, []);
  
      async function fetchUserData() {
        await Auth.currentAuthenticatedUser()
          .then((userSession) => {
            console.log("userData: ", userSession);
            fetchEmployees(userSession.signInUserSession.accessToken.payload.username);
            setUserData(userSession.signInUserSession.accessToken);
          })
          .catch((e) => console.log("Not signed in", e));
      }

    async function fetchEmployees(userName) {
        try {
         const apiData = await API.graphql({ query: listEmployeesByHrManager, variables: { hrManagerId: userName }  });
          setEmployees(apiData.data.listEmployees.items);
        } catch (e) {
            console.error('error fetching employees', e);
            setErrorMessages(e.errors);
        }
      }

    async function deleteEmployeeInfo(id,hrManagerId)
    {
      try
      {
        await API.graphql({ query: deleteEmployee, variables: { input: { id : id}}});
      } catch(e)
      {
        console.error('error deleting employee', e);
        setErrorMessages(e.errors);
      }
      alert("Employee Deleted!");
      fetchEmployees(hrManagerId);
    }

    function openUpdateEmployeeModal(employee) {
      setSelectedEmployee(employee);
      setUpdateModalShow(true);
  }

    return (
        <div className='employee'>
            <h1>Employees</h1>
            <div >
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Start Date</th>
                    <th>Manager</th>
                    <th>Emergency Contact Name</th>
                    <th>Emergency Contact Phone</th>
                  </tr>
                </thead>
                <tbody>
                {
                employees.map(employee => (
                      <tr key={employee.id } >
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td> {employee.title}</td>
                        <td>{employee.department}</td>
                        <td>{employee.email}</td>
                        <td> {employee.phone}</td>
                        <td>{employee.address}</td>
                        <td> {employee.startDate}</td>
                        <td> {employee.managerName +" "+ employee.managerLastName}</td>
                        <td>{employee.emergencyContactName}</td>
                        <td>{employee.emergencyContactPhone}</td>
                        <td>
                        <Button variant="primary" size="sm" onClick={() => openUpdateEmployeeModal(employee)}>Edit</Button>{' '}
                        <Button variant="danger" size="sm" onClick={() => deleteEmployeeInfo(employee.id,employee.hrManagerId)}>Delete</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
            <UpdateEmployeeByHrModal
                  show={updateModalShow}
                  employee={selectedEmployee}
                  onUpdated={() => fetchEmployees(selectedEmployee.hrManagerId)}
                  onHide={() => setUpdateModalShow(false)}
            />
        </div>
        </div>
    );
}
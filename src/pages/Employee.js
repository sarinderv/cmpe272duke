import { API, Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { listEmployees,  } from '../graphql/queries';
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";


export default function Employee() {

    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [employees, setEmployees] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const history = useHistory();

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
         const apiData = await API.graphql({ query: listEmployees });
          setEmployees(apiData.data.listEmployees.items);
        } catch (e) {
            console.error('error fetching employees', e);
            setErrorMessages(e.errors);
        }
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
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Start Date</th>
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
                        <td> {employee.phone}</td>
                        <td>{employee.address}</td>
                        <td> {employee.startDate}</td>
                        <td>{employee.emergencyContactName}</td>
                        <td>{employee.emergencyContactPhone}</td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
        </div>
        </div>
    );
}
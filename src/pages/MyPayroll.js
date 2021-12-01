import { getEmployee,  } from '../graphql/queries';
import { API, Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col , Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {listPayrollsByEmployee} from '../graphql/customQueries';

export default function MyPayroll() {

    const [employee, setEmployee] = useState({ });
    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [errorMessages, setErrorMessages] = useState([]);
    const history = useHistory();
    const [payrolls, setPayrolls]= useState([]);
    const [updateModalShow, setUpdateModalShow] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState([]);

    useEffect(() => {
        fetchUserData();
        }, []);

    async function fetchUserData() {
        await Auth.currentAuthenticatedUser()
          .then((userSession) => {
            console.log("userData: ", userSession);
            fetchPayrollsByEmployee(userSession.signInUserSession.accessToken.payload.username);
            setUserData(userSession.signInUserSession.accessToken);
          })
          .catch((e) => console.log("Not signed in", e));
      }
    

    async function fetchPayrollsByEmployee(userName) {
        console.log("inside fetch payrolls for employee : ",userName );
        try {
            const apiData = await API.graphql({ query: listPayrollsByEmployee, variables: { employeeId: userName }  });
            console.log(apiData.data.listPayrolls.items);
            function sortFunction(a, b) {
              return a.month < b.month ? 1 : -1;
            }
            const sortedData = apiData.data.listPayrolls.items.sort(sortFunction);
            setPayrolls(sortedData);
        }catch(e){
            console.error('error fetching payrolls for employee', e);
            setErrorMessages(e.errors);
        }
        
      }
   
    function openUpdateEmployeeModal(employee) {
        setSelectedEmployee(employee);
        setUpdateModalShow(true);
    }

    return (
        <div className='mypayroll'>

<div >
        <h2>Payrolls</h2>
<Table striped bordered hover>
      <thead>
        <tr>
           {/* <th>ID</th> */}
          <th>Employee Id</th>
          <th>Basic Salary</th>
          <th>Allowance</th>
          <th>Tax</th>
          <th>Provident Fund</th>
          <th>Total Hours</th>
          <th>Month</th>
          <th>Gross Salary</th>
          <th>Net Salary</th>

        </tr>
      </thead>
      <tbody>
      {
      payrolls.map(payroll => (
        
            <tr key={payroll.id}> 
                {/* <td>{prescription.id}</td> */}
              <td>{payroll.employeeId}</td>
              <td>{payroll.basicSalary}</td>
              <td>{payroll.allowance}</td>
              <td>{payroll.tax}</td>
              <td>{payroll.providentFund}</td>
              <td>{payroll.totalHours}</td>
              <td>{payroll.month}</td>
              <td>{payroll.grossSalary}</td>
              <td>{payroll.netSalary}</td>
                       
            </tr>
          ))
        }
      </tbody>
    </Table>
    </div>

        </div>
    );
}

import { API, Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { listPayrolls } from '../graphql/queries';
import { useFormFields } from "../lib/hooksLib";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import {listPayrollsByEmployee,listEmployeesByManager} from '../graphql/customQueries';
import { listEmployees,  } from '../graphql/queries';
import {listEmployeesByHrManager} from '../graphql/customQueries';
import {
    Container,
    Row,
    Button,
    Table,
} from "react-bootstrap";

export default function Payroll() {
    const history = useHistory();
    const [listPat, setListPat] = useState([]);
    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [payrolls, setPayrolls]= useState([]);
    const [employees, setEmployees] = useState([]);
    const [employeesByM, setEmployeesByManager] = useState([]);
    const [errorMessages, setErrorMessages] = useState([]);
    const [updatePayrollModalShow, setPayrollModalShow] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [fields, handleFieldChange] = useFormFields({
        employeeId: ""
      });

    useEffect(() => {
        fetchUserData();
        list();
        fetchEmployees();
    }, []);



    async function fetchUserData() {
        await Auth.currentAuthenticatedUser()
          .then((userSession) => {
            console.log("userData: ", userSession);
            setUserData(userSession.signInUserSession.accessToken);
            fetchEmployeesByManager(userSession.signInUserSession.accessToken.payload.username, userSession.signInUserSession.accessToken.payload['cognito:groups'][0]);
          })
          .catch((e) => console.log("Not signed in", e));
      }
    

    async function fetchEmployees() {
        try {
         const apiData = await API.graphql({ query: listEmployees });
          setEmployees(apiData.data.listEmployees.items);
        } catch (e) {
            console.error('error fetching employees', e);
            setErrorMessages(e.errors);
        }
      }

      async function fetchEmployeesByManager(userName, userRole) {
        try {
          if (userRole === "HrManager") {
            const apiData = await API.graphql({ query: listEmployeesByHrManager, variables: { hrManagerId: userName } });
            setEmployeesByManager(apiData.data.listEmployees.items);
          } else if (userRole === "Manager") {
            const apiData = await API.graphql({ query: listEmployeesByManager, variables: { managerId: userName } });
            setEmployeesByManager(apiData.data.listEmployees.items);
          }
        } catch (e) {
            console.error('error fetching employees', e);
            setErrorMessages(e.errors);
        }
      }

    async function list() {
        try {
            const apiData = await API.graphql({ query: listPayrolls });
            console.log(apiData);
            setListPat(apiData.data.listPayrolls.items);

            // if (apiData.data.listPatients.items == null) {
            //     history.push('/createpayroll')
            // }
        } catch (e) {
            console.log("Errors fetching Payrolls...", e);
        }
    }

    function validateForm() {
        try {
          return (
            fields.employeeId.length > 0
         
          );
        } catch (e) {
          return false;
        }
      }
  
      function openPayroll(employee) {
        setSelectedEmployee(employee);
        setPayrollModalShow(true);
      }

    async function handleSubmit(event) {
        event.preventDefault();
        
        console.log("inside fetch payrolls for employee : ",fields.employeeId );
        try {
            const apiData = await API.graphql({ query: listPayrollsByEmployee, variables: { employeeId: fields.employeeId }  });
            console.log(apiData.data.listPayrolls.items);
            function sortFunction(a, b) {
              return a.month < b.month ? 1 : -1;
            }
            const sortedData = apiData.data.listPayrolls.items.sort(sortFunction);
            setPayrolls(sortedData);
            setPayrollModalShow(true);
        }catch(e){
            console.error('error fetching payrolls for employee', e);
            setErrorMessages(e.errors);
        }
        history.push("/payroll");
      }

      function onHidePayrollModal(employee) {
        console.log("inside onHidePayrollModal")
        setSelectedEmployee(employee);
        setPayrollModalShow(false);
      
      }

    return (


<div className="payroll"> 
<div>
          {/* <RenderListPatientButton /> */}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="employeeId" size="lg">
            <Form.Label><b>Employee Id</b></Form.Label>
            <Form.Control 
            as="select" onChange={handleFieldChange}
            >
                   {
          employeesByM.map(employee => (
                 <option  key={employee.id || employee.firstName} value={employee.id}>{employee.firstName} {employee.lastName}</option>  
                
              ))
            }  

            </Form.Control>
            </Form.Group>
    
          <Button block size="lg" type="submit"  onClick={() => openPayroll(fields.employeeId)}>
            Show Result
          </Button>
        </Form>
        </div>


        <Modal
      {...selectedEmployee}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered  show={updatePayrollModalShow}  onHide={() => onHidePayrollModal(selectedEmployee)}
    >
      <Modal.Header closeButton >
        <Modal.Title id="contained-modal-title-vcenter">
          Payroll for {selectedEmployee.firstName} {selectedEmployee.lastName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
      <Container>
            <Row>


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
            </Row>
        </Container>

        
      </Modal.Body>
    </Modal>

</div>
        
   
    )
}
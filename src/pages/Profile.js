import { getEmployee,  } from '../graphql/queries';
import { API, Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import UpdateEmployeeModal from "./UpdateEmployeeModal";

export default function Profile() {

    const [employee, setEmployee] = useState({ });
    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [errorMessages, setErrorMessages] = useState([]);
    const history = useHistory();
    const [updateModalShow, setUpdateModalShow] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState([]);

    useEffect(() => {
        fetchUserData();
        }, []);

    async function fetchUserData() {
        await Auth.currentAuthenticatedUser()
          .then((userSession) => {
            console.log("userData: ", userSession);
            getEmployeeInfo(userSession.signInUserSession.accessToken.payload.username);
            setUserData(userSession.signInUserSession.accessToken);
          })
          .catch((e) => console.log("Not signed in", e));
      }
    
    async function getEmployeeInfo(userName) {
    try {
        console.log(userName);
        const apiData = await API.graphql({ query: getEmployee, variables: { id: userName } } );
        if (apiData.data.getEmployee == null) {
            console.log("XXXX");
        }
        console.log(apiData.data.getEmployee);
        setEmployee(apiData.data.getEmployee);
    } catch (e) {
        console.error('error fetching employee', e);
        setErrorMessages(e.errors);
    }
    }

    function openUpdateEmployeeModal(employee) {
        setSelectedEmployee(employee);
        setUpdateModalShow(true);
    }

    return (
        <div className='employee'>
            <h1>Employee Profile</h1>
                    <div>
                        <Container>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Employee Id: </b> {employee.id}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Name: </b> {employee.firstName}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Last Name:</b> {employee.lastName}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Title:</b> {employee.title}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Department:</b> {employee.department}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Phone:</b> {employee.phone}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Address:</b> {employee.address}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Start Date:</b> {employee.startDate}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Emergency Contact Name:</b> {employee.emergencyContactName}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col style={{ fontSize: "1rem" }}>
                            <b>Emergency Contact Phone:</b> {employee.emergencyContactPhone}
                            </Col>
                            </Row>
                            <Row className="align-items-center">
                            <Col>
                                <Button
                                  variant="success"
                                  block
                                  size="sm"
                                  onClick={() => openUpdateEmployeeModal(employee)}
                                >
                                  Update
                                </Button>
                            </Col>
                            </Row>
                        </Container>
                  </div>
                  <UpdateEmployeeModal
                      show={updateModalShow}
                      employee={selectedEmployee}
                      onUpdated={() => getEmployeeInfo(employee.id)}
                      onHide={() => setUpdateModalShow(false)}
                    />
        </div>
    );
}

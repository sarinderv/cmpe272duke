import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../lib/hooksLib";
import { API } from 'aws-amplify';
// import "./CreatePayroll.css";
import { createTimesheet } from '../graphql/mutations';

export default function CreateTimesheet() {
    const [adminRole, setAdminRole] = useState(false);
    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [errorMessages, setErrorMessages] = useState([]);
    const [fields, handleFieldChange] = useFormFields({
        employeeId: "",
        hours: "",
        fillDate: ""
    });
    const history = useHistory();
    
    useEffect(() => {
        fetchUserData();
        }, []);

    async function fetchUserData() {
        await Auth.currentAuthenticatedUser()
        .then((userSession) => {
            console.log("userData: ", userSession);
            setUserData(userSession.signInUserSession.accessToken);
        })
        .catch((e) => console.log("Not signed in", e));
    }

    function validateForm() {
        try {
        return (
            fields.employeeId.length > 0 &&
            fields.hours.length > 0 &&
            fields.fillDate.length > 0 
        );
        } catch (e) {
        return false;
        }
    }
    
    async function handleSubmit(event) {
        event.preventDefault();
        console.log("here")
        console.log("userData.payload.username",userData.payload.username)
        console.log(fields.hours)
        console.log(fields.fillDate)
        try {
        await API.graphql({ query: createTimesheet, variables: { input: {hours: fields.hours, fillDate: fields.fillDate, id: userData.payload.username, employeeID: userData.payload.username} } });
            console.log("Success")
    } catch (e) {
        console.error('error with timesheet', e);
        setErrorMessages(e.errors);
        }
        history.push("/timesheet");
    }
    function renderForm() {
        return (
        <div>
            {/* <RenderListPatientButton /> */}
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="employeeId" size="lg">
            <Form.Label>Employee Id</Form.Label>
            <Form.Control
                type="text"
                value={fields.employeeId}
                onChange={handleFieldChange}
            />
            </Form.Group>
            <Form.Group controlId="hours" size="lg">
            <Form.Label>Hours of work</Form.Label>
            <Form.Control
                type="text"
                value={fields.hours}
                onChange={handleFieldChange}
            />
            </Form.Group>
            <Form.Group controlId="fillDate" size="lg">
            <Form.Label>Date</Form.Label>
            <Form.Control
                type="date"
                value={fields.fillDate}
                onChange={handleFieldChange}
            />
            </Form.Group>
            <Button block size="lg" type="submit" disabled={!validateForm()}>
            Create
            </Button>
        </Form>
        </div>
        );
    }
    
    return <div className="createtimesheet"> <h1>Create Timesheet</h1> {renderForm()} </div>;
}

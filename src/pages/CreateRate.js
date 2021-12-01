import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../lib/hooksLib";
import { API } from 'aws-amplify';
import { createHourlyRate } from '../graphql/mutations';

export default function CreateRate() {
  const [adminRole, setAdminRole] = useState(false);
    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [errorMessages, setErrorMessages] = useState([]);
    const [fields, handleFieldChange] = useFormFields({
      employeeId: "",
      ratePerHour: "",
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
          fields.ratePerHour.length > 0 
       
        );
      } catch (e) {
        return false;
      }
    }

    
  
    async function handleSubmit(event) {
      event.preventDefault();
      try {

        await API.graphql({ query: createHourlyRate, variables: { input: {employeeId: fields.employeeId, ratePerHour: fields.ratePerHour, id: userData.payload.username+"_"+Math.random().toString().replace("0.", "")
        } } });
      } catch (e) {
        console.error('error creating rate', e);
        setErrorMessages(e.errors);
      }
      history.push("/hourlyrate");
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
          <Form.Group controlId="ratePerHour" size="lg">
            <Form.Label>Rate per hour (in USD)</Form.Label>
            <Form.Control
              type="text"
              value={fields.ratePerHour}
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
  
    return <div className="createrate"> <h1>Create Rate</h1> {renderForm()} </div>;
}

import { Auth } from 'aws-amplify';
import React, { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../lib/hooksLib";
import { API } from 'aws-amplify';
import "./CreatePayroll.css";
import { createPayroll } from '../graphql/mutations';

export default function CreatePayroll() {
  const [adminRole, setAdminRole] = useState(false);
    const [userData, setUserData] = useState({ payload: { username: '' } });
    const [errorMessages, setErrorMessages] = useState([]);
    let grossSalary=0;
    let netSalary = 0;
    const [fields, handleFieldChange] = useFormFields({
      employeeId: "",
      tax: "",
      providentFund: "",
      basicSalary: "",
      allowance: "",
      month: "",
      netSalary:"",
      grossSalary:"",
      totalHours:""
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
          fields.tax.length > 0 &&
          fields.providentFund.length > 0 &&
          fields.basicSalary.length > 0 &&
          fields.allowance.length > 0 &&
          fields.month.length > 0 &&
          fields.netSalary.length > 0 &&
          fields.grossSalary.length > 0 &&
          fields.totalHours.length >0
        );
      } catch (e) {
        return false;
      }
    }


  
    async function handleSubmit(event) {
      event.preventDefault();
      try {

        await API.graphql({ query: createPayroll, variables: { input: {employeeId: fields.employeeId, providentFund: fields.providentFund, id: userData.payload.username+"_"+Math.random().toString().replace("0.", "")
        , basicSalary: fields.basicSalary, allowance: fields.allowance, tax: fields.tax,
            month: fields.month, totalHours: fields.totalHours, grossSalary: fields.grossSalary, netSalary: fields.netSalary} } });
      } catch (e) {
        console.error('error creating payroll', e);
        setErrorMessages(e.errors);
      }
      history.push("/payroll");
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
          <Form.Group controlId="providentFund" size="lg">
            <Form.Label>Provident Fund</Form.Label>
            <Form.Control
              type="text"
              value={fields.providentFund}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="basicSalary" size="lg">
            <Form.Label>Basic Salary</Form.Label>
            <Form.Control
              type="text"
              value={fields.basicSalary}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="tax" size="lg">
            <Form.Label>Tax</Form.Label>
            <Form.Control
              type="text"
              value={fields.tax}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="allowance" size="lg">
            <Form.Label>Allowance</Form.Label>
            <Form.Control
              type="text"
              value={fields.allowance}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="month" size="lg">
            <Form.Label>Payroll Month</Form.Label>
            <Form.Control
              type="date"
              value={fields.month}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="totalHours" size="lg">
            <Form.Label>Total Hours</Form.Label>
            <Form.Control
              type="totalHours"
              value={fields.totalHours}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="grossSalary" size="lg">
            <Form.Label>Gross Salary</Form.Label>
            <Form.Control
              type="text"
              value={fields.grossSalary}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Form.Group controlId="netSalary" size="lg">
            <Form.Label>Net Salary</Form.Label>
            <Form.Control
              type="text"
              value={fields.netSalary}
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
  
    return <div className="createpayroll"> <h1>Create Payroll</h1> {renderForm()} </div>;
}

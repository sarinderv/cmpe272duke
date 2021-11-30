import React, { useState, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useFormFields } from "../lib/hooksLib";
import { updateEmployee } from '../graphql/mutations';
import { API } from 'aws-amplify';


function UdpateEmployeeByHrModal(props) {
  const employee = useRef(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [fields, handleFieldChange] = useFormFields({
    firstName: "",
    lastName: "",
    title: "",
    department: "",
    managerId: "",
    managerName: "",
    managerLastName: "",
    email: ""
  });

  function validateForm() {
    try {
      return (
        fields.firstName.length > 0 &&
        fields.lastName.length > 0 &&
        fields.title.length > 0 &&
        fields.department.length > 0 &&
        fields.managerId.length > 0 &&
        fields.managerName.length > 0 &&
        fields.managerLastName.length > 0  &&
        fields.email.length > 0 
      );
    } catch (e) {
      return false;
    }
  }

  function handleEmployeeChange(event) {
    validateForm();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await API.graphql({ query: updateEmployee, variables: { input: {id: props.employee.id, firstName: fields.firstName,lastName: fields.lastName,title: fields.title,department: fields.department,managerId: fields.managerId,managerName: fields.managerName,managerLastName: fields.managerLastName,email: fields.email} } });
    } catch (e) {
      console.error('error updating employee', e);
      setErrorMessages(e.errors);
    }
      alert("Employee updated!");
      fields.firstName = "";
      fields.lastName = "";
      fields.title = "";
      fields.department = "";
      fields.managerId = "";
      fields.managerName = "";
      fields.managerLastName = "";
      fields.email = "";
      props.onUpdated();
      props.onHide();
  }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={fields.firstName}
                placeholder={props.employee.firstName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={fields.lastName}
                placeholder={props.employee.lastName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={fields.title}
                placeholder={props.employee.title}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                value={fields.department}
                placeholder={props.employee.department}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="managerId">
              <Form.Label>Manager ID</Form.Label>
              <Form.Control
                value={fields.managerId}
                placeholder={props.employee.managerId}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="managerName">
              <Form.Label>Manager Name</Form.Label>
              <Form.Control
                value={fields.managerName}
                placeholder={props.employee.managerName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="managerLastName">
              <Form.Label>Manager Last Name</Form.Label>
              <Form.Control
                value={fields.managerLastName}
                placeholder={props.employee.managerLastName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={fields.email}
                placeholder={props.employee.email}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Button block type="submit" size="lg" disabled={!validateForm()}>
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
}

export default UdpateEmployeeByHrModal;
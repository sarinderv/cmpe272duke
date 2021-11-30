import React, { useState, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useFormFields } from "../lib/hooksLib";
import { createEmployee } from '../graphql/mutations';
import { API } from 'aws-amplify';


function CreateEmployeeByHrModal(props) {
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
      await API.graphql({ query: createEmployee, variables: { input: {id: fields.id, firstName: fields.firstName,lastName: fields.lastName,title: fields.title,department: fields.department,managerId: fields.managerId,managerName: fields.managerName,managerLastName: fields.managerLastName,email: fields.email,hrManagerId: fields.hrManagerId,hrManagerName: fields.hrManagerName,hrManagerLastName: fields.hrManagerLastName,startDate: fields.startDate} } });
    } catch (e) {
      console.error('error updating employee', e);
      setErrorMessages(e.errors);
    }
      alert("Employee created!");
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
            Create Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="id">
              <Form.Label>ID</Form.Label>
              <Form.Control
                value={fields.id}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
           <Form.Group controlId="firstName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={fields.firstName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                value={fields.lastName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={fields.title}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                value={fields.department}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="managerId">
              <Form.Label>Manager ID</Form.Label>
              <Form.Control
                value={fields.managerId}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="managerName">
              <Form.Label>Manager Name</Form.Label>
              <Form.Control
                value={fields.managerName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="managerLastName">
              <Form.Label>Manager Last Name</Form.Label>
              <Form.Control
                value={fields.managerLastName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={fields.email}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="hrManagerId">
              <Form.Label>HR Manager ID</Form.Label>
              <Form.Control
                value={fields.hrManagerId}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="hrManagerName">
              <Form.Label>HR Manager Name</Form.Label>
              <Form.Control
                value={fields.hrManagerName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="hrManagerLastName">
              <Form.Label>HR Manager Last Name</Form.Label>
              <Form.Control
                value={fields.hrManagerLastName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                value={fields.startDate}
                type="date"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Button block type="submit" size="lg" disabled={!validateForm()}>
              Create
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
}

export default CreateEmployeeByHrModal;
import React, { useState, useRef } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useFormFields } from "../lib/hooksLib";
import { updateEmployee } from '../graphql/mutations';
import { API } from 'aws-amplify';


function UdpateEmployeeModal(props) {
  const employee = useRef(null);
  const [errorMessages, setErrorMessages] = useState([]);
  const [fields, handleFieldChange] = useFormFields({
    phone: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: ""
  });

  function validateForm() {
    try {
      return (
        fields.phone.length > 0 &&
        fields.address.length > 0 &&
        fields.emergencyContactName.length > 0 &&
        fields.emergencyContactPhone.length > 0 
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
      await API.graphql({ query: updateEmployee, variables: { input: {id: props.employee.id, phone: fields.phone, address: fields.address, emergencyContactName: fields.emergencyContactName, emergencyContactPhone: fields.emergencyContactPhone} } });
    } catch (e) {
      console.error('error updating employee', e);
      setErrorMessages(e.errors);
    }
      alert("Employee updated!");
      fields.phone = "";
      fields.address = "";
      fields.emergencyContactName = "";
      fields.emergencyContactPhone = "";
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
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={fields.phone}
                placeholder={props.employee.phone}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={fields.address}
                placeholder={props.employee.address}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="emergencyContactName">
              <Form.Label>Emergency Contact Name</Form.Label>
              <Form.Control
                value={fields.emergencyContactName}
                placeholder={props.employee.emergencyContactName}
                type="text"
                onChange={handleFieldChange}
              />
            </Form.Group>
            <Form.Group controlId="emergencyContactPhone">
              <Form.Label>Emergency Contact Phone</Form.Label>
              <Form.Control
                value={fields.emergencyContactPhone}
                placeholder={props.employee.emergencyContactPhone}
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

export default UdpateEmployeeModal;
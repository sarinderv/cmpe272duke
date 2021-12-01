import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { API, Auth } from 'aws-amplify';
import "./Timesheet.css";
import { createTimesheet } from '../graphql/mutations';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import { Type } from 'react-bootstrap-table2-editor';
import { Alert, Button } from "react-bootstrap";

var id = 0;

export default function CreateTimesheet() {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState({ payload: { username: '' } });
  const history = useHistory();

  useEffect(() => {
    addNewRow();
  }, []);


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

  async function handleSave() {
    try {
      let weeklyHours = (prev, week) => {return prev + week.mon + week.tue + week.wed + week.thu + week.fri + week.sat + week.sun};
      let hours = rows.reduce(weeklyHours, 0);
      let timesheet = {
        id: getNewTimesheetId(),
        fillDate: new Date(),
        hours: hours,
        weeks: JSON.stringify(rows)
      };
      console.log(timesheet);
      await API.graphql({
        query: createTimesheet, variables: {
          input: timesheet
        }
      });
      history.push("/timesheets");
    } catch (e) {
      console.error('error creating Timesheet', e);
      setError(e.errors[0].message);
    }
  }

  function getNewTimesheetId() {
    return userData.payload.username + "-" + Math.floor(Math.random() * 1000);
  }

  const columns = [{
    dataField: 'task',
    text: 'Task'
  }, {
    dataField: 'week',
    text: 'Week/Date',
    editor: {
      type: Type.DATE,
    }
  }, {
    dataField: 'mon',
    text: 'Monday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'tue',
    text: 'Tuesday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'wed',
    text: 'Wednesday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'thu',
    text: 'Thursday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'fri',
    text: 'Friday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'sat',
    text: 'Saturday',
    type: 'number',
    validator: validNumber
  }, {
    dataField: 'sun',
    text: 'Sunday',
    type: 'number',
    validator: validNumber
  }];

  function validNumber(newVal, row, column) {
    if (isNaN(newVal))
      return {
        valid: false,
        message: 'invalid'
      }
    else {
      return true;
    }
  }

  function addNewRow() {
    let newRow = { id: ++id, task: '', week: '', mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 };
    console.log('adding', newRow);
    setRows([...rows, newRow]);
  }

  function render() {
    let errorMsg;
    if (error) {
      errorMsg = <Alert variant="danger" onClose={() => setError(false)} dismissible>
        <p> {error} </p>
      </Alert>
    }
    else {
      errorMsg = ''
    }
    console.log(rows);
    const handleClick = () => addNewRow();
    const handleSubmit = () => handleSave();
    return (
      <div class="timesheet">
        {errorMsg}
        <Button variant="primary" onClick={handleSubmit}>Submit Timesheet</Button>
        <br />Click a day to add hours:
        <BootstrapTable
          keyField="id"
          data={rows}
          columns={columns}
          cellEdit={cellEditFactory({ mode: 'click', blurToSave: 'true'})}
        />
        <Button variant="secondary" onClick={handleClick}>Add row</Button>
      </div>
    );
  }

  return <div className="timesheet"> <h2>Create Timesheet</h2>{render()} </div>;
}
